import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_51HrXi4HaZ6dke1TomxqH7vnv6P1H3EBMf3VQ1vN6QeqnqakglDAeYdW5UnRs9pJeYtk013XZh2dHQeh8YR4uwmkv00ON65peWa"
      />
    )
  }
}