import { useState, useContext} from 'react';
import AuthContext from '../../store/auth-context';
import { API_URL } from '../../Constants';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const {
    loggedUser, 
    isLoggedIn,
    setLoginUserDetails,
    logoutUser 
  } = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function emailChangeHandler(event) {
    console.log(event.target.value);
    setEnteredEmail(event.target.value);
  }

  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();

    // optional: check email and password

    console.log(enteredEmail, enteredPassword);

    if (isLogin) {
      const response = await fetch(API_URL+"login",
      {
        method: 'POST',
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });



      let loginDets = {
        enteredEmail: enteredEmail,
        enteredPassword: enteredPassword
      }

      const data = await response.json();
      console.log(data);
      window.localStorage.setItem('token', data.token);
      const newtoken = window.localStorage.getItem('token');
      console.log('token stored', newtoken);

      // change auth state
      authCtx.login(data.token);

    } else { // register user
      const response = await fetch(API_URL+'register',
      {
        method: 'POST',
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // console.log('dfadfads', response.body.getReader());

      if (response.ok) {
        //const data = await response.body.getReader().read()
        // get the readable stream and convert it to string
        const data = await response.body.getReader().read().then(function(result) {
          return new TextDecoder("utf-8").decode(result.value);
        });
        // console.log('registed user response: ', data);
        alert(data);
      } else {
        // console.log('something went wrong');
        alert('Authentication Failed');
      }

    }

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={enteredEmail} onChange={emailChangeHandler}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required value={enteredPassword} onChange={passwordChangeHandler}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
