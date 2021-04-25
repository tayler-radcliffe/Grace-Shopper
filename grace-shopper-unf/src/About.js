import React from 'react';

const aboutImage1 = "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

const businessCardImage1 = "https://media-exp1.licdn.com/dms/image/C4E03AQErVAFb1O5KJw/profile-displayphoto-shrink_800_800/0/1615924012592?e=1624492800&v=beta&t=z0kgUBrzrdBXUaNMwBB3FP95DvKYuIypYpXVLPYedaw"
const businessCardImage2 = "https://media-exp1.licdn.com/dms/image/C4E03AQHC76VwD5ylmQ/profile-displayphoto-shrink_200_200/0/1593764333021?e=1624492800&v=beta&t=-eF-cr-AZacfhLcF0Z_io93CIGtxx329zIVqONTbrWc"
const businessCardImage3 = "https://media-exp1.licdn.com/dms/image/C4D03AQFezLOnYcmkZg/profile-displayphoto-shrink_200_200/0/1603295304032?e=1624492800&v=beta&t=0bNNlvOiq-B4B9FD_I2MRxvle8mUWbpCWb9QmiQe0UU"
export default function About() {


    return (
        <div className="aboutPageContainerWhole" style={{
            backgroundColor: 'black'
        }}>
            <div>
            </div>
            <img className="aboutPageImage1" src={aboutImage1} alt="aboutImage1" style={{
                height: '800px',
                width: '1200px',
                display: 'flex',
            }} />
            <div className="aboutPageContainer">
                <div style={{
                    fontSize: '50px',
                    fontFamily: 'Rubik',
                    marginTop: '1rem'
                }}> Meet team<span> vivid</span> </div>
                <div style={{
                    fontSize: '40px',
                    fontStyle: "Rubik",
                }}> we are: </div>
                <hr style={{
                    margin: '20px',
                }} />
                <div style={{
                    fontSize: '30px',
                    fontFamily: 'Rubik',
                    marginTop: '1rem'
                }}> dedicated to design</div>
                <hr style={{
                    margin: '20px',
                }} />
                <div style={{
                    fontSize: '30px',
                    fontFamily: 'Rubik',
                    marginTop: '1rem'
                }}> creating apparel that matters </div>
                <hr style={{
                    margin: '20px',
                }} />
                <div style={{
                    fontSize: '30px',
                    fontFamily: 'Rubik',
                    marginTop: '1rem'
                }}> always pushing the limits </div>

            </div>
            <div id="container">
                <div
                    style={{
                        marginTop: '40px'
                    }}
                    class="bc-wrapper bc-size bc-style">

                    <div class="bc-content">

                        <div class="header-txt text">
                            <span class="black-txt">vivid</span>
                            <div>Inc.</div>
                        </div>

                        <div style={{
                            marginTop: '30px'
                        }}
                            class="name-txt text">Josh Kalna</div>

                        <div class="image-wrapper">
                            <img src={businessCardImage1} alt="businessCardImage" />
                        </div>

                        <div class="qualification-txt text">Operations Director</div>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    left: '30%',
                    top: '90%'
                }} class="bc-wrapper bc-size bc-style">

                    <div class="bc-content">

                        <div class="header-txt text">
                            <span class="black-txt">vivid</span>
                            <div>Inc.</div>
                        </div>

                        <div class="name-txt text"> Tayler Radcliffe </div>

                        <div class="image-wrapper">
                            <img src={businessCardImage2} alt="businessCardImage" />
                        </div>

                        <div class="qualification-txt text">Products Specialist </div>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    left: '60%',
                    top: '90%'
                }}
                    class="bc-wrapper bc-size bc-style">

                    <div class="bc-content">

                        <div class="header-txt text">
                            <span class="black-txt">vivid </span>
                            <span>Inc.</span>
                        </div>

                        <div class="name-txt text">Austin Halbritter </div>

                        <div class="image-wrapper">
                            <img src={businessCardImage3} alt="businessCardImage" />
                        </div>

                        <div class="qualification-txt text"> Lead Designer</div>

                    </div>
                </div>
            </div>
        </div>
    )
}
