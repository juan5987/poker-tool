import React from 'react';
import { NavLink } from 'react-router-dom';

//style
import './footer.scss';

const Footer = () => (

    <footer className="footer">
        <nav className="footer__nav">

            <NavLink
                to="/CGU"
                className="footer__nav__element">
                CGU
            </NavLink>

            <NavLink
                to="/faq"
                className="footer__nav__element">
                FAQ
            </NavLink>
            <NavLink
                to="/contact"
                className="footer__nav__element">
                Contact
            </NavLink>

        </nav>
    </footer>

)

export default Footer;