import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import { LoginPage } from '../pages';
import PrivateRoutes from './PrivateRoutes';
import SecondaryRouter from './SecondaryRouter';

const MainRouter = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage></LoginPage>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <SecondaryRouter></SecondaryRouter>
            </PrivateRoutes>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default MainRouter;
