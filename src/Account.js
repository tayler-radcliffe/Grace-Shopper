import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { red, blue, pink } from "@material-ui/core/colors";
import "./Account.css";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import {
    addReviewToProduct,
    deleteItemFromUserWishList,
    fetchProductIdFromProductName,
    fetchProducts,
    fetchWishListByUserId,
} from "./api";
import AddIcon from "@material-ui/icons/Add";

function ProfileTextFields({
    username,
    purchaseHistory,
    wishList,
    setProducts,
}) {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    const [user, setUser] = useState([]);

    const classes = useStyles();

    const getUser = async () => {
        await fetch(`http://localhost:3000/api/users/${username}/personal`, {})
            .then((response) => response.json())
            .then((result) => {
                setUser(result);
            })
            .catch(console.error);
    };

    useEffect(() => {
        Promise.all([getUser]).then(([data]) => {
            setUser(data);
        });
    }, []);

    const userId = user.id;

    const handleClick = async () => {
        if (!firstName) {
            firstName = user.firstName;
        }

        if (!lastName) {
            lastName = user.lastName;
        }

        if (!email) {
            email = user.email;
        }

        await fetch("http://localhost:3000/api/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                firstName,
                lastName,
                email,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                swal({
                    title: "Success",
                    text: "Your changes have been saved!",
                    icon: "success",
                    button: false,
                    timer: 2000,
                });
            })
            .catch(console.error);
    };

    return (
        <div className={classes.form} noValidate autoComplete="off">
            <TextField
                className={classes.text}
                id="standard"
                label="First Name"
                variant="outlined"
                placeholder={user.firstName ? user.firstName : null}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ display: "flex", position: "absolute" }}
            />
            <TextField
                className={classes.text}
                id="standard"
                label="Last Name"
                variant="outlined"
                placeholder={user.lastName ? user.lastName : null}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setLastName(e.target.value)}
                style={{ display: "flex", position: "absolute", marginLeft: "240px" }}
            />
            <TextField
                className={classes.text}
                id="standard-input"
                label="E-mail"
                variant="outlined"
                placeholder={user.email ? user.email : null}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    display: "flex",
                    marginTop: "100px",
                    position: "absolute",
                    width: "300px",
                }}
            />
            <TextField
                className={classes.text}
                id="standard-read-only-input"
                label="Username"
                variant="outlined"
                defaultValue={username}
                disabled
                style={{
                    display: "flex",
                    marginTop: "200px",
                    position: "absolute",
                    width: "300px",
                }}
            />
            <Button
                variant="contained"
                color="default"
                onClick={handleClick}
                style={{
                    display: "flex",
                    height: "40px",
                    width: "150px",
                    marginTop: "300px",
                    position: "absolute",
                    marginLeft: "10px",
                }}
            >
                Save Changes
      </Button>
        </div>
    );
}

