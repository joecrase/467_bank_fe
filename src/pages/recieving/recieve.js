import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './recieve.css';
import { Button } from '@material-ui/core';
import axios from 'axios';

export default class Recieve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittingArray: [],
      //Default values for demo:
      quantity1toChangeAmount: 1,
      quantity2toChangeAmount: 1,
      quantity3toChangeAmount: 1,
      quantity4toChangeAmount: 1,
      item1partId: 1,
      item2partId: 2,
      item3partId: 1,
      item4partId: 4,
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    var id = event.target.id
    this.setState({ [id] : event.target.value })
  }

  handleSubmit = (event) => {
    for(var i = 1; i < 11; i++) {
      let item = "item" + i + "partId";
      let quantity = "quantity" + i + "toChangeAmount";
      
      if((this.state[item] !== undefined) && (this.state[quantity] !== undefined)) {
        let update = {
          partId : parseInt(this.state[item]),
          toChangeAmount : parseInt(this.state[quantity])
        }

        this.state.submittingArray.push(update);
      }
    }

    console.log(this.state.submittingArray);
    
    const array = JSON.stringify(this.state.submittingArray);

    console.log(array);
    
    axios.post("http://localhost:8080/inventory/increment", {array})
    .then(res => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className = "row">
        <div className = "col-sm-1" />
        <div className = "col-md-8 col-sm-11 col-xs-12">
          <div className = "newItem">
            <NewItem item="item1" quantity="quantity1" id={this.state.item1partId} qty={this.state.quantity1toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item2" quantity="quantity2" id={this.state.item2partId} qty={this.state.quantity2toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item3" quantity="quantity3" id={this.state.item3partId} qty={this.state.quantity3toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item4" quantity="quantity4" id={this.state.item4partId} qty={this.state.quantity4toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item5" quantity="quantity5" id={this.state.item5partId} qty={this.state.quantity5toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item6" quantity="quantity6" id={this.state.item6partId} qty={this.state.quantity6toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item7" quantity="quantity7" id={this.state.item7partId} qty={this.state.quantity7toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item8" quantity="quantity8" id={this.state.item8partId} qty={this.state.quantity8toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item9" quantity="quantity9" id={this.state.item9partId} qty={this.state.quantity9toChangeAmount} handleChange={this.handleChange} />
            <NewItem item="item10" quantity="quantity10" id={this.state.item10partId} qty={this.state.quantity10toChangeAmount} handleChange={this.handleChange} />
          </div>
          
          <Button className="button" variant="contained" color='primary' onClick={ this.handleSubmit }>Submit Recieved Product</Button>
        </div>
        <div className = "col-sm-1 col-xs-0" />
      </div>
    )
  }
}

function NewItem(item) {  
  return(
    <div className = "newItem">
      <TextField defaultValue = {item.defaultItemNum} id = {item.item + "partId"} label = "Item number" className = "text" 
      value={item.id}
      onChange={item.handleChange} />
      <TextField id = {item.quantity + "toChangeAmount"} label = "Quantity recieved" 
      value={item.qty}
      onChange={item.handleChange}/>
    </div>
  )
}
