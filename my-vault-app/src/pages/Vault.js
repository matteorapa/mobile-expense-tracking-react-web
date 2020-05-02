import React from 'react';
import './page.css';
import TransactionLoader from '../components/TransactionLoader';
import Header from '../components/Header';


export default class Vault extends React.Component {
  constructor(props){
    super(props)
    
      this.state = {
        message: this.props.location.search
      } 
  }

  handleCloseModal(event, cb){
    var modal = document.getElementById("messageClose");
    modal.style.display = "none";

  }

  componentDidMount(){
    //do if message not empty
    if(this.state.message != ''){
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
                    <div class="modal-content-message">
                      <div className="side-row">
                        <span class="close" onClick={this.handleCloseModal}>&times;</span>
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