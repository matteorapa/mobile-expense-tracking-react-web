import React from 'react';
import authentication from '../authentication';
import {Link} from "react-router-dom";
import Header from '../components/Header';
import {getCategoryIcon} from '../global';


export default class PeriodicLoader extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            dataSource: [],
            category: "",
            currency: "",
            desc: "",
            amount: 0,
            occurence: 3,
            interval: "day",
            date: new Date(),
            error: "",  
            selectedid: 0,
            message: ""
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditPeriodic = this.handleEditPeriodic.bind(this);
    }

    componentDidMount() {

        if(this.props.location.state !== undefined){
            this.setState({message: this.props.location.state.message})
        }

        fetch('https://myvault.technology/api/expenses/periodic', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        dataSource: response.output,

                    })
                }
                else {
                    console.log('Error loading periodics');
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleEditPeriodic(event){
        event.preventDefault();
        var id = document.getElementById("periodicid").value;
        await fetch('https://myvault.technology/api/expenses/periodic/edit/' + id, {
        method: 'PUT',
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
                interval: this.state.occurence + " " + this.state.interval,
                date: String(this.state.date)
            })
        })
        .then(response => (response.json()))
        .then((response) => {

            if (response.success) {
                console.log('Your periodic has been edited successfully!');
                //close modal
                this.handleCloseModal();
                //refresh state
                this.componentDidMount();

                this.state.message = "Your periodic has been edited successfully!"
            }
            else {
                console.log('Periodic edit error');
                
            }
        })
        .catch(error => console.warn(error))

    }

    async handleDeleteClick(event, id){

        await fetch('https://myvault.technology/api/expenses/periodic/del/'+id, {
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
                    this.componentDidMount();
                    this.state.message = "Your periodic has been deleted successfully!"
                }
                else {
                    console.log('Unsuccessful periodic delete');
                    
                }
            })
            .catch(error => console.warn(error))
    }

    handleChange(event) { 
        
        switch(event.target.name){
            case 'description':
                console.log(event.target.value)
                this.setState({
                desc: event.target.value
                });
                
            break;
            case 'amount':
                console.log(event.target.value)
                this.setState({
                amount: event.target.value
                });
                
            break;
            case 'currency':
                console.log(event.target.value)
                this.setState({
                currency: event.target.value
                });
                
            break;
            case 'category':
                console.log(event.target.value)
                this.setState({
                category: event.target.value
                });
                
            break;
            case 'occurence':
                console.log(event.target.value)
                this.setState({
                occurence: event.target.value
                });
                
            break;
            case 'interval':
                console.log(event.target.value)
                this.setState({
                interval: event.target.value
                });
            break;
            case 'startDate':
                console.log(event.target.value)
                this.setState({
                date: event.target.value
                });
            break;
            default: 
                break;
        }
    }

    handleEditClick(event ,pid){
        var periodic;
        var i;
        var found = false;

        for(i = 0; i < this.state.dataSource.length; i++){
            if(this.state.dataSource[i].periodicid === pid){
                periodic = this.state.dataSource[i];
                found = true
            }
        }

        if(found){
            var splittedInterval = periodic.interval.split(" ");
            this.setState({
                desc:  periodic.transactiontitle,
                currency: periodic.transactioncurrency,
                amount: periodic.expensecost,
                category: periodic.expensetype,
                occurence: splittedInterval[0],
                interval: splittedInterval[1],
                date:  periodic.lasttransdate,
                selectedid: periodic.periodicid
            });

            var modal = document.getElementById("editPeriodic");
            modal.style.display = "block";  

        }else {
            console.log("Periodic not found in list");
        }
        

    }
    
    handleCloseModal(event){
        var modal = document.getElementById("editPeriodic");
        modal.style.display = "none";
    }

    render() {

        let data = this.state.dataSource;
        var index = -1;
        let periodics = data.map((p) => {
            index = index + 1;
            let categoryIcon = getCategoryIcon(p.expensetype);
            var date = new Date(p.lasttransdate);
            var now = new Date();   
            var dateText = "";
            //check whether date is in past
            if (now - date > 0 ) {
                var d = new Date();
                var days = 0;
                var splittedInterval = p.interval.split(" ");
                switch(splittedInterval[1]){
                    case "Day":
                        days = parseInt(splittedInterval[0], 10);
                        break;
                    case "Week":
                        days = parseInt(splittedInterval[0], 10) * 7;
                        break;
                    case "Month":
                        days = parseInt(splittedInterval[0], 10) * 30;
                        break;
                    case "Year":
                        days = parseInt(splittedInterval[0], 10) * 365;
                        break;
                    default:
                        break;
                }
                d.setTime(d.getTime() + (days*24*60*60*1000));
                dateText = "Your next expense will be added on " + d.toLocaleDateString();
                
            }else {
                //future date, show date when periodic starts
                dateText = "Your periodic expense will start on " + date.toLocaleDateString();
            }

            //return template for every periodic expense
            return (<div key={p.periodicid} className="transaction expense" onClick={this.handleClick}>
                        <div className="periodic-category">
                            <i className={categoryIcon} ></i>
                            <span>{p.expensetype}</span>
                        </div>
                        <div className="inner-periodic">
                            <span><strong>{p.transactiontitle}</strong></span><br/>
                            <span className="text-muted">{dateText}</span><hr/>

                            <span className="">{p.transactioncurrency} | {p.expensecost}</span>
                                
                            <div className="end-row">
                                <button className="btn btn-outline-secondary btn-sm function" onClick={() => this.handleEditClick(this, p.periodicid)}>Edit Periodic</button>
                                <button className="btn btn-outline-danger btn-sm function" onClick={() => this.handleDeleteClick(this, p.periodicid)}>Delete Periodic</button>
                            </div>

                            
                        </div>    
                </div>);        
        }); 

        var plural = "";
          if(this.state.occurence > 1){
              plural = "s";
          }else {
              plural = "";
          }

      return (<div>
            <Header />
            <div className="main-container focused">
            <span className="text-success">{this.state.message}</span>
                <h2>My Periodic Expenses</h2>
                <Link to="/addperiodic" className="btn btn-outline-secondary btn-sm">Add Periodic Expense <i className="fas fa-long-arrow-alt-right"></i></Link><hr/><br />
                <div className="transactions">
                    {periodics}         
                </div>  
                <div className="modal" id="editPeriodic">
                    <div className="modal-content">
                      <span className="close" onClick={this.handleCloseModal}>&times;</span>


                      <form id="add-expense-form"  onSubmit={this.handleEditPeriodic} method="post">
                            <h2>Edit Periodic Expense</h2><hr />
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="desc">Description</label>
                                        <input type="text" name="description" className="form-control" id="desc" aria-describedby="descHelp" placeholder="Expense description" value={this.state.desc} onChange={this.handleChange} required/>
                                        <small id="descHelp" className="form-text text-muted">Short description about your periodic expense.</small>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="amount">Amount</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <select className="currency-box" id="currency" name="currency" min="0" value={this.state.currency} onChange={this.handleChange} required>
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
                                <input type="date" id="startDate" name="startDate" className="form-control" value={this.state.date} onChange={this.handleChange} required />
                                
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
                                        <input type="number" name="occurence" className="form-control" id="occurence" aria-describedby="occHelp" min="1" value={this.state.occurence} onChange={this.handleChange} required/>
                                        <small id="occHelp" className="form-text text-muted">Number of occurrence of your periodic expense.</small>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="period">Interval</label>
                                        <select className="form-control" id="interval" name="interval" value={this.state.interval} onChange={this.handleChange}>
                                            <option value="Day">Day</option>
                                            <option value="Week">Week</option>
                                            <option value="Month">Month</option>
                                            <option value="Year">Year</option>
                                        </select>
                                        
                                    </div>
                                    <span>This periodic expense will repeat every {this.state.occurence} {this.state.interval}{plural}</span>
                                </div>
                            </div>
                            <input type="hidden" id="periodicid" name="periodicid" value={this.state.selectedid}/>
                           
                            <div className="button-row">
                                <button type="button" className="btn btn-light btn-sm function" onClick={this.handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn btn-outline-success function">Edit Periodic</button>
                            </div>
                            <span className="text-danger">{this.state.error}</span>
                        </form>
                      
                    </div>
                  </div>   
            </div>
        </div>
     
      );
    }
  }