import React from 'react';
import axios from 'axios';

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
        method: 'POST',
        body: JSON.stringify({
        }),
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






  return (
    <div>
      PAYLOAN TIME
    </div>
  )
}

export default Payloan;