import React from 'react';
// The css file name must be [name].module.css
import classes from './Layout.module.css';

const layout = ( props ) => (

    //using high order component(hoc)
    <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </>
);

export default layout;