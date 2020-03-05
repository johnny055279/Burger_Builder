import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div>
        <div className = {classes.Text}>Loading...</div>
        <div className = {classes.Loading}></div>
    </div>
);

export default spinner