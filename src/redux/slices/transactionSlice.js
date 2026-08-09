import { createSlice } from '@reduxjs/toolkit'

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    requests: [],
  },
  reducers: {
    setTransactions(state, action) {
      state.items = action.payload
    },
    setTransactionRequests(state, action) {
      state.requests = action.payload
    },
  },
})

export const { setTransactions, setTransactionRequests } = transactionSlice.actions
export default transactionSlice.reducer

