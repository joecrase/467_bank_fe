import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {

  const [currentShippingInfo, setCurrentShippingInfo] = React.useState(
    {
      firstName: "Joseph",
      lastName: "Crase",
      address1: "312 South Fifth Street", //NOTE IF THE DEFAULT VALUE IS CHANGED FOR THE TEXTBOXES, THIS MUST BE CHANGED AS WELL
      email: "joecrase@gmail.com",
      city: "Kirkland",
      state: "Illinois",
      zip: "60146",
      country: "United States of America"
    }
  );

  React.useEffect(() => {
    console.log("All references")
    props.setShippingInfo(currentShippingInfo)
  }, []);

  function handleChange(e) {
    console.log("There is a change")
    var temp = currentShippingInfo
    temp[e.currentTarget.name] = e.currentTarget.value
    setCurrentShippingInfo(temp)
    props.setShippingInfo(temp)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={handleChange}
            defaultValue="Joseph"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={handleChange}
            defaultValue="Crase"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={handleChange}
            defaultValue="312 South Fifth Street"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="billing address-line2"
            onChange={handleChange}
            defaultValue="joecrase@gmail.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={handleChange}
            defaultValue="Kirkland"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" 
          name="state" 
          label="State/Province/Region" 
          defaultValue="Illinois" 
          onChange={handleChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleChange}
            defaultValue="60146"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange}
            defaultValue="United States of America"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" checked="true" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
