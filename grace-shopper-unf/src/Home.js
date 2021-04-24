import React from 'react';
import homepageimage from "./Images/HOMEPAGEIMGFINAL.png";
import NearMeIcon from '@material-ui/icons/NearMe';
import { Link } from 'react-router-dom';

const color1 = 'rgba(246, 184, 170, 1)';
const color2 = 'rgba(242, 229, 228, 1)';

export default function Home() {
    return (
        <div className="home_container" style={{
            background: `linear-gradient(to bottom,  ${color1} 55%,${color2} 100%)`,
            height: '1109px',
            width: '100%',
            borderBottom: '100px solid white',
            textAlign: 'center'
        }}>
            <div className="home_card">
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    top: '350px',
                    left: '275px',
                    fontSize: '50px',
                    fontWeight: 'bold'
                }}>
                    Quality never goes out of style.
                </div>
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    top: '375px',
                    left: '150px',
                    fontSize: '40px',
                    fontWeight: 'lighter'
                }}>
                    The secret of great style is to feel good in what you wear.
                </div>
                <Link className='homeLink' to="/products" style={{textDecoration: 'none'}}>
                <button className="homePageButton" style={{
                    cursor: 'pointer',
                    display: 'flex',
                    position: 'relative',
                    top: '400px',
                    left: '550px',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    padding: '10px',
                    borderRadius: '30px',
                    width: '200px',
                    justifyContent: 'center',
                    fontFamily: 'Rubik',
                    transition: 'all .2s ease-in-out',
                    textDecoration: 'none'

                }}>
                    
                        Explore Now <NearMeIcon fontSize="medium" />
                    
                </button>
                </Link>
            </div>
            <img className="homePageImage" src={homepageimage} alt="homeimage" style={{
                height: '950px',
                position: 'relative',
                left: '400px',
                top: '-60px'
            }}></img>
            <div className="white_space">

            </div>
        </div >
    )

}
