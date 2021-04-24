import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { red, blue, pink } from '@material-ui/core/colors';
import './Account.css';
import { Link } from 'react-router-dom';



function ProfileTextFields({ username, purchaseHistory }) {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    const [user, setUser] = useState([]);

    const classes = useStyles();

    const getUser = async () => {
        await fetch(`http://localhost:3000/api/users/${username}/personal`, {
        }).then(response => response.json())
            .then(result => {
                setUser(result);
            })
            .catch(console.error);
    }

    useEffect(() => {
        Promise.all([getUser]).then(([data]) => {
            setUser(data);
        });
    }, [])


    const userId = user.id;

    const handleClick = async () => {

        if (!firstName) {
            firstName = user.firstName
        }

        if (!lastName) {
            lastName = user.lastName
        }

        if (!email) {
            email = user.email
        }

        await fetch('http://localhost:3000/api/users', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                firstName,
                lastName,
                email
            })
        }).then(response => response.json())
            .then(result => {
                swal({
                    title: 'Success',
                    text: 'Your changes have been saved!',
                    icon: 'success',
                    button: false,
                    timer: 2000
                })
            })
            .catch(console.error);
    }



    return (
        <div className={classes.form} noValidate autoComplete="off">
            <TextField
                className={classes.text}
                id="standard"
                label="First Name"
                variant='outlined'
                placeholder={user.firstName ? user.firstName : null}
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ display: 'flex', position: 'absolute' }}

            />
            <TextField
                className={classes.text}
                id="standard"
                label="Last Name"
                variant='outlined'
                placeholder={user.lastName ? user.lastName : null}

                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e) => setLastName(e.target.value)}
                style={{ display: 'flex', position: 'absolute', marginLeft: '240px' }}
            />
            <TextField
                className={classes.text}
                id="standard-input"
                label="E-mail"
                variant='outlined'
                placeholder={user.email ? user.email : null}
                InputLabelProps={{
                    shrink: true
                }}

                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'flex', marginTop: '100px', position: 'absolute', width: '300px' }}
            />
            <TextField
                className={classes.text}
                id="standard-read-only-input"
                label="Username"
                variant='outlined'
                defaultValue={username}
                disabled
                style={{ display: 'flex', marginTop: '200px', position: 'absolute', width: '300px' }}
            />
            <Button
                variant='contained'
                color='default'
                onClick={handleClick}
                style={{ display: 'flex', height: '40px', width: '150px', marginTop: '300px', position: 'absolute', marginLeft: '10px' }}
            >Save Changes</Button>
        </div>
    )
}


function VerticalTabs({ username, setUsername, purchaseHistory }) {
    console.log(purchaseHistory);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = useState('');

    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUser = async () => {
        await fetch(`http://localhost:3000/api/users/${username}/personal`, {
        }).then(response => response.json())
            .then(result => {
                setUser(result);
            })
            .catch(console.error);
    }

    useEffect(() => {
        Promise.all([getUser()]).then(([data]) => {
        });
    }, [])

    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                'Rubik', 'serif'
            ].join(','),
        },
        palette: {
            primary: red,
            secondary: pink,
            default: blue
        },
    });

    const firstName = user.firstName;

    const handleClick = () => {
        swal("Are you sure you want to delete your account?", {
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "styleModalButton",
                    closeModal: true,
                }
            }
        }).then((value) => {
            if (value === true) {
                handleDelete();
            }
        })
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();

            swal('Sorry to see you go!', 'Your account has been deleted!', 'success');
            setUsername('');
            localStorage.clear();
            history.push('/');


            return data;
        } catch (error) {
            throw error;
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="My Profile" {...a11yProps(0)} />
                    <Tab label="My Orders" {...a11yProps(1)} />
                    <Tab label="Wishlist" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0} >
                    <div>
                        <div style={{ marginLeft: '10px' }}>
                            <h2>Welcome, {firstName ? firstName : username}!</h2><br></br>
                    Personal Information
                    <Divider />
                        </div>
                        <ProfileTextFields username={username} />
                        <Button color='primary'
                            variant='contained'
                            style={{
                                display: 'flex',
                                height: '40px',
                                width: '170px',
                                marginTop: '130px',
                                marginLeft: '10px',
                                position: 'absolute'
                            }}
                            onClick={handleClick}>Delete Account</Button>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <h3 style={{ width: '150px' }}>My Orders</h3>
                        <Divider />
                        <div>
                            {purchaseHistory.map(item => {
                                return (
                                    <div>
                                        <h2>
                                            Product Name: {item.productName}
                                        </h2>
                                        <p>
                                            Price: {item.productPrice}
                                        </p>
                                        <p>
                                            Size: {item.size}
                                        </p>
                                        <p>
                                           Quantity: {item.quantity}
                                        </p>
                                        <p>
                                            Purchase Date: {item.date}
                                        </p>
                                    </div>
                                )   
                                })}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '50px',
                            marginLeft: '50px'
                        }}>No orders yet!</div>
                        <button className="homePageButton" style={{
                            cursor: 'pointer',
                            display: 'flex',
                            position: 'relative',
                            top: '30px',
                            left: '40px',
                            fontSize: '15px',
                            fontWeight: 'normal',
                            padding: '10px',
                            borderRadius: '30px',
                            width: '120px',
                            justifyContent: 'center',
                            fontFamily: 'Rubik',
                            transition: 'all .2s ease-in-out',
                            textDecoration: 'none'

                        }}>
                            <Link to="/products">
                                Browse
                    </Link>
                        </button>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <h3 style={{ width: '150px' }}>Wishlist</h3>
                        <Divider />
                        {/* wishlist.map() will go here // map over array of wishlist for user */}
                           {/* if WISHLIST EXISTS THEN MAP OVER AND DISPLAY HERE, IF NOT THEN DISPLAY MESSAGE vvvvv*/}
                           <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '50px',
                            marginLeft: '50px'
                        }}>No items in your wishlist!</div>
                        <button className="homePageButton" style={{
                            cursor: 'pointer',
                            display: 'flex',
                            position: 'relative',
                            top: '30px',
                            left: '80px',
                            fontSize: '15px',
                            fontWeight: 'normal',
                            padding: '10px',
                            borderRadius: '30px',
                            width: '120px',
                            justifyContent: 'center',
                            fontFamily: 'Rubik',
                            transition: 'all .2s ease-in-out',
                            textDecoration: 'none'

                        }}>
                            <Link to="/products">
                                Browse
                    </Link>
                        </button>
                    </div>
                </TabPanel>
            </div>
        </ThemeProvider>
    );
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        position: 'relative',
        height: 500,
        marginTop: '40px',
        marginLeft: '470px'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    form: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        alignItems: 'right',
        marginTop: '20px'
    },
    text: {
        margin: '10px'
    }
}));



export default function Account({ username, setUsername, purchaseHistory }) {

    const history = useHistory();

    if (username) {
        return (
            <div>
                <h1 style={{ backgroundColor: '#33383b', padding: '30px', color: 'white', paddingLeft: '500px' }}>My Account</h1>
                <div>
                    <VerticalTabs username={username} setUsername={setUsername} purchaseHistory={purchaseHistory} />
                </div>
            </div>

        )
    } else return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '568px' }}>
            <h2>Sign in or register to see your account.</h2><br></br>
            <Button
                variant='contained'
                onClick={history.push('/login')}>
                Sign in
            </Button><br></br>
            <Button
                variant='contained'
                onClick={history.push('/register')}>
                Register
            </Button>
        </div>
    )
}