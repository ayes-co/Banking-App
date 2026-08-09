import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, role } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const pathPrefix = location.pathname.split('/')[1]

  if (pathPrefix && pathPrefix !== role) {
    return <Navigate to={`/${role}`} replace />
  }

  return <Outlet />
}

export default ProtectedRoute;

