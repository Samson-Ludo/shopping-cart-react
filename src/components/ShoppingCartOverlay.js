import React from 'react';
import '../App.css';

import ShoppingCartProduct from "./ShoppingCartProduct";
import StripeCheckout from "./StripeCheckout";

class ShoppingCartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.updateAmountToPay = this.updateAmountToPay.bind(this);
  }
  closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
  }
  updateAmountToPay(item) {
    this.forceUpdate();
  }
  render() {
    let itemsInCart = this.props.data.itemsInCart.map((item, index) => {
      // Return key which defines an order of items inside a cart. The order in a cart is different than in database
      return <ShoppingCartProduct key={index} 
               item={item}
               indexInCart={index}
               removeFromCart={this.props.removeFromCart}
               updateAmountToPay={this.updateAmountToPay} />  
    });
    let amountToPay = 0;
    for (let i=0; i<this.props.data.items.length; i++) {
      amountToPay += this.props.data.items[i].price * this.props.data.items[i].quantityInCart;
    }
    return (
      <div id="overlay">
        <section id="shopping-cart">
          <div id="cart-header">
            <span id="cart-title">Shopping Cart</span>
            <i className="far fa-times-circle"
              onClick={this.closeOverlay.bind(this)}></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsInCart}
            </tbody>
          </table>
          <span id="empty-cart">{(itemsInCart.length == 0) ? "Shopping cart is empty" : ""}</span>
          <h3 id="cart-total">Cart Total</h3>
          <div id="totals">
            <span>Cart Totals</span>
            <span>Number of items: {this.props.data.quantity}</span>
            <span>Total: £{amountToPay}</span>
          </div>
					 <StripeCheckout
          name="Thanks for shopping with us!" 
          image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" 
          ComponentClass="div"
          amount={amountToPay} 
          currency="EUR"
          stripeKey="..."
          locale="zh"
          email="okaludosamson@gmail.com"
          shippingAddress
          billingAddress={false}
          zipCode={false}
          token={this.onToken} 
          opened={this.onOpened}
          closed={this.onClosed} 
          reconfigureOnUpdate={false}
          triggerEvent="onTouchTap"
        >
          <button id="checkout" 
            disabled={itemsInCart.length == 0 ? true : false} >Checkout</button>
						</StripeCheckout>
        </section>
      </div>
    )  
  }
}


export default ShoppingCartOverlay;