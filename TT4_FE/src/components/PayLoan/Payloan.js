import React from 'react';
import axios from 'axios';
import {useState} from 'react';
// import classes from '../Auth/AuthForm.module.css';

const DUMMY_LOANS = [
  {
    "amount": 2000000,
    "id": 1,
    "created_at": "2022-03-25T07:33:56.463907+00:00",
    "customer_id": 1,
    "approved": false
  },
  {
    "amount": 2000000,
    "id": 2,
    "created_at": "2022-03-25T07:34:00.465642+00:00",
    "customer_id": 1,
    "approved": false
  },
  {
    "amount": 2000000,
    "id": 3,
    "created_at": "2022-03-25T07:34:00.832330+00:00",
    "customer_id": 1,
    "approved": false
  },
  {
    "amount": 2000000,
    "id": 4,
    "created_at": "2022-03-25T07:34:01.220531+00:00",
    "customer_id": 1,
    "approved": false
  },
  {
    "amount": 2000000,
    "id": 5,
    "created_at": "2022-03-25T07:34:01.649319+00:00",
    "customer_id": 1,
    "approved": false
  }
]
function Payloan(props) {

  async function fetchProducts() {
    const curr_access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RwYXlsb2FkIjp7ImN1c3RvbWVyX2lkIjoxLCJyb2xlIjoidXNlciJ9LCJleHAiOjE2NDgyMDE3MjR9.m83bc8wo34Bn4KEy7gdA8LNezatGNOfQcJALPpkzZzk"
    /*
    testing = {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RwYXlsb2FkIjp7ImN1c3RvbWVyX2lkIjoxLCJyb2xlIjoidXNlciJ9LCJleHAiOjE2NDgyMDE3MjR9.m83bc8wo34Bn4KEy7gdA8LNezatGNOfQcJALPpkzZzk",
      "token_type": "bearer",
      "access": "user"
    }
*/
    const response = await fetch('https://dbs-shawn.herokuapp.com/loans/myloans',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access_token': curr_access_token,
          'token_type': 'bearer',
          'access': 'user'
        }
      });
    return response;
    /*
    const response = await fetch('http://localhost:5000/api/customer/getcusdetails');
    console.log(response.status);
    const data = await response.json();
    */

    /*
    const response = await fetch('http://localhost:5000/api/loan/getloans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    */

  };
  const test_resp = fetchProducts();
  console.log(test_resp);



  const [enteredLoan, setEnteredLoan] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  function LoanChangeHandler(event) {
    // console.log(event.target.value);
    setEnteredLoan(event.target.value);
  }

  function AmountChangeHandler(event) {
    setEnteredAmount(event.target.value);
  }

  function submitHandler(event) {
    console.log(enteredLoan, enteredAmount); 
  }


  // dropdown to select loan
  // input to pay loan amount
  // button to pay loan
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div >
          <label htmlFor='selectloan'>Select Loan</label>
          <select onChange={LoanChangeHandler}>
            <option>Loan 1</option>
            <option>Loan 2</option>
            <option>Loan 3</option>

          </select>
        </div>
        <div>
          <label htmlFor='paybackamount'>Input amount</label>
          <input type='number' id='paybackamount' required value={enteredAmount} onChange={AmountChangeHandler}/>
        </div>
        <button>Pay Loan Amount</button>
      </form>
    </div>
  )
}

export default Payloan;