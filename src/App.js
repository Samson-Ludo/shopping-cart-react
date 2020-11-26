import React from 'react';
import './App.css';
import axios from "axios";

import ProductList from "./components/ProductList";
import Header from "./components/Header";
import ShoppingCartOverlay from "./components/ShoppingCartOverlay";
import ShoppingCartProduct from "./components/ShoppingCartProduct";


let productItems = [];

class App extends React.Component {
  constructor(props) {
		
    super(props);
    this.state = {
			shoppingProducts: [],
      items: [],
      quantity: 0,
      amountToPay: 0,
      itemsInCart: []
    }
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

	componentDidMount() {
		axios.get('https://fakestoreapi.com/products/')
	.then(result => {
      result.data.map(product => {
				productItems.push({...product, quantityInCart: 0, inCart: false});
				this.setState({
					shoppingProducts: [...productItems],
					items: [...productItems]
				})
			})
  }).catch(err => console.log(err))
	}

  addToCart(item) {
    let itemsInCart = this.state.itemsInCart;
    itemsInCart.push(this.state.items[item.id-1]);
    this.state.shoppingProducts[item.id-1].inCart = true;
    this.state.shoppingProducts[item.id-1].quantityInCart = 1;
    this.setState({
      quantity: this.state.quantity + 1,
      amountToPay: this.state.amountToPay + this.state.items[item.id].price,
      itemsInCart: itemsInCart,
      items: this.state.shoppingProducts
    });
  }
  removeFromCart(item, indexInCart) {
    let itemsInCart = this.state.itemsInCart;
    this.state.shoppingProducts[item.id].inCart = false;
    this.state.shoppingProducts[item.id].quantityInCart = 0;
    itemsInCart.splice(indexInCart, 1);
    this.setState({
      quantity: this.state.quantity - 1,
      amountToPay: this.state.amountToPay - this.state.items[item.id].price,
      itemsInCart: itemsInCart,
      items: this.state.shoppingProducts
    });
  }
	
  render() {
		console.log(this.state.items);

    return (
      <main>
        <Header quantity={this.state.quantity}
          amountToPay={this.state.amountToPay} />
        <ShoppingCartOverlay data={this.state}
          removeFromCart={this.removeFromCart} />
        <ProductList items={this.state.shoppingProducts}
          addToCart={this.addToCart} />
      </main>
    )
  }
}

export default App;
