import React from 'react';
import authentication from '../authentication';
import Header from '../components/Header'
import Back from '../components/Back'

export default class EditTransaction extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        desc: "", currency: "", amount: 0, category: "", payment: "", online: false , date: "", id: 0, error: ""
    }
   
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount(){
      //load expense into input fields
         const {location} = this.props;
        if(location.state.expense){
            this.setState({
                desc: location.state.expense.transactionTitle,
                amount: location.state.expense.expenseCost,
                currency: location.state.expense.transactionCurrency,
                category: location.state.expense.expenseType,
                payment: location.state.expense.transactionPlace,
                date: location.state.expense.transactionDate.split("T"),
                id: location.state.expense.expenseid,
   
            });
            
           document.getElementById("online").checked = location.state.expense.transactionOnline;

        }else {
            this.setState({error: "Error loading your expense. Please try again later."})
        }
         
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
            default:
                break;
        }
    }

  async handleEdit(event) { 
    event.preventDefault();
     
    await fetch('https://myvault.technology/api/expenses/edit/' + this.state.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authentication.token,
      },
      body: JSON.stringify({
        category: this.state.category,
        amount: this.state.amount,
        cashCard: this.state.payment,
        date: this.state.date,
        currency: this.state.currency,
        title: this.state.desc,
        onlineSwitch: this.state.online,
      })
    })

      .then(response => (response.json()))
      .then((response) => {

        if (response.success) {
            const {history} = this.props;
            history.push({
                pathname: '/vault',
                state: { message: "Your expense has been edited successfully!" }
              });
        }
        else {
            console.log('Error occured when editing expense!');
            this.setState({
                error: 'Unable to edit expense, please try again!'
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
            <h2>Edit Expense</h2><hr /><br />
              
              <form id="add-expense-form"  onSubmit={this.handleEdit} method="post">
              
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
                                <input type="number" name="amount" className="form-control" id="amount" placeholder="Expense amount" min="0" value={this.state.amount} onChange={this.handleChange} required/>
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
                        <option value="Leisure">Bills</option>
                    </select>
                </div>
                
                <div className="form-group">
                        <label className="form-check-label" htmlFor="payment">Payment Method</label>
                    
                        <select className="form-control" id="payment" name="payment" value={this.state.payment} onChange={this.handleChange}>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Periodic">Periodic</option>
                        </select><br />
                        
                        

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="online" name="online" value="online" aria-describedby="onlineHelp" onChange={this.handleChange}/>
                            <label className="form-check-label" htmlFor="online">Online Purchase?</label>
                            <small id="onlineHelp" className="form-text text-muted">Monitor your expenses which happen online.</small>
                        </div>
                </div>
                <button type="submit" className="btn btn-outline-success">Edit Expense</button>
                <span className="text-danger">{this.state.error}</span>
            </form>
              
            </div>
      </div>
      );
    }
  }