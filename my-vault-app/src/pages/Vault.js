import React from 'react';
import './page.css';
import TransactionLoader from '../components/TransactionLoader';
import Header from '../components/Header';
import authentication from '../authentication'


export default class Vault extends React.Component {
  constructor(props){
    super(props)
      console.log(this.props.location);

      if(this.props.location.state === undefined){
          this.state = {
            message: "", //default to empty
          } 
      }else{
        this.state = {
          message: this.props.location.state.message
        } 
      }
      
  }

  handleCloseModal(event, cb){
    var modal = document.getElementById("messageClose");
    modal.style.display = "none";

  }

  componentDidMount(){

    fetch('https://myvault.technology/api/expenses/periodic', {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authentication.token,
      },
  })


      .then(response => (response.json()))
      .then((response) => {

          if (response.success) {
          }
          else {
              console.log('Error updating periodic expenses')
              console.log(response);
          }
      })
      .catch(error => console.warn(error))

      //do if message not empty
      if(this.state.message !== ""){
        var modal = document.getElementById("messageClose");
        modal.style.display = "block";
      }
    
  }

  
  
    render() {

      return (
        <div>
          <Header />
          <div className="main-container focused">
            {/* <div className="container-block"> */}

            <div className="modal-message" id="messageClose">
                    <div className="modal-content-message">
                      <div className="side-row">
                        <span className="close" onClick={this.handleCloseModal}>&times;</span>
                        <span className="text-success side-margin">{this.state.message}</span>
                      </div>
                    </div>
                  </div>

              <div className="content-block">
                <h2>My Expenses</h2>
                

                <TransactionLoader />          
              </div>

          </div>
        </div>
        
      );
    }
  }