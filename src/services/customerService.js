import { addDoc, collection, doc, getDoc, getDocs, increment, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { FIRESTORE_COLLECTIONS } from '../firebase/collections'


// Get all customers
export async function getCustomers() {
  if (!db) {
    return [];
  }

  try {
    const snapshot = await getDocs(
      collection(db, FIRESTORE_COLLECTIONS.CUSTOMERS)
    );

    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
  } catch (error) {
    console.error("Unable to fetch customers:", error);
    return [];
  }
}


// Get single customer
export async function getCustomerById(customerId) {
  if (!db || !customerId) {
    return null;
  }

  try {
    const customerRef = doc(
      db,
      FIRESTORE_COLLECTIONS.CUSTOMERS,
      customerId
    );

    const snapshot = await getDoc(customerRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Unable to fetch customer:", error);
    return null;
  }
}


// Create customer
export async function createCustomer(payload) {
  if (!db || !auth) {
    return {
      id: crypto.randomUUID(),
      ...payload,
    }
  }

  const { name, email, password, initialBalance = 0 } = payload
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCredential.user.uid
  const accountNumber = payload.accountNumber || `ACC-${Math.floor(100000 + Math.random() * 900000)}`
  const customerData = {
    uid,
    name,
    email,
    accountNumber,
    status: 'Active',
    balance: Number(initialBalance) || 0,
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
    ...customerData,
  }
}

export async function updateCustomerBalance(customerId, amountChange) {
  if (!db || !customerId) {
    return null
  }

  try {
    const customerRef = doc(db, FIRESTORE_COLLECTIONS.CUSTOMERS, customerId)
    await updateDoc(customerRef, {
      balance: increment(amountChange),
      updatedAt: serverTimestamp(),
    })
    const updatedSnapshot = await getDoc(customerRef)
    return updatedSnapshot.exists() ? { id: updatedSnapshot.id, ...updatedSnapshot.data() } : null
  } catch (error) {
    console.error('Unable to update customer balance:', error)
    return null
  }
}


// Get customer transactions
export async function getCustomerTransactions(userId) {
  if (!db || !userId) {
    return [];
  }

  try {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.TRANSACTIONS),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
  } catch (error) {
    console.error("Unable to fetch transactions:", error);
    return [];
  }
}
