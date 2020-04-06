import React from 'react';
import Header from '../components/Header';
import authentication from '../authentication';
import Back from '../components/Back'
import './page.css';

export default class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            category: '',
            amount: '',
            payment: '',
            currency: '',
            error: '',
            online: false,
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
                this.setState({
                payment: event.target.value
                });
                
            break;
            case 'online':
                
                this.setState({
                online: event.target.checked
                });
            break;
        }
    }

    async handleSubmit(event) { 
        event.preventDefault();
        console.log('Called handle submit');
        await fetch('http://myvault.technology/api/expenses', {
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
                        search: 'Your expense has been created sucessfully!' 
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
              <h2>Add Expense</h2><hr /><br />
              
              <form id="add-expense-form"  onSubmit={this.handleSubmit} method="post">
              
                <div className="form-group">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="desc">Description</label>
                            <input type="text" name="description" className="form-control" id="desc" aria-describedby="descHelp" placeholder="Expense description" value={this.state.desc} onChange={this.handleChange} />
                            <small id="descHelp" className="form-text text-muted">Short description about your expense.</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="amount">Amount</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <select className="currency-box" id="currency" name="currency" defaultValue="EUR" value={this.state.currency} onChange={this.handleChange} required>
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                            <option value="PND">PND</option>
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
                        <option value="Insurance">Insurance</option>
                        <option value="Transport">Transport</option>
                    </select>
                </div>
                
                <div className="form-group">
                        <label className="form-check-label" htmlFor="payment">Payment Method</label>
                    
                        <select className="form-control" id="payment" name="payment" value={this.state.payment} onChange={this.handleChange}>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>Apple Pay</option>
                            <option>Paypal</option>
                        </select><br />

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="online" name="online" value="online" aria-describedby="onlineHelp" onChange={this.handleChange}/>
                            <label className="form-check-label" htmlFor="online">Online Purchase?</label>
                            <small id="onlineHelp" className="form-text text-muted">Monitor your expenses which happen online.</small>
                        </div>
                </div>
                <button type="submit" className="btn btn-light">Add Expense</button>
                <span className="text-danger">{this.state.error}</span>

              
              
            </form>
              
            </div>
          </div>
          
        );
      }
    }