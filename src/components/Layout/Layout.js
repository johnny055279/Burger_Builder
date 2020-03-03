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

    sideDrawerToggleHandler = () => {

        // DO NOT WRITE: this.setState({showSideDrawer: !this.state.showSideDrawer});
        // Because if you plan on using "state" in "setState", this will may lead to unexpected outcomes (setState & state are asynchronous!!)
        // So here need to be a function form.
        this.setState((prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return(
            //using high order component(hoc)
            <>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </>
        )
    }
}

export default Layout;