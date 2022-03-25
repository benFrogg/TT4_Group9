import classes from './ProfileForm.module.css';
import {useRef} from 'react';
import { useContext } from 'react';

const ProfileForm = () => {
  const newPasswordInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInput.current.value;
    console.log('newpassword:', enteredNewPassword);
    // validation optional

    // send request to backend
    /*
    main idea here is to send a request to backend to update the user's password
    we will use the token we got from the login request to send the request via authcontext
    but tbh we can just use local storage
    */

    /*
    fetch('http://localhost:8080/profile', {
      method: 'PUT',
      body: JSON.stringify({
        newPassword: enteredNewPassword
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }).then(response => {
      console.log('response:', response);
    }).then(data => {
      console.log('data:', data);

    })
    */


  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInput} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
