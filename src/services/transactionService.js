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

export async function approveTransaction(transactionId, approverRole) {
  if (!db || !transactionId) return null

  try {
    const txRef = doc(db, FIRESTORE_COLLECTIONS.TRANSACTIONS, transactionId)
    const txSnap = await getDoc(txRef)
    if (!txSnap.exists()) return null
    const tx = txSnap.data()
    const amount = Number(tx.amount) || 0
    const customerId = tx.userId

    await updateDoc(txRef, {
      status: 'Approved',
      approvedBy: approverRole,
      approvedAt: serverTimestamp(),
    })

    // Apply balance change: deposits add, withdrawals subtract
    if (tx.type && customerId) {
      if (String(tx.type).toLowerCase() === 'deposit') {
        await updateCustomerBalance(customerId, amount)
      } else if (String(tx.type).toLowerCase() === 'withdrawal') {
        await updateCustomerBalance(customerId, -Math.abs(amount))
      }
    }

    return { id: transactionId, ...tx, status: 'Approved' }
  } catch (error) {
    console.error('Unable to approve transaction:', error)
    return null
  }
}

export async function rejectTransaction(transactionId, approverRole) {
  if (!db || !transactionId) return null

  try {
    const txRef = doc(db, FIRESTORE_COLLECTIONS.TRANSACTIONS, transactionId)
    const txSnap = await getDoc(txRef)
    if (!txSnap.exists()) return null
    const tx = txSnap.data()

    await updateDoc(txRef, {
      status: 'Rejected',
      approvedBy: approverRole,
      approvedAt: serverTimestamp(),
    })

    return { id: transactionId, ...tx, status: 'Rejected' }
  } catch (error) {
    console.error('Unable to reject transaction:', error)
    return null
  }
}
