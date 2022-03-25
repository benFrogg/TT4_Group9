import './NewLoan.css';

import React, { useRef } from 'react'

function NewLoan() {
    const inputFile = useRef(null)

  return (
    <div>
        <h2>Apply New Loan</h2>
        <form>
            <label>Full Name</label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />

        </form>
    </div>
  )
}

export default NewLoan