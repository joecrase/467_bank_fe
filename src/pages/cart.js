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
import parts from '../dummydata.js';
import './parts.css';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      fullPrice: 0,
      fullWeight: 0,
    }
  }

  test() {
    this.props.getCart()
  }

  render() {
  return (
    <React.Fragment>
        <CssBaseline />
        <main>
          <Container className="cardGrid" maxWidth="lg">
            <Grid container spacing={4}>
              {this.props.currentCart.map((parts) => (
                <Grid item key={parts} xs={12} sm={6} md={4} lg={3}>
                  <Card className="card">
                    <CardMedia
                      className="cardMedia"
                      image={parts.picture}
                      title={parts.description}
                    />
                    <CardContent className="cardContent">
                      <Typography gutterBottom variant="h5" component="h2">
                        {parts.description}
                      </Typography>
                      <Typography>
                        ${parts.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => this.test()}>
                        Add To Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
  )
  }
}