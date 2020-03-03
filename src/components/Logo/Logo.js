import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';


const logo = (props) => (
    <div className = {classes.Logo} style = {{height: props.height}}>
        {/* Do not use file link because src wont be the same when we publish app  */}
        <img src = {burgerLogo} alt = 'MyBurger'/>
    </div>
);

export default logo