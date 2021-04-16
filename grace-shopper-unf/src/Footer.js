import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Footer() {
    return (
        <div>
            <footer class="footer-distributed">

                <div class="footer-left">

                    <h3>Company<span>Name</span></h3>

                    <p style={{ margin: '20px', display: 'flex', alignItems: 'center' }} class="footer-links">
                        <a href="#">Home</a>
                                                ·
                        <a href="#">Blog</a>
 ·
                        <a href="#">Pricing</a>
 ·
                        <a href="#">About</a>

                        <hr />
 ·
                        <a href="#">Faq</a>
 ·
                        <a href="#">Contact</a>
                    </p>

                    <p class="footer-company-name"> AJ/KAL/RAT &copy; 2021</p>
                </div>

                <div class="footer-center">

                    <div>
                        <i class="fa fa-map-marker"></i>
                        <p><span>1 UNF Dr</span> Jacksonville, FL 32224</p>
                    </div>

                    <div>
                        <i class="fa fa-phone"></i>
                        <p>904-240-8674</p>
                    </div>

                    <div>
                        <i class="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">contact@UNF-WEB-DEV.com</a></p>
                    </div>

                </div>

                <div class="footer-right">

                    <p class="footer-company-about">
                        <span>About the company</span>
 [Company Name] wants you to expect more from your clothes.
 </p>

                    <div class="footer-icons">

                        <a href="www.facebook.com" target="_blank"><FacebookIcon /></a>
                        <a href="www.twitter.com" target="_blank"><TwitterIcon /></a>
                        <a href="www.linkedin.com" target="_blank"><LinkedInIcon /></a>
                        <a href="www.github.com" target="_blank"><GitHubIcon /></a>

                    </div>

                </div>

            </footer>
        </div>
    )


}