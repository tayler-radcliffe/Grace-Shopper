import React from 'react';

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

                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>

                    </div>

                </div>

            </footer>
        </div>
    )


}