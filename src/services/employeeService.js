import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { FIRESTORE_COLLECTIONS } from '../firebase/collections'

export async function getEmployees() {
  if (!db) {
    return []
  }

  try {
    const snapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.EMPLOYEES)))
    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }))
  } catch (error) {
    console.error('Unable to fetch employees:', error)
    return []
  }
}

export async function createEmployee(payload) {
  if (!db || !auth) {
    return { id: crypto.randomUUID(), ...payload }
  }

  const { email, password, role = 'employee', status = 'active', ...rest } = payload
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCredential.user.uid
  const employeeData = {
    uid,
    email,
    role,
    status,
    createdAt: serverTimestamp(),
    ...rest,
  }

  await setDoc(doc(db, FIRESTORE_COLLECTIONS.EMPLOYEES, uid), employeeData)
  await setDoc(
    doc(db, FIRESTORE_COLLECTIONS.USERS, uid),
    {
      uid,
      email,
      role,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  return {
    id: uid,
    ...employeeData,
  }
}

export async function updateEmployee(employeeId, updates) {
  if (!db || !employeeId) {
    return null
  }

  try {
    const employeeRef = doc(db, FIRESTORE_COLLECTIONS.EMPLOYEES, employeeId)
    await updateDoc(employeeRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
    const snapshot = await getDoc(employeeRef)
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  } catch (error) {
    console.error('Unable to update employee:', error)
    return null
  }
}

export async function deleteEmployee(employeeId) {
  if (!db || !employeeId) {
    return false
  }

  try {
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.EMPLOYEES, employeeId))
    return true
  } catch (error) {
    console.error('Unable to delete employee:', error)
    return false
  }
}

