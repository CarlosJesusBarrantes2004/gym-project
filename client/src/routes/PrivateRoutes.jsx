import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? children : <Navigate to={'/login'}></Navigate>;
};

export default PrivateRoutes;
