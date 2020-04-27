import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: props.paymentInfo.cardName },
    { name: 'Card number', detail: props.paymentInfo.cardNumber },
    { name: 'Expiry date', detail: props.paymentInfo.expDate }, // TODO change info here with what is entered
  ];
  const classes = useStyles();

  React.useEffect(() => {
    console.log("Here is everything regarding the review")
    console.log(props.shippingInfo)
    console.log(props.paymentInfo)
    console.log(props.cart)
    console.log(props.productPrice)
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={"Want " + product.count} secondary={product.part.description} />
            <Typography variant="body2">{product.part.price * product.count}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.productPrice/* TODO get shipping price and display it alongside here*/}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.shippingInfo.firstName} {props.shippingInfo.lastName}</Typography>
        <Typography gutterBottom>{props.shippingInfo.address1}, {props.shippingInfo.city}, {props.shippingInfo.zip}, {props.shippingInfo.country} </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
