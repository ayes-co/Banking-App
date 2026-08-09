import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { FIRESTORE_COLLECTIONS } from '../firebase/collections'
import { updateCustomerBalance } from './customerService'

export async function getLoans() {
  if (!db) {
    return []
  }

  try {
    const snapshot = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.LOANS)))
    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }))
  } catch (error) {
    console.error('Unable to fetch loans:', error)
    return []
  }
}

export async function getCustomerLoans(userId) {
  if (!db || !userId) {
    return []
  }

  try {
    const loanQuery = query(
      collection(db, FIRESTORE_COLLECTIONS.LOANS),
      where('userId', '==', userId),
    )
    const snapshot = await getDocs(loanQuery)
    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }))
  } catch (error) {
    console.error('Unable to fetch customer loans:', error)
    return []
  }
}

export async function requestLoan(payload) {
  if (!db) {
    return { id: crypto.randomUUID(), status: 'pending', ...payload }
  }

  const numericAmount = Number(String(payload.amount).replace(/,/g, '')) || 0
  const loanRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.LOANS), {
    ...payload,
    amount: numericAmount,
    status: 'pending',
    createdAt: serverTimestamp(),
  })

  return {
    id: loanRef.id,
    status: 'pending',
    ...payload,
    amount: numericAmount,
  }
}

export async function approveLoan(loanId, approverRole) {
  if (!db || !loanId) {
    return null
  }

  try {
    const loanRef = doc(db, FIRESTORE_COLLECTIONS.LOANS, loanId)
    const loanSnapshot = await getDoc(loanRef)
    if (!loanSnapshot.exists()) return null
    const loan = loanSnapshot.data()
    const amount = Number(loan.amount) || 0
    const customerId = loan.userId

    await updateDoc(loanRef, {
      status: 'Approved',
      approvedBy: approverRole,
      approvedAt: serverTimestamp(),
    })

    await updateCustomerBalance(customerId, amount)
    return { id: loanId, ...loan, status: 'Approved' }
  } catch (error) {
    console.error('Unable to approve loan:', error)
    return null
  }
}

export async function rejectLoan(loanId, approverRole) {
  if (!db || !loanId) {
    return null
  }

  try {
    const loanRef = doc(db, FIRESTORE_COLLECTIONS.LOANS, loanId)
    const loanSnapshot = await getDoc(loanRef)
    if (!loanSnapshot.exists()) return null
    const loan = loanSnapshot.data()

    await updateDoc(loanRef, {
      status: 'Rejected',
      approvedBy: approverRole,
      approvedAt: serverTimestamp(),
    })

    return { id: loanId, ...loan, status: 'Rejected' }
  } catch (error) {
    console.error('Unable to reject loan:', error)
    return null
  }
}
