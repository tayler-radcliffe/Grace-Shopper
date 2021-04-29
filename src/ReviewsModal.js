import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ReviewsModal({ product }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let reviews = product.reviews;

    return (
        <div>
            <button className="viewProductReviewsButton" style={{ padding: '5px', borderRadius: '30px', backgroundColor: 'white', color: 'black' }} type="button" onClick={handleOpen}>
                View Product Reviews
      </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {reviews ? reviews.map(review => {
                            return (
                                <div>
                                    <h2 style={{ fontFamily: "Rubik" }} id="transition-modal-title"> {review.title} </h2>
                                    <p style={{ marginTop: '10px', fontFamily: "Rubik" }} id="transition-modal-description"> <strong>Review:</strong> {review.description} </p>
                                    <div class="rating-section">
                                        <div class="stars-rating">
                                            <Rating name="half-rating-read" value={review.stars} precision={0.5} readOnly />
                                            <div style={{ fontSize: "15px", fontFamily: "Rubik" }}>{review.stars} out of 5 stars</div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            : <div> "Be the first to review!" </div>
                        }
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}