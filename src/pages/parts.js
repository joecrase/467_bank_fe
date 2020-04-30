// This is originally from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/album/Album.js
// Updated for use on this project

import React, { setState, Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './parts.css';

export default class Parts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      fullPrice: 0,
      fullWeight: 0,
      quantity: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async callAllProducts()
  {
    await axios.get('http://localhost:8080/inventory/all')
    .then(response => {
      this.setState({parts: response.data});
    });

    this.state.parts.forEach(part => this.state.quantity.push(0));
  }

  addToCart(part,key) {
    console.log("You want this many items " + this.state.quantity[key])
    console.log(this.state.quantity);
    var temp =[]
    for(var i = 0; i < this.state.quantity[key]; i++)
    {
      temp.push(part)
    }
    console.log(temp)
    this.props.addPart(temp)
}

  componentDidMount() {
    document.title = "CALF Co. Parts Store";
    console.log("entering component did mount")
    this.callAllProducts();

  }

  handleChange(event, key) {

   

    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {

      let temp = this.state.quantity;
      temp[key] = event.target.value;
       this.setState({
         quantity: temp
       })
       console.log("state is set")
    }
    else
    {
      event.target.value = ''
    }
  }
    
  render() {
    console.log("rerendering");

    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className="cardGrid" maxWidth="lg">
            <Grid container spacing={4}>
              {this.state.parts.map((parts, key) => (
                <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                  <Card className="card">
                    <CardMedia
                      className="cardMedia"
                      image={parts.part.pictureURL}
                      title={parts.part.description}
                    />
                    <CardContent className="cardContent">
                      <Typography gutterBottom variant="h5" component="h2">
                        {parts.part.description}
                      </Typography>
                      <Typography>
                        {parts.info}
                      </Typography>
                      <Typography>
                        ${parts.part.price}
                      </Typography>
                      <Typography>
                        Total Avalible: {parts.inventory}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={e => this.addToCart(parts,key)}>
                        Add To Cart
                      </Button>
                      <input type="text" value={this.state.quantity[key]} onChange={e => this.handleChange(e,key)}/>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}