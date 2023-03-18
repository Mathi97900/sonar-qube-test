import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import ActiveGarments from './components/ActiveGarments';
import { ActiveGarmentsFileUpload } from './components/ActiveGarments/ActiveGarmentsFileUpload';
import GarmentPreview from './components/ActiveGarments/GarmentPreview';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/Login/SignUp';
import { RootState } from './store/reducer';
import PresetPreview from './view/activeGarments/Preset/PresetPreview';

export default function Router() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const element = useRoutes([
    {
      path: '/app',
      // element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
      element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
      children: [
        { path: 'analytics', element: <Analytics /> },
        { path: 'active-garments', element: <ActiveGarments /> },
        { path: 'active-garments/fileupload', element: <ActiveGarmentsFileUpload /> },
        { path: 'active-garments/fileupload/:id', element: <GarmentPreview /> },
        { path: 'active-garments/:id', element: <GarmentPreview /> },
        { path: 'active-garments/preset/:id', element: <PresetPreview /> }

      ]
    },
    {
      path: '/',
      element: <Login />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '/*', element: <Navigate to="/login" /> }
      ]
    },
    {
      path: '/signup',
      element: <SignUp />

    },
    {
      path: '/analytics',
      element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
      // element: <Dashboard />

    }
  ]);
  return element;
}
