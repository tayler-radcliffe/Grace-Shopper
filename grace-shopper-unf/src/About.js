import React from 'react';

const image1 = "https://images.pexels.com/photos/7473674/pexels-photo-7473674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image2 = "https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image3 = "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image4 = "https://images.pexels.com/photos/3287160/pexels-photo-3287160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image5 = "https://images.pexels.com/photos/2859181/pexels-photo-2859181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image6 = "https://images.pexels.com/photos/609771/pexels-photo-609771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image7 = "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image8 = "https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image9 = "https://images.pexels.com/photos/2918534/pexels-photo-2918534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const image10 = "https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function About() {


    return (
        <div>
            <div class="row">
                <div class="column">
                    <img src={image1} alt="images" />
                    <img src={image7} alt="images" />
                    <img src={image10} alt="images" />
                    <img src={image5} alt="images" />
                    <img src={image4} alt="images" />
                    <img src={image3} alt="images" />
                    <img src={image2} alt="images" />
                </div>
                <div class="column">
                    <img src={image9} alt="images" />
                    <img src={image8} alt="images" />
                    <img src={image4} alt="images" />
                    <img src={image8} alt="images" />
                    <img src={image2} alt="images" />
                    <img src={image10} alt="images" />
                    <img src={image1} alt="images" />
                </div>
                <div class="column">
                    <img src={image3} alt="images" />
                    <img src={image10} alt="images" />
                    <img src={image2} alt="images" />
                    <img src={image6} alt="images" />
                    <img src={image7} alt="images" />
                    <img src={image3} alt="images" />
                    <img src={image9} alt="images" />
                </div>
                <div class="column">
                    <img src={image6} alt="images" />
                    <img src={image2} alt="images" />
                    <img src={image3} alt="images" />
                    <img src={image1} alt="images" />
                    <img src={image8} alt="images" />
                    <img src={image7} alt="images" />
                    <img src={image10} alt="images" />
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}
