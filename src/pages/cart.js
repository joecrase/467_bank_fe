import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './parts.css';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      fullPrice: 0,
      fullWeight: 0,
      inventoryDesc: [], // will hold inventory info regarding what the user wants
      exceedsInventory: false, // a bool that checks if the count is exceeding the inventory
      totalPrice: 0,
    }
  }

  componentDidMount() {
    this.countUserNeeds()
  }

  countUserNeeds() {
    var currentCart = this.props.currentCart
    var tempArray = []
    var setOfIds = new Set()
    var uniqueInventory = []
    var totalPrice = 0
    for(let i = 0; i < currentCart.length; i++)
    {
      var lastSize = setOfIds.size
      tempArray.push(currentCart[i].id)
      setOfIds.add(currentCart[i].id)
      var currentSize = setOfIds.size
      if(lastSize != currentSize)
      {
        uniqueInventory.push(currentCart[i])
      }
    }
    //console.log(setOfIds)

    setOfIds = Array.from(setOfIds);

    for (var i = 0; i < setOfIds.length; i++) {
      //console.log("hey")
      var count = 0;
      for (var g = 0; g < tempArray.length; ++g) {
        if (tempArray[g] == setOfIds[i])
          count++;
      }
      uniqueInventory[i].count = count
      totalPrice = totalPrice + (uniqueInventory[i].part.price * uniqueInventory[i].count)
    }
    console.log(uniqueInventory)
    this.setState({
      inventoryDesc: uniqueInventory,
      totalPrice: totalPrice
    })
  }

  checkInventory(userWants, inventory) {
    if(userWants > inventory)
    {
      if(this.state.exceedsInventory != true)
      {
        this.setState({
          exceedsInventory: true
        })
      }
      return (
        <div>
          WARING, INVENTORY EXCEEDED. PLEASE GO BACK AND REORDER
        </div>
      )
    }
    else
    {
      return (
        <div>
          In Stock
        </div>
      )
    }
  }

  renderList(){ // TODO put the cart info here
    return(
      <main>
      <Container className="cardGrid" maxWidth="lg">
        <Grid container spacing={4}>
          {this.state.inventoryDesc.map((parts) => (
            <Grid item key={parts} xs={12} sm={6} md={4} lg={3}>
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
                    You Want: {parts.count}
                  </Typography>
                  <Typography>
                    {this.checkInventory(parts.count, parts.inventory)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
    )
  }

  render() {
  return (
    <React.Fragment>
      <CssBaseline />
      {this.renderList()}
      <div className="totalCost">
        Total: {this.state.totalPrice}
      </div>
    </React.Fragment>
  )
  }
}