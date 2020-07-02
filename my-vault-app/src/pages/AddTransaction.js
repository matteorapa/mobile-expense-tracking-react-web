import React from 'react';
import Header from '../components/Header';
import authentication from '../authentication';
import Back from '../components/Back'
import './page.css';
import {Link} from 'react-router-dom';

export default class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            category: 'Shopping',
            amount: '',
            payment: 'Cash',
            currency: 'eur',
            error: '',
            online: false,
            isPeriodic: false
        }
        
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    handleChange(event) { 
        
        switch(event.target.name){
            case 'description':
                this.setState({
                desc: event.target.value
                });
                
            break;
            case 'amount':
                this.setState({
                amount: event.target.value
                });
                
            break;
            case 'currency':
                this.setState({
                currency: event.target.value
                });
                
            break;
            case 'category':
                this.setState({
                category: event.target.value
                });
                
            break;
            case 'payment':
                if(event.target.value === "Periodic"){
                    //show peroidic fields
                    //remove fields which are not needed
                    //change api call to peroidic

                }
                this.setState({
                payment: event.target.value
                });
                
            break;
            case 'online':
                
                this.setState({
                online: event.target.checked
                });
            break;
            default:
                
                break;
        }
    }

    async handleSubmit(event) { 
        event.preventDefault();
        
        await fetch('https://myvault.technology/api/expenses', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
            body: JSON.stringify({
                title: this.state.desc,
                category: this.state.category,
                amount: this.state.amount,
                cashCard: this.state.payment,
                currency: this.state.currency,
                onlineSwitch: this.state.online,
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Added transaction successfully!');
                    this.props.history.push({
                        pathname: '/vault',
                        state: { message: "Your expense has been created sucessfully!" }
                      });
                }
                else {
                    console.log('Something went wrong!')
                    this.setState({
                        error: 'Unable to create expense, please try again.'
                    });
                    console.log(response)
                    
                }
            })
            .catch(error => console.warn(error))
    }

      render() {
        return (
          <div>
            <Header />
            <div className="main-container focused">
            <Back /><br /><br />
            <div className="edge-row">
                <h2>Add Expense</h2>
                <Link to="/addperiodic" className="btn btn-outline-secondary btn-sm">Add Periodic Expense <i className="fas fa-long-arrow-alt-right"></i></Link>
            </div>
              <hr /><br />
              
              <form id="add-expense-form"  onSubmit={this.handleSubmit} method="post">
              
                <div className="form-group">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="desc">Description</label>
                            <input type="text" name="description" className="form-control" id="desc" aria-describedby="descHelp" placeholder="Expense description" value={this.state.desc} onChange={this.handleChange} required/>
                            <small id="descHelp" className="form-text text-muted">Short description about your expense.</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="amount">Amount</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <select className="currency-box" id="currency" name="currency" defaultValue="eur" value={this.state.currency} onChange={this.handleChange} required>
                                            <option value="eur">EUR</option>
                                            <option value="usd">USD</option>
                                            <option value="gbp">GBP</option>
                                        </select>
                                    </div>
                                </div>
                                <input type="number" name="amount" className="form-control" id="amount" placeholder="Expense amount" value={this.state.amount} onChange={this.handleChange} required/>
                            </div>
                        </div>
                </div>

                </div>

                <div className="form-group">
                    <label htmlFor="categories">Category</label>
                    <select id="categories" className="form-control" name="category" value={this.state.category} onChange={this.handleChange}>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Leisure">Leisure</option>
                        <option value="Home">Home</option>
                        <option value="Tech">Tech</option>
                        <option value="Bills">Bills</option>
                    </select>
                </div>
                
                <div className="form-group">
                        <label className="form-check-label" htmlFor="payment">Payment Method</label>
                    
                        <select className="form-control" id="payment" name="payment" value={this.state.payment} onChange={this.handleChange}>
                            <option>Cash</option>
                            <option>Card</option>
                        </select><br />
                        
                        

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="online" name="online" value="online" aria-describedby="onlineHelp" onChange={this.handleChange}/>
                            <label className="form-check-label" htmlFor="online">Online Purchase?</label>
                            <small id="onlineHelp" className="form-text text-muted">Monitor your expenses which happen online.</small>
                        </div>
                </div>
                <button type="submit" className="btn btn-outline-success">Add Expense</button>
                <span className="text-danger">{this.state.error}</span>
            </form>
              
            </div>
          </div>
          
        );
      }
    }