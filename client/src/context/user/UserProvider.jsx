import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { signinRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signin = async (user) => {
    setIsLoading(true);

    try {
      const { data } = await signinRequest(user);

      if (data.success) {
        setUser(data.user);
        localStorage.setItem(
          'user',
          JSON.stringify({ ...data.user, token: data.token })
        );
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        user,
        signin,
        signout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
