import React from 'react';
import './page.css';
import authentication from '../authentication';
import Header from '../components/Header';
import PropTypes from "prop-types";
import { withRouter } from "react-router";


 class ExpenseTemplate extends React.Component {
   
    constructor() {
        super();
        
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        
    }

    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };


    async handleDelete(event , id) { 
      
      await fetch('http://myvault.technology/api/expenses/del/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authentication.token,
        },
      })
        .then(response => (response.json()))
        .then((response) => {
  
          if (response.success) {
            console.log('Deleted expense successfully!');
            this.props.history.push({
              pathname: '/vault',
              search: 'Your expense has been deleted sucessfully!' 
            })
      
          }
          else {
            console.log('Error in deleting expense');
            this.setState({
              error: 'Unable to delete expense!'
            });
          }
        })
        .catch(error => console.warn(error))
    }

    handleEdit(event) { 

    }

    handleChange(event) { 

    }

    handleSubmit(event) { 

    }

    render() {

      const {location} = this.props;
      let date = new Date(location.state.expense.transactionDate);
      date = date.toLocaleDateString();

      
      return (
        <div>
          <Header />
          <div className="main-container focused">
    
          <button type="button" className="btn btn-light" onClick={() => {this.props.history.push('/vault')}}><i className="fas fa-long-arrow-alt-left"></i> back</button>
            <form id="expense-edit-form"  onSubmit={this.handleSubmit} method="post">
              
              <div className="category-container neu">
                <i className="fas fa-tshirt"></i>
                <span>Shopping</span>
              </div>

              <div className="payment-container">Paid with <i className="fab fa-cc-apple-pay payment-icon"></i></div>
              <div className="date-container">{date}</div>
              <hr />
              <div className="details-container form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="desc">Description</label>
                  <input type="text" name="desc" className="form-control" id="desc" aria-describedby="descHelp" placeholder="Expense description" value={location.state.expense.transactionTitle} onChange={this.handleChange}  readOnly/>
                        <small id="descHelp" className="form-text text-muted">Short description about your expense.</small>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Amount</label>
                  

                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">{location.state.expense.transactionCurrency}</div>
                    </div>
                    <input type="number" name="amount" className="form-control" id="amount"  placeholder="Expense description" value={location.state.expense.expenseCost} onChange={this.handleChange}  readOnly/>
               
                  </div>
                </div>
              </div>
              <div className="side-row">
                <button type="button" className="btn btn-light" onClick={this.handleEdit}>Edit</button>
                <span className="tr-delete" onClick={(e) => this.handleDelete(e, location.state.expense.expenseid)}>Delete</span>
              </div>
              
              
            </form>
          </div>
        </div>

        
      );
    }
  }

  export default withRouter(ExpenseTemplate);