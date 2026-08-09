import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { FIRESTORE_COLLECTIONS } from '../firebase/collections'

function getAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/user-not-found':
      return 'No account was found for that email.'
    case 'auth/wrong-password':
      return 'Invalid password. Please try again.'
    case 'auth/invalid-email':
      return 'The email address is not valid.'
    case 'auth/invalid-credential':
      return 'Invalid credentials. Check your email and password.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    default:
      return error?.message || 'Login failed. Please try again.'
  }
}

async function resolveMissingProfile(uid, email) {
  const customerRef = doc(db, FIRESTORE_COLLECTIONS.CUSTOMERS, uid)
  const customerSnapshot = await getDoc(customerRef)

  if (customerSnapshot.exists()) {
    const profile = {
      uid,
      email,
      role: 'customer',
      ...customerSnapshot.data(),
    }
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, uid), {
      uid,
      email,
      role: 'customer',
      createdAt: serverTimestamp(),
    }, { merge: true })
    return profile
  }

  const employeeRef = doc(db, FIRESTORE_COLLECTIONS.EMPLOYEES, uid)
  const employeeSnapshot = await getDoc(employeeRef)

  if (employeeSnapshot.exists()) {
    const employeeData = employeeSnapshot.data()
    const profile = {
      uid,
      email,
      role: employeeData.role || 'employee',
      ...employeeData,
    }
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, uid), {
      uid,
      email,
      role: profile.role,
      createdAt: serverTimestamp(),
    }, { merge: true })
    return profile
  }

  const emailQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.USERS),
    where('email', '==', email),
  )
  const querySnapshot = await getDocs(emailQuery)

  if (!querySnapshot.empty) {
    const foundProfile = querySnapshot.docs[0].data()
    const profile = {
      uid,
      email,
      role: foundProfile.role || 'customer',
      ...foundProfile,
    }

    await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, uid), {
      uid,
      email,
      ...profile,
      createdAt: serverTimestamp(),
    }, { merge: true })

    return profile
  }

  return await createFallbackCustomerProfile(uid, email)
}

async function createFallbackCustomerProfile(uid, email) {
  const name = email?.split('@')[0] || 'Customer'
  const accountNumber = `ACC-${Math.floor(100000 + Math.random() * 900000)}`
  const profile = {
    uid,
    email,
    role: 'customer',
    name,
    accountNumber,
    status: 'Active',
    balance: 0,
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, FIRESTORE_COLLECTIONS.CUSTOMERS, uid), {
    uid,
    name,
    email,
    accountNumber,
    status: 'Active',
    balance: 0,
    createdAt: serverTimestamp(),
  })

  await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, uid), {
    uid,
    email,
    role: 'customer',
    createdAt: serverTimestamp(),
  })

  return profile
}

export async function login(email, password) {
  if (!auth || !db) {
    return {
      id: 'local-user',
      email,
      role: 'customer',
      name: 'Local Customer',
      accountNumber: 'ACC-0000',
      status: 'Active',
      balance: 0,
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userCredential.user.uid)
    const userSnapshot = await getDoc(userRef)

    let profile = null
    if (userSnapshot.exists()) {
      profile = userSnapshot.data()
    } else {
      profile = await resolveMissingProfile(userCredential.user.uid, userCredential.user.email)
    }

    if (!profile) {
      throw new Error('User profile not found. Contact your manager.')
    }

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      role: profile.role || 'customer',
      ...profile,
    }
  } catch (error) {
    console.error('Login failed:', error)
    throw new Error(getAuthErrorMessage(error))
  }
}

export async function signup({ name, email, password }) {
  if (!auth || !db) {
    return {
      id: 'local-user',
      email,
      role: 'customer',
      name,
      accountNumber: 'ACC-0000',
      status: 'Active',
      balance: 0,
    }
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid
    const accountNumber = `ACC-${Math.floor(100000 + Math.random() * 900000)}`
    const customerData = {
      uid,
      name,
      email,
      accountNumber,
      status: 'Active',
      balance: 0,
      createdAt: serverTimestamp(),
    }

    await setDoc(doc(db, FIRESTORE_COLLECTIONS.CUSTOMERS, uid), customerData)
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, uid), {
      uid,
      email,
      role: 'customer',
      createdAt: serverTimestamp(),
    })

    return {
      id: uid,
      role: 'customer',
      ...customerData,
    }
  } catch (error) {
    console.error('Signup failed:', error)
    throw new Error(getAuthErrorMessage(error))
  }
}

export async function createUserProfile(uid, profile) {
  if (!db) {
    return { id: uid, ...profile }
  }

  const userRef = doc(db, FIRESTORE_COLLECTIONS.USERS, uid)
  await setDoc(
    userRef,
    {
      uid,
      createdAt: serverTimestamp(),
      ...profile,
    },
    { merge: true },
  )

  return { id: uid, ...profile }
}

export async function logout() {
  if (auth) {
    await signOut(auth)
  }

  return true
}
