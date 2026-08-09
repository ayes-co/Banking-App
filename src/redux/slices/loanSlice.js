import { createSlice } from '@reduxjs/toolkit'

const loanSlice = createSlice({
  name: 'loans',
  initialState: {
    items: [],
    requests: [],
  },
  reducers: {
    setLoans(state, action) {
      state.items = action.payload
    },
    setLoanRequests(state, action) {
      state.requests = action.payload
    },
  },
})

export const { setLoans, setLoanRequests } = loanSlice.actions
export default loanSlice.reducer

