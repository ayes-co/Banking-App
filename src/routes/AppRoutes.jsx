import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import CustomerDashboard from '../pages/customer/CustomerDashboard.jsx'
import TransactionHistory from '../pages/customer/TransactionHistory.jsx'
import LoanDetails from '../pages/customer/LoanDetails.jsx'
import RequestLoan from '../pages/customer/RequestLoan.jsx'
import TransactionRequest from '../pages/customer/TransactionRequest.jsx'
import EmployeeDashboard from '../pages/employee/EmployeeDashboard.jsx'
import CustomerList from '../pages/employee/CustomerList.jsx'
import CustomerDetails from '../pages/employee/CustomerDetails.jsx'
import CreateCustomer from '../pages/employee/CreateCustomer.jsx'
import LoanRequests from '../pages/employee/LoanRequests.jsx'
import TransactionRequests from '../pages/employee/TransactionRequests.jsx'
import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx'
import CustomerManagement from '../pages/manager/CustomerManagement.jsx'
import EmployeeManagement from '../pages/manager/EmployeeManagement.jsx'
import ManagerLoanRequests from '../pages/manager/LoanRequests.jsx'
import TransactionOversight from '../pages/manager/TransactionOversight.jsx'

function DashboardRedirect() {
  const { role, isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role === 'employee') return <Navigate to="/employee" replace />
  if (role === 'manager') return <Navigate to="/manager" replace />
  return <Navigate to="/customer" replace />
}

export default function AppRoutes() {
  const base = import.meta.env.BASE_URL || '/'

  return (
    <BrowserRouter basename={base}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardRedirect />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/transactions" element={<TransactionHistory />} />
          <Route path="/customer/loans" element={<LoanDetails />} />
          <Route path="/customer/request-loan" element={<RequestLoan />} />
          <Route path="/customer/transaction-request" element={<TransactionRequest />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/customers" element={<CustomerList />} />
          <Route path="/employee/customers/:id" element={<CustomerDetails />} />
          <Route path="/employee/customers/new" element={<CreateCustomer />} />
          <Route path="/employee/loans" element={<LoanRequests />} />
          <Route path="/employee/transactions" element={<TransactionRequests />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/customers" element={<CustomerManagement />} />
          <Route path="/manager/employees" element={<EmployeeManagement />} />
          <Route path="/manager/loans" element={<ManagerLoanRequests />} />
          <Route path="/manager/transactions" element={<TransactionOversight />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

