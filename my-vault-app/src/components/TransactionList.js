import React from 'react';

export default class TransactionList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        category: 'expense',
        
      };
    }
  
    render() {
      return (
        <ul className="transactions">
                
        </ul>
      );
    }
  }
