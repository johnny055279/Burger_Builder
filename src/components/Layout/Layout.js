import React, {Component} from 'react';
// The css file name must be [name].module.css
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render() {
        return(
            //using high order component(hoc)
            <>
            <Toolbar/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </>
        )
    }
}

export default Layout;