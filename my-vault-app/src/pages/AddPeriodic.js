import React from 'react';
import Header from '../components/Header';
import authentication from '../authentication';
import Back from '../components/Back'
import './page.css';

export default class AddPeriodic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            category: 'Shopping',
            amount: '',
            currency: 'eur',
            interval: 'day',
            occurence: 3,
            date: new Date(),
            error: '',  
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
                console.log(event.target.value);
                
            break;
            case 'amount':
                this.setState({
                amount: event.target.value
                });
                console.log(event.target.value);
                
            break;
            case 'currency':
                this.setState({
                currency: event.target.value
                });
                console.log(event.target.value);
                
            break;
            case 'category':
                this.setState({
                category: event.target.value
                });
                console.log(event.target.value);
                
            break;
            case 'occurence':
                this.setState({
                occurence: event.target.value
                });
                console.log(event.target.value);
                
            break;
            case 'interval':
                
                this.setState({
                interval: event.target.value
                });
                console.log(event.target.value);
            break;
            case 'startDate':
                
                this.setState({
                    date: event.target.value
                });
                console.log(event.target.value);
            break;
            default:
                break;
        }
    }

    async handleSubmit(event) { 
        event.preventDefault();
        
        await fetch('https://myvault.technology/api/expenses/periodic', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
            body: JSON.stringify({
                category: this.state.category,
                amount: this.state.amount,
                currency: this.state.currency,
                title: this.state.desc,
                date: String(this.state.date),
                interval: this.state.occurence + " " +this.state.interval
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Peroidic Expense successfully posted!');
                    this.props.history.push({
                        pathname: '/periodic',
                        search: 'Your periodic expense has been created sucessfully!' 
                      });
                    
                }
                else {
                    console.log('Something went wrong!')
                    
                }
            })
            .catch(error => console.warn(error))

        
    }

      render() {
          var plural = "";
          if(this.state.occurence > 1){
              plural = "s";
          }else {
              plural = "";
          }
        return (
          <div>
            <Header />
            <div className="main-container focused">
            <Back /><br /><br />
              <h2>Add Periodic</h2><hr /><br />
              
              <form id="add-expense-form"  onSubmit={this.handleSubmit} method="post">
              
                <div className="form-group">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="desc">Description</label>
                            <input type="text" name="description" className="form-control" id="desc" aria-describedby="descHelp" placeholder="Expense description" value={this.state.desc} onChange={this.handleChange} />
                            <small id="descHelp" className="form-text text-muted">Short description about your periodic expense.</small>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="amount">Amount</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <select className="currency-box" id="currency" name="currency" defaultValue="eur" onChange={this.handleChange} required>
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
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" name="startDate" className="form-control" onChange={this.handleChange} required />
                    
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
                        <option value="Leisure">Bills</option>
                    </select>
                </div>
                
              

                <div className="form-group">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="desc">Occurrence</label>
                            <input type="number" name="occurence" className="form-control" id="occurence" aria-describedby="occHelp" min="1" value={this.state.occurence} onChange={this.handleChange} />
                            <small id="occHelp" className="form-text text-muted">Number of occurrence of your periodic expense.</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="period">Interval</label>
                            <select className="form-control" id="interval" name="interval" onChange={this.handleChange}>
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                                <option>Year</option>
                            </select>
                            
                        </div>
                        <span>This periodic expense will repeat every {this.state.occurence} {this.state.interval}{plural}</span>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-success">Add Periodic</button>
                <span className="text-danger">{this.state.error}</span>
            </form>
              
            </div>
          </div>
          
        );
      }
    }