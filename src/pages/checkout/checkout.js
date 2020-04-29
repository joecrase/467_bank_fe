// Needs work to actually, you know, work.

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review.js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function creatOrderData(
    cart,
    authorizationNumber,
    weight,
    priceTotal,
    orderStatus
) {

    let cartFormated = cart.map((value,key) => {
      return {
        amount: value.count,
        partID: value["part"].number
      }
    })

    cart = cartFormated;

    console.log("cart to be sent")
    console.log(cart)


    return { cart, authorizationNumber, weight, priceTotal, orderStatus };
}


export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [cart, setCart] = React.useState(props.location.state.cart);
    const [productPrice, setProductPrice] = React.useState(
        props.location.state.productPrice
    );
    const [fullWeight, setFullWeight] = React.useState(
        props.location.state.fullWeight
    );
    const [shippingPrice, setShippingPrice] = React.useState();
    const [shippingInfo, setShippingInfo] = React.useState({
        firstName: '',
        lastName: '',
        address1: '',
        email: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    const [paymentInfo, setPaymentInfo] = React.useState({
        cardName: '',
        cardNumber: '', //NOTE IF THE DEFAULT VALUES CHANGE IN THE TEXTBOX THIS MUST BE CHANGED AS WELL
        expDate: '',
        cvv: '',
    });

    React.useEffect(() => {
        console.log(cart);
        getStateShippingPrice();
    }, []);

    function getStateShippingPrice() {
        console.log('Here is the full weight ' + fullWeight);
        axios
            .get('http://localhost:8080/shippingCost/getCost/' + fullWeight)
            .then(function (response) {
                setShippingPrice(response.data);
            });
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    async function makeAuthorization() {
        let authorizationNumber;
        let weight = fullWeight;
        let priceTotal = productPrice + shippingPrice;
        let orderStatus = 'authorized';
        let customerId = 1; // Id of the customer making the order

        console.log('Cart Contents');
        console.log(cart);

        console.log('Make the order call here with the given info');
        await axios
            .post('http://localhost:8080/creditcard/auth/', {
                cc: '6011 1234 4321 1234',
                name: paymentInfo.cardName,
                exp: paymentInfo.expDate,
                amount: productPrice + shippingPrice,
            })
            .then(function (response) {
                console.log('Autho made');
                console.log(response.data);
                authorizationNumber = response.data.authorization;
            })
            .catch(function (err) {
                console.log(err);
            });

        await Promise.all(
            cart.map((item) =>
                axios
                    .post('http://localhost:8080/inventory/decrement/', [
                        {
                            partId: item.part.number,
                            toChangeAmount: item.count,
                        },
                    ])
                    .then(function (response) {
                        console.log(response.data);
                    })
            )
        );

        // TODO: Add order to data base

        let order = creatOrderData(
            cart,
            authorizationNumber,
            weight,
            priceTotal,
            orderStatus
        );

        console.log('order to submit');
        console.log(order);

        await axios
            .post('http://localhost:8080/order/' + customerId, order)
            .then(function (response) {
                console.log('Order made');
                console.log(response.data);
            })
            .catch(function (err) {
                console.log(err);
            });

        handleNext();
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm setShippingInfo={setShippingInfo} />;
            case 1:
                return <PaymentForm setPaymentInfo={setPaymentInfo} />;
            case 2:
                return (
                    <Review
                        shippingPrice={shippingPrice}
                        shippingInfo={shippingInfo}
                        paymentInfo={paymentInfo}
                        cart={cart}
                        productPrice={productPrice}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                        Checkout{' '}
                        {
                            paymentInfo.cvv /*shippingInfo.firstName TODO test to make sure we dont have to render this*/
                        }
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant='h5' gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    Your order number is #2001539. We have
                                    emailed your order confirmation, and will
                                    send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={
                                            activeStep === steps.length - 1
                                                ? makeAuthorization
                                                : handleNext
                                        } /*handleNext*/
                                        className={classes.button}>
                                        {activeStep === steps.length - 1
                                            ? 'Place order'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
