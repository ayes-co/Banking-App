import { createSlice } from '@reduxjs/toolkit'

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    items: [],
    selectedCustomer: null,
  },
  reducers: {
    setCustomers(state, action) {
      state.items = action.payload
    },
    setSelectedCustomer(state, action) {
      state.selectedCustomer = action.payload
    },
  },
})

export const { setCustomers, setSelectedCustomer } = customerSlice.actions
export default customerSlice.reducer

