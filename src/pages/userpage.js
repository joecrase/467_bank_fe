
import React, { Component } from 'react';
import ToolBar from './../components/toolbar.js'
import Parts from './parts.js';
import Cart from './cart.js';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      componentNeeded: "Parts"
    }
    this.addPartToCart = this.addPartToCart.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
  }

  addPartToCart(part) {
      this.setState({
          cart: this.state.cart.concat(part)
      })
      //console.log(this.state.cart)
  }

  changeComponent(component){
      this.setState({
          componentNeeded: component
      })
  }

  renderPageComponent()
  {
      console.log("Rendering Component")
      if(this.state.componentNeeded === "Parts")
      {
          return <Parts addPart={this.addPartToCart}/>
      }
      else if(this.state.componentNeeded === "Cart")
      {
          return <Cart currentCart={this.state.cart}/>
      }
      else
      {
          return <div>Error, this is unexpected. Refer to RPC</div>
      }
  }
    
  render() {

    return (
        <div>
            <ToolBar changeView={this.changeComponent}/>
            <div>
                {this.renderPageComponent()}
            </div>
        </div>
    );
  }
}