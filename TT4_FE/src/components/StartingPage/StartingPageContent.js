import React, { useContext, useRef, useState } from 'react';
import classes from './StartingPageContent.module.css';
import AuthContext from '../../store/auth-context';
import axios from "axios";
import { API_URL } from '../../Constants';

const StartingPageContent = () => {
  const loggedIn = useContext(AuthContext)
  const CPFHist = useRef(null)
  const incomeTaxFile = useRef(null)
  const [ newLoanAmount, setNewLoan ] = useState("");

  const onClickCPF = (e) => {
    CPFHist.current.click();
  }

  const onClickTax = (e) => {
    incomeTaxFile.current.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newLoanAmount)

    let newLoanData = {
      "token": loggedIn.token,
      "amount": newLoanAmount
    }

    axios.post(API_URL+"loans/newloan", newLoanData)
  }




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
                  <h2>Apply New Loan</h2>
                  <form onSubmit={handleSubmit}>
                      <label>Full Name: </label>
                      <br/>
                      <input type="text" />
                      <br/>
                      <label>NRIC: </label>
                      <br/>
                      <input type="text" />
                      <br/>
                      <label>CPF Contribution History Statement (Latest 9 months)</label><br/>
                      <input type="file" id="file" ref={CPFHist} style={{display: 'none'}} />
                      <button onClick={onClickCPF}>Open file browser</button><br/>
                      <label>Latest 1 Year Income Tax Notice of Assessment</label>
                      <input type="file" id="file" ref={incomeTaxFile} style={{display: 'none'}} /><br/>
                      <button onClick={onClickTax}>Open file browser</button>
                      <br/>
                      <label>Loan Amount</label><br/>
                      <input type="text" value={newLoanAmount} onChange={(e) => setNewLoan(e.target.value)}/>
                      <br/>
                      <button type="submit">Submit</button>
                  </form>
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