function VerticalTabs({
    username,
    setUsername,
    purchaseHistory,
    setWishList,
    setProducts,
}) {
    console.log(purchaseHistory);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = useState("");

    const history = useHistory();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(2);
    const [stars, setStars] = useState(5);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = purchaseHistory.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    console.log(currentProducts);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUser = async () => {
        await fetch(`http://localhost:3000/api/users/${username}/personal`, {})
            .then((response) => response.json())
            .then((result) => {
                setUser(result);
            })
            .catch(console.error);
    };

    useEffect(() => {
        Promise.all([getUser()]).then(([data]) => { });
    }, []);

    const theme = createMuiTheme({
        typography: {
            fontFamily: ["Rubik", "serif"].join(","),
        },
        palette: {
            primary: red,
            secondary: pink,
            default: blue,
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
                },
            },
        }).then((value) => {
            if (value === true) {
                handleDelete();
            }
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();

            swal("Sorry to see you go!", "Your account has been deleted!", "success");
            setUsername("");
            localStorage.clear();
            history.push("/");

            return data;
        } catch (error) {
            throw error;
        }
    };

    const fetchWishList = async () => {
        const wishLists = await fetchWishListByUserId(user.id);
        setCompletedWishList(wishLists);
    };

    const deleteWishListItem = async (event, productId) => {
        event.preventDefault();
        console.log(completedWishList);
        console.log(productId);
        await deleteItemFromUserWishList(user.id, productId);
        const newList = await fetchWishListByUserId(user.id);
        setCompletedWishList(newList);
        setWishList(newList);
    };

    const addReview = async (event, productName) => {
        event.preventDefault();
        const id = await fetchProductIdFromProductName(productName);
        await addReviewToProduct(title, stars, description, id[0].id);
        const newProducts = await fetchProducts();
        setProducts(newProducts);
        setTitle("");
        setStars("");
        setDescription("");
    };

    const [completedWishList, setCompletedWishList] = useState([]);

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
                    <Tab onClick={fetchWishList} label="Wishlist" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div>
                        <div style={{ marginLeft: "10px" }}>
                            <h2>Welcome, {firstName ? firstName : username}!</h2>
                            <br></br>
              Personal Information
              <Divider />
                        </div>
                        <ProfileTextFields username={username} />
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{
                                display: "flex",
                                height: "40px",
                                width: "170px",
                                marginTop: "130px",
                                marginLeft: "8px",
                                position: "absolute",
                            }}
                            onClick={handleClick}
                        >
                            Delete Account
            </Button>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <h3 style={{ width: "150px" }}>Recent Purchases</h3>
                        <Divider />

                        {purchaseHistory[0] ? (
                            currentProducts.map((item) => {
                                return (
                                    <div>
                                        <h3 style={{ marginTop: "10px" }}>
                                            Order Confirmation # {item.orderConfirmationNumber}
                                        </h3>
                                        <h4>{item.productName}</h4>
                                        <p>Price: {item.productPrice}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Purchase Date: {item.date} </p>
                                        <AddIcon
                                            style={{ fontSize: "27px", color: "black" }}
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#myModalTwo"
                                            tabindex="-1"
                                        />
                                        <div id="myModalTwo" class="modal fade">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button
                                                            class="close"
                                                            type="button"
                                                            data-dismiss="modal"
                                                        ></button>
                                                        <h4 class="modal-title">Add Review</h4>
                                                    </div>
                                                    <div style={{ margin: '10px' }} class="modal-body">
                                                        <div class="popup"></div>
                                                        <div method="post" enctype="text/plain">
                                                            <input
                                                                style={{ padding: '10px' }}
                                                                type="text"
                                                                name="location"
                                                                placeholder="Title"
                                                                value={title}
                                                                onChange={(event) =>
                                                                    setTitle(event.target.value)
                                                                }
                                                            />
                                                            <input
                                                                style={{ margin: '0px 30px', padding: '10px' }}
                                                                type="integer"
                                                                name="location"
                                                                placeholder="Review/5 (ex. 3)"
                                                                onChange={(event) =>
                                                                    setStars(event.target.value)
                                                                }
                                                            />
                                                            <textarea
                                                                style={{ margin: '30px 0px', padding: '10px' }}
                                                                id="info"
                                                                type="text"
                                                                name="Description"
                                                                placeholder="Description"
                                                                value={description}
                                                                onChange={(event) =>
                                                                    setDescription(event.target.value)
                                                                }
                                                            />
                                                            <button style={{ padding: '5px', backgroundColor: 'white', borderRadius: '30px', width: '125px' }}
                                                                onClick={(event) => {
                                                                    addReview(event, item.productName);
                                                                    swal({
                                                                        title: 'Woo!',
                                                                        text: 'Your review has been added!',
                                                                        icon: 'success',
                                                                        button: false,
                                                                        timer: 2000
                                                                    })

                                                                    }
                                                                }
                                                            >
                                                                Add Review
                              </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "50px",
                                        marginLeft: "50px",
                                    }}
                                >
                                    No orders yet!
                </div>
                                <button
                                    className="homePageButton"
                                    style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        position: "relative",
                                        top: "30px",
                                        left: "40px",
                                        fontSize: "15px",
                                        fontWeight: "normal",
                                        padding: "10px",
                                        borderRadius: "30px",
                                        width: "120px",
                                        justifyContent: "center",
                                        fontFamily: "Rubik",
                                        transition: "all .2s ease-in-out",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Link to="/products">Browse</Link>
                                </button>
                            </div>
                        )}
                    </div>
                    <Pagination
                        productsPerPage={productsPerPage}
                        totalNumberOfProducts={purchaseHistory.length}
                        paginate={paginate}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <h3 style={{ width: "150px" }}>Wishlist</h3>
                        <Divider />
                        {completedWishList[0] ? (
                            completedWishList.map((list) => {
                                return (
                                    <div style={{ marginTop: "20px" }}>
                                        <Link to={`/products/${list.productsId}`}>
                                            <h2>{list.productName}</h2>
                                        </Link>
                                        <p>Price: ${list.productPrice}</p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={(event) =>
                                                deleteWishListItem(event, list.productsId)
                                            }
                                            style={{ marginTop: "2px", padding: "5px" }}
                                        >
                                            <i class="fas fa-trash"></i>
                                        </Button>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "50px",
                                        marginLeft: "50px",
                                    }}
                                >
                                    No items in your wishlist!
                </div>
                                <button
                                    className="homePageButton"
                                    style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        position: "relative",
                                        top: "30px",
                                        left: "80px",
                                        fontSize: "15px",
                                        fontWeight: "normal",
                                        padding: "10px",
                                        borderRadius: "30px",
                                        width: "120px",
                                        justifyContent: "center",
                                        fontFamily: "Rubik",
                                        transition: "all .2s ease-in-out",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Link to="/products">Browse</Link>
                                </button>
                            </div>
                        )}
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
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        position: "relative",
        height: 500,
        marginTop: "40px",
        marginLeft: "470px",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    form: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 224,
        alignItems: "right",
        marginTop: "20px",
    },
    text: {
        margin: "10px",
    },
}));

export default function Account({
    username,
    setUsername,
    purchaseHistory,
    setWishList,
    setProducts,
}) {
    const history = useHistory();

    if (username) {
        return (
            <div>
                <h1
                    style={{
                        backgroundColor: "#33383b",
                        padding: "30px",
                        color: "white",
                        paddingLeft: "500px",
                    }}
                >
                    My Account
        </h1>
                <div>
                    <VerticalTabs
                        username={username}
                        setUsername={setUsername}
                        purchaseHistory={purchaseHistory}
                        setWishList={setWishList}
                        setProducts={setProducts}
                    />
                </div>
            </div>
        );
    } else
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "568px",
                }}
            >
                <h2>Sign in or register to see your account.</h2>
                <br></br>
                <Button variant="contained" onClick={history.push("/login")}>
                    Sign in
        </Button>
                <br></br>
                <Button variant="contained" onClick={history.push("/register")}>
                    Register
        </Button>
            </div>
        );
}
