export const customerProfile = {
  name: 'Ahmed Khan',
  accountNumber: 'ACC-1001',
  status: 'Active',
  balance: '$24,750.00',
}

export const customerTransactionHistory = [
  { type: 'Deposit', amount: '$5,250.00', date: '2026-05-20', status: 'Approved' },
  { type: 'Withdrawal', amount: '$1,200.00', date: '2026-05-19', status: 'Approved' },
  { type: 'Donation', amount: '$150.00', date: '2026-05-18', status: 'Pending' },
  { type: 'Other', amount: '$300.00', date: '2026-05-17', status: 'Rejected' },
]

export const customerLoans = [
  { amount: '$800,000', purpose: 'Business Expansion', duration: '12 months', status: 'Approved' },
  { amount: '$1,500,000', purpose: 'Property Purchase', duration: '24 months', status: 'Pending' },
  { amount: '$120,000', purpose: 'Education', duration: '10 months', status: 'Rejected' },
]

export const customerActions = [
  'View account balance',
  'Track transaction history',
  'Review loan history',
  'Request loan',
  'Create deposit / withdrawal request',
  'Submit donation / zakat request',
]

export const employeeCustomers = [
  { name: 'Ahmed Khan', accountNumber: 'ACC-1001', balance: '$24,750.00' },
  { name: 'Sara Malik', accountNumber: 'ACC-1002', balance: '$13,200.00' },
  { name: 'Ali Raza', accountNumber: 'ACC-1003', balance: '$8,450.00' },
  { name: 'Hira Shah', accountNumber: 'ACC-1004', balance: '$17,300.00' },
]

export const employeeLoanRequests = [
  { name: 'Ahmed Khan', amount: '$800,000', purpose: 'Business Expansion', status: 'Pending' },
  { name: 'Sara Malik', amount: '$950,000', purpose: 'Home Renovation', status: 'Pending' },
  { name: 'Ali Raza', amount: '$1,250,000', purpose: 'Property Purchase', status: 'Forwarded' },
]

export const employeeTransactionRequests = [
  { name: 'Ahmed Khan', type: 'Deposit', amount: '$50,000', status: 'Pending' },
  { name: 'Sara Malik', type: 'Withdrawal', amount: '$20,000', status: 'Pending' },
  { name: 'Hira Shah', type: 'Donation', amount: '$10,000', status: 'Approved' },
]

export const managerEmployees = [
  { name: 'Ali Raza', email: 'ali@bank.com', role: 'Employee', salary: '$60,000', status: 'Active' },
  { name: 'Hira Shah', email: 'hira@bank.com', role: 'Employee', salary: '$58,000', status: 'Active' },
  { name: 'Usman Malik', email: 'manager@bank.com', role: 'Manager', salary: 'N/A', status: 'Active' },
]

export const managerSummary = {
  totalBalance: '$15,000,000',
  totalLoansIssued: '$6,500,000',
  activeCustomers: '5,892',
  employeeActivity: '156',
}

export const managerCustomerRows = [
  { name: 'Ahmed Khan', accountNumber: 'ACC-1001', balance: '$24,750.00', status: 'Active' },
  { name: 'Sara Malik', accountNumber: 'ACC-1002', balance: '$13,200.00', status: 'Active' },
  { name: 'Ali Raza', accountNumber: 'ACC-1003', balance: '$8,450.00', status: 'Active' },
]

