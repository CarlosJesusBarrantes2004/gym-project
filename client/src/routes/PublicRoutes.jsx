import { Loading } from '../components';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );

  return isAuthenticated ? <Navigate to={'/'}></Navigate> : children;
};

export default PublicRoutes;
