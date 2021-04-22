import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import swal from 'sweetalert';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      marginLeft: '10%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

  
  


export default function Checkout() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [state, setState] = React.useState({
        shipping: '',
        name: 'hai',
      });
      const [cardState, setCardState] = React.useState({
        card: '',
        name: 'hai',
      });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [apt, setApt] = useState('');
    const [city, setCity] = useState('');
    const [usState, setUsState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardEx, setCardEx] = useState('');
    const [cardCvv, setCardCvv] = useState('');


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const handleSelectChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const handleCardChange = (event) => {
        const name = event.target.name;
        setCardState({
          ...cardState,
          [name]: event.target.value,
        });
      };

    const orderPurchased = () => {
        if(firstName && lastName && address && city && usState && zipCode && cardNumber && cardEx && cardCvv && state.shipping) {
        swal({title: 'Woo!',
            text: 'Your order has been placed!',
            icon: 'success',
            button: false,
            timer: 3000}) 
    } else {
        swal({title: 'Oops!',
            text: 'Your missing something! Please fill out empty fields.',
            icon: 'error'}) 
    }
}

    return (

        <div>
            <h1 style={{ display: 'flex', marginLeft: '200px', marginTop: '30px', marginBottom: '30px' }}>Checkout</h1>
            <div className={classes.root}>

                <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Your Cart</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div style={{marginBottom: '50px'}}>
                            Mapped cart items here.
                            <Button style={{position: 'absolute', marginTop: '20px', marginLeft: '1165px' }}
                                        variant='contained'
                                        onClick={() => {
                                            handleChange('panel1');
                                            setExpanded('panel2')
                                            }
                                        }>Continue</Button>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Shipping Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div style={{ display: 'flex', padding: '10px', flexDirection: 'column', marginBottom: '30px' }}>
                                <div>
                                    <TextField required variant='filled' id="standard-basic" label="First Name" style={{ marginRight: '20px' }} onChange={e => setFirstName(e.target.value)}/>
                                    <TextField required variant='filled' id="standard-basic" label="Last Name" style={{ marginRight: '20px' }} onChange={e => setLastName(e.target.value)}/>
                                    <TextField required variant='filled' id="standard-basic" label="E-mail" style={{ marginRight: '20px', width: '300px' }} onChange={e => setEmail(e.target.value)}/>
                                </div >
                                <div style={{ marginTop: '20px' }}>
                                    <TextField required variant='filled' id="standard-basic" label="Address" style={{ marginRight: '20px', width: '500px' }} onChange={e => setAddress(e.target.value)}/>
                                    <TextField variant='filled' id="standard-basic" label="Apt/Unit #" style={{ marginRight: '20px', width: '100px', }} onChange={e => setApt(e.target.value)}/>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <TextField required variant='filled' id="standard-basic" label="City" style={{ marginRight: '20px', width: '250px' }} onChange={e => setCity(e.target.value)}/>
                                    <TextField required variant='filled' id="standard-basic" label="State" style={{ marginRight: '20px' }} onChange={e => setUsState(e.target.value)}/>
                                    <TextField required variant='filled' id="standard-basic" label="Zip Code" style={{ marginRight: '20px', width: '150px' }} onChange={e => setZipCode(e.target.value)}/>
                                    <Button style={{ marginTop: '20px', marginLeft: '652px' }}
                                        variant='contained'
                                        onClick={() => {
                                            handleChange('panel2');
                                            setExpanded('panel3')
                                            }
                                        }>Continue</Button>
                                </div>
                                <div style={{ position: 'absolute', marginLeft: '950px', width: '400px' }}>
                                    <InputLabel htmlFor="filled-age-native-simple">Shipping Method</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={state.shipping}
                                        onChange={handleSelectChange}
                                        inputProps={{
                                            name: 'shipping',
                                            id: 'filled-age-native-simple',
                                        }}
                                        style={{ width: '300px' }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value='Ground Shipping'>Ground Shipping (5-8 Business Days)</option>
                                        <option value='Two-Day Express'>Two-Day Express ($15.95)</option>
                                        <option value='Overnight '>Overnight ($28.99)</option>
                                    </Select>
                                </div>
                            </div>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>Payment Method</Typography>
                    </AccordionSummary>

                    <AccordionDetails>

                        <div style={{display: 'flex', marginLeft: '20px', marginTop: '20px', marginBottom: '30px'}}>
                            <div style={{ width: '200px'}}>
                                <InputLabel htmlFor="filled-age-native-simple">Card Type</InputLabel>
                                <Select
                                    required
                                    native
                                    value={state.card}
                                    onChange={handleCardChange}
                                    inputProps={{
                                        name: 'card',
                                        id: 'filled-age-native-simple',
                                    }}
                                    style={{ width: '170px', height: '40px' }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value='Visa'>Visa</option>
                                    <option value='Mastercard'>Mastercard</option>
                                    <option value='American Express'>American Express</option>
                                    <option value='Discover'>Discover</option>
                                </Select>
                                    </div><div>
                                <TextField required type="number" variant='filled' id="standard-basic" minlength='13' maxlength = "19" label="Card Number" style={{ marginRight: '20px', width: '300px' }} 
                                     onChange={e => setCardNumber(e.target.value)}/>
                                <TextField required variant='filled' id="standard-basic" minlength='5' maxlength = "5" label="Expiration Date (MM/YY)" style={{ marginRight: '20px', width: '250px'}}
                                     onChange={e => setCardEx(e.target.value)} />            
                                <TextField required type="number" variant='filled' id="standard-basic" minlength='3' maxlength = "3" label="CVV #" style={{ marginRight: '20px', width: '150px' }} 
                                     onChange={e => setCardCvv(e.target.value)}/>
                                <Button style={{ marginTop: '20px', marginLeft: '360px' }}
                                    variant='contained'
                                    onClick={() => {
                                        handleChange('panel3');
                                        setExpanded('panel4')
                                        }}>Continue</Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography className={classes.heading}>Review Order</Typography>

                        </AccordionSummary>
                                    <AccordionDetails>
                                        <div >
                                            <h4 style={{marginBottom: '5px'}}>Personal Info</h4> 
                                            <Divider />
                                            <p style={{marginTop: '10px'}}>{firstName} {lastName} <br></br>{email}</p>
                                            <h4 style={{marginBottom: '5px', marginTop: '20px'}}>Shipping Details</h4> 
                                            <Divider />
                                            <h5 style={{marginTop: '10px'}}>Shipping Address</h5>
                                            {address ? <p style={{marginTop: '5px'}}>{address} {apt} <br></br> {city}, {usState} {zipCode}</p> : null}
                                            <h5 style={{marginTop: '10px'}}>Shipping Method</h5>
                                            <p style={{marginTop: '5px'}}>{state.shipping}</p>
                                            <h4 style={{marginBottom: '5px', marginTop: '20px'}}>Order Details</h4> 
                                            <Divider />
                                            <h5 style={{marginTop: '10px'}}>Payment Method</h5>
                                            {cardNumber ? <p style={{marginTop: '5px'}}>{cardState.card}<br></br>{cardNumber}<br></br>Exp: {cardEx} CVV# {cardCvv}</p> : null}
                                            <h5 style={{marginTop: '10px'}}>Order Items</h5>
                                            <p style={{marginTop: '5px'}}>Mapped Items</p>
                                            <Button style={{marginTop: '20px', width: '150px'}}
                                                variant='contained'
                                                onClick={
                                                    orderPurchased
                                                }>Place Order</Button>
                                        </div>
                                    </AccordionDetails>
                
                </Accordion>
            </div>
        </div >
    );
}
