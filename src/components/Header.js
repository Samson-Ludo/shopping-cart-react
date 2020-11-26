import React from 'react';
import '../App.css';

import ShoppingCart from "./ShoppingCart";

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <a href="#">OKALUDO Online Store</a>
      </nav>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <Navigation />
        <ShoppingCart quantity={this.props.quantity}
          amountToPay={this.props.amountToPay} />  
      </header>
    )
  }
}

export default Header;