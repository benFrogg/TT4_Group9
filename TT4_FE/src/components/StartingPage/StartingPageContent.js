import React, { useContext } from 'react';
import classes from './StartingPageContent.module.css';
import AuthContext from '../../store/auth-context';
import axios from "axios";

const StartingPageContent = () => {
  const loggedIn = useContext(AuthContext)

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <div className="userDets">
        {/*{
          loggedIn.isLoggedIn ? 
        (*/}
            <div className="accountDets">
              <table className="accountTable" style={{border: "2px solid green", alignItems: "center"}}>
                <thead>
                  <tr>
                    <th>Account Balance</th>
                    <th>Current Loans</th>
                    <th>Loan History</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{loggedIn.userLogged.accBal}</td>
                    <td>{loggedIn.userLogged.currLoan}</td>
                    <td>{loggedIn.userLogged.loanHist}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2>Apply new loan</h2>
                <table  style={{border: "2px solid green", alignItems: "center"}}>
                  <thead>
                    <tr>
                      <th>NRIC</th>
                      <th>CPF contribution statement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2>Pay back outstanding loans</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          {/*}) :
          (
            <div className='nonLogged'>
              <h1>Please log in to view your account details</h1>
            </div>
          )
        }*/}
      </div>
    </section>
  );
};

export default StartingPageContent;
