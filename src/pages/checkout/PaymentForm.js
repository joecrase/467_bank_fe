import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm(props) {

  const [currentPaymentInfo, setCurrentPaymentInfo] = React.useState(
    {
      cardName: "Joseph Crase",
      cardNumber: "6011123443211234", //NOTE IF THE DEFAULT VALUES CHANGE IN THE TEXTBOX THIS MUST BE CHANGED AS WELL
      expDate: "12/2020",
      cvv: "123"
    }
  );

  React.useEffect(() => {
    props.setPaymentInfo(currentPaymentInfo)
  }, []);

  function handleChange(e) {
    console.log("There is a change")
    var temp = currentPaymentInfo
    temp[e.currentTarget.id] = e.currentTarget.value
    setCurrentPaymentInfo(temp)
    props.setPaymentInfo(temp)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
          required 
          id="cardName" 
          label="Name on card" 
          defaultValue="Joseph Crase" 
          onChange={handleChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          required 
          id="cardNumber" 
          label="Card number" 
          defaultValue="6011123443211234"
          onChange={handleChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          required 
          id="expDate" 
          label="Expiry date" 
          defaultValue="12/2020"
          onChange={handleChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            defaultValue="123"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
