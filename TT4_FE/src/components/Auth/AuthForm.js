import { useState, useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function emailChangeHandler(event) {
    // console.log(event.target.value);
    setEnteredEmail(event.target.value);
  }

  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function phoneChangeHandler(event) {
    setEnteredPhone(event.target.value);
  }

  function addressChangeHandler(event) {
    setEnteredAddress(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();

    // optional: check email and password

    console.log('email and password submitted:', enteredEmail, enteredPassword);

    if (isLogin) {
      //@route POST api/customer/login
      //@description receives email and password, checks if it is in the database, if yes, return JWT Token (JWT Token is required for protected routes/APIs)
      //@access Public

      console.log('submit types: login');
      // const response = await fetch('http://localhost:5000/customer/login',
      const response = await fetch('http://localhost:8080/login',
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

      if (response.ok) {
        const data = await response.json();
        console.log('login success data:', data);
        authCtx.login(data.token);
      } else {
        alert('login authentication failed');
      }


    } else { // REGISTERING USER // ################
      console.log('submit types: register');
      console.log('user details:', enteredName, enteredPhone, enteredAddress);
      //@route POST api/customer/createuser               (Create)
      //@description receives customer_name,customer_phone,customer_address,password. Balance is populated as 0 and role is populated as user
      //@access Public

      const response = await fetch('http://localhost:5000/api/customer/createuser',
      // const response = await fetch('http://localhost:8080/register',
      {
        method: 'POST',
        body: JSON.stringify({
          customer_email: enteredEmail,
          password: enteredPassword,

          customer_name: enteredName,
          customer_phone: enteredPhone,
          customer_address: enteredAddress,
          // balance: 0 // do i need to populate balance?
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
        /*
        const data = await response.body.getReader().read().then(function(result) {
          return new TextDecoder("utf-8").decode(result.value);
        });
        alert(data);
        */
        // console.log('registed user response: ', data);
        alert(response)
      } else {
        // console.log('something went wrong');
        alert('Register Authentication Failed');
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
        {
          !isLogin && (
            <div>
              <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' required value={enteredName} onChange={nameChangeHandler}/>
              </div>
              <div className={classes.control}>
                <label htmlFor='phone'>Your Phone</label>
                <input type='text' id='phone' required value={enteredPhone} onChange={phoneChangeHandler}/>
              </div>
              <div className={classes.control}>
                <label htmlFor='address'>Your address</label>
                <input type='text' id='address' required value={enteredAddress} onChange={addressChangeHandler}/>
              </div>
            </div>
          )
        }
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
