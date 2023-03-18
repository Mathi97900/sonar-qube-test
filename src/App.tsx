import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Router from './routes';
import { logOut } from './store/action/authAction';
import { RootState } from './store/reducer';

function App() {
  const { isLoggedIn } = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  // debugger;
  useEffect(() => {
    // debugger;
    // clear the session. User try to navigate the register view from group linking confirmation
    if (isLoggedIn) {
      const searchQuery = queryString.parse(location.search);
      if (Object.keys(searchQuery).length > 0) {
        if (location.pathname === '/signup' || location.pathname === '/login') {
          // accept the group link for new user registration
          localStorage.clear();
          sessionStorage.clear();
          // navigate('/app/analytics', { replace: true })
          navigate(location.pathname + location.search);
          dispatch(logOut());
        }
      }
    }
  }, [location]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
