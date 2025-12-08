import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo'; // Adjust path if needed

const PublicOnlyRoute = () => {
  const { data: user, } = useUserInfo();

  return user && user?.verified ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicOnlyRoute;