import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const image1 = "https://images.pexels.com/photos/1869646/pexels-photo-1869646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const image2 = "https://images.pexels.com/photos/812875/pexels-photo-812875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const image3 = "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const image4 = "https://images.pexels.com/photos/1456733/pexels-photo-1456733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";


function CarouselComponent() {
    return (
        <div className="carousel">
            <Carousel showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
                interval={5000}
                infiniteLoop
                useKeyboardArrows
                autoPlay>
                <div className="image">
                    <img src={image1} className="sliderimg" alt="apparel" />
                </div>
                <div className="image">
                    <img src={image2} className="sliderimg" alt="apparel" />
                </div>
                <div className="image">
                    <img src={image3} className="sliderimg" alt="apparel" />
                </div>
                <div className="image">
                    <img src={image4} className="sliderimg" alt="apparel" />
                </div>
            </Carousel>
        </div>
    );
}

export default CarouselComponent;