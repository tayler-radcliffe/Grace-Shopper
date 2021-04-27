import React from 'react';
import shoeImage from "./Images/shoeProject.png";
import NearMeIcon from '@material-ui/icons/NearMe';
import { Link } from 'react-router-dom';

const color1 = 'rgba(246, 184, 170, 1)';
const color2 = 'rgba(242, 229, 228, 1)';

export default function Home() {
    return (
        <div className="home_container" style={{
            overflow: 'hidden',
            background: `linear-gradient(to bottom,  ${color1} 55%,${color2} 100%)`,
            height: '1106px',
            width: '100%',
            borderBottom: '100px solid white',
            textAlign: 'center'
        }}>
            <div className="home_card">
                <div style={{
                    position: 'relative',
                    top: '350px',
                    left: '250px',
                    display: 'flex',
                    fontSize: '50px',
                    fontWeight: 'bold'
                }}>
                    Quality never goes out of style.
                </div>
                <div className="subtle_home_card">
                    The secret of great style is to feel good in what you wear.
                </div>
                <Link className='homeLink' to="/products" style={{ textDecoration: 'none' }}>
                    <button className="homePageButton">

                        Explore Now <NearMeIcon fontSize="medium" />

                    </button>
                </Link>
            </div>
            <img className="homePageImage" src={shoeImage} alt="shoe" style={{
                height: '950px',
                position: 'relative',
                left: '440px',
                top: '-200px',
                transform: 'rotate(60deg)'
            }}></img>
            <div className="white_space">

            </div>
        </div >
    )

}
