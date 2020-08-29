import React from 'react'
import classes from './Logo.module.css';
import burgerImage from '../../assets/Images/burger-logo.png';
const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerImage}  alt="logo"/>
    </div>
);

export default Logo;