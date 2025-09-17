import { useUserInfo } from '@/hooks/useUserInfo';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { data: user } = useUserInfo();
  return user?.verified ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;