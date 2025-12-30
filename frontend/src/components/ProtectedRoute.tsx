import { useUserInfo } from '@/hooks/useUserInfo';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUserInfo();

  if (isLoading) {
    return null;
  }
  
  if (!user || !user.verified) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />
};

export default ProtectedRoute;