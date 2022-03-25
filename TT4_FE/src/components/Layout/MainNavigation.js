import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn

  function logoutHandler() {
    authCtx.logout();
  };



  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth Practice</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            // is user is not logged in, show login and register links
            <li>
              <Link to='/auth'>Login</Link>
            </li>)
          }
          {isLoggedIn && (
            // is user is logged in then show profile link
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            // if user is logged in the he should be able to logout
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
