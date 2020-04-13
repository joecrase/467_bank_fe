import React from 'react';
import Button from '@material-ui/core/Button';

export default function Cart() {
  return (
    <div>
      <p>
        Ideally, this is where we'd be showing the cart and everything that's in it
      </p>
      <Button href="checkout">
        Click me for checkout
      </Button>
    </div>
  )
}