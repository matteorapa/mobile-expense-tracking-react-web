import React from 'react';
import './page.css';
import authentication from '../authentication';
import Header from '../components/Header';
import {Link} from "react-router-dom";


export default class ExpenseTemplate extends React.Component {
   
    constructor() {
        super();
        this.state = {
          expense_description : 'Apple Store',
          expense_amount : '895',
          currency: '$',
          expense_date: '28/03/2020',
          expense_payment: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    exitUser(){

      authentication.logout(() => {
        this.props.history.push('/')});
    
    }
    handleChange(event) { 

    }

    handleSubmit(event) { 

    }

    render() {
      return (
        <div>
          <Header exitUser={this.exitUser.bind(this)} />
          <div className="main-container focused">
          
          
          <button type="button" className="btn btn-light" onClick={() => {this.props.history.push('/vault')}}><i className="fas fa-long-arrow-alt-left"></i> back</button>
            <form id="expense-edit-form"  onSubmit={this.handleSubmit} method="post">
              
              <div className="category-container neu">
                <i className="fas fa-tshirt"></i>
                <span>Shopping</span>
              </div>

              <div className="payment-container">Paid with <i className="fab fa-cc-apple-pay payment-icon"></i></div>
              <div className="date-container">{this.state.expense_date}</div>
              <hr />
              <div className="details-container form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Description</label>
                  <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Expense description" value={this.state.expense_description} onChange={this.handleChange}  readOnly/>
                        <small id="emailHelp" className="form-text text-muted">Short description about your expense.</small>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Amount</label>
                  

                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">{this.state.currency}</div>
                    </div>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Expense description" value={this.state.expense_amount} onChange={this.handleChange}  readOnly/>
               
                  </div>
                </div>
              </div>
              <div className="row">
                <button type="button" className="btn btn-light">Edit</button>
                <span className="tr-delete">Delete</span>
              </div>
              
              
            </form>
          </div>
          </div>

        
      );
    }
  }