import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';



function ProfileTextFields({ username }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const classes = useStyles();

    return (
        <form className={classes.form} noValidate autoComplete="off">
             <TextField
                className={classes.text}
                id="standard-read-only-input"
                label="Username"
                defaultValue={username}
                InputProps={{
                    readOnly: true,
                }}
            />
             <TextField
                className={classes.text}
                id="standard"
                label="First Name"
                defaultValue={firstName}
                InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
            />
             <TextField
                className={classes.text}
                id="standard-read-only-input"
                label="Last Name"
                defaultValue={lastName}
                InputLabelProps={{
                    shrink: true
                  }}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                className={classes.text}
                id="standard-read-only-input"
                label="E-mail"
                defaultValue={email}
                InputLabelProps={{
                    shrink: true
                  }}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                variant='contained'
                color='primary'
                >Save Changes</Button>
        </form>
    )
}


function VerticalTabs({ username }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
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
            <TabPanel value={value} index={0}>
                <div style={{

                }}>
                    <h2>Welcome, {username}!</h2>
                    <ProfileTextFields username={username} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <h3>My Orders</h3>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    <h3>Wishlist</h3>
                </div>
            </TabPanel>
        </div>
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
        height: 224,
        marginTop: '20px'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    form: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        height: 224,
        marginTop: '20px'
    },
    text: {
        margin: '10px'
    }
}));



export default function Account({ username }) {

    if (username) {
        return (
            <div>
                <div>
                    <VerticalTabs username={username} />
                </div>
            </div>

        )
    } else return (
        <div>Sign in or register to see your account.</div>
    )
}