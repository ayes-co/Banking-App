import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { FIRESTORE_COLLECTIONS } from '../firebase/collections'
import { updateCustomerBalance } from './customerService'

export async function getTransactions() {
  if (!db) {
    return []
  }

  try {
    const snapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.TRANSACTIONS)))
    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }))
  } catch (error) {
    console.error('Unable to fetch transactions:', error)
    return []
  }
}

export async function getCustomerTransactions(userId) {
  if (!db || !userId) {
    return []
  }

  try {
    const transactionQuery = query(
      collection(db, FIRESTORE_COLLECTIONS.TRANSACTIONS),
      where('userId', '==', userId),
    )
    const snapshot = await getDocs(transactionQuery)
    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }))
  } catch (error) {
    console.error('Unable to fetch customer transactions:', error)
    return []
  }
}

export async function requestTransaction(payload) {
  if (!db) {
    return { id: crypto.randomUUID(), status: 'pending', ...payload }
  }

  const numericAmount = Number(String(payload.amount).replace(/,/g, '')) || 0
  const transactionRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.TRANSACTIONS), {
    ...payload,
    amount: numericAmount,
    status: 'pending',
    createdAt: serverTimestamp(),
  })

  return {
    id: transactionRef.id,
    status: 'pending',
    ...payload,
    amount: numericAmount,
  }
}
