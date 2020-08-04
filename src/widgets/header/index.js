import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Toolbar,  IconButton, MenuItem, Menu
} from '@material-ui/core';


import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuApp from '../menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
        color: 'rgba(0,83,28,1)'
    },
}));


const Header = ({ title }) => {
    const classes = useStyles();
    const auth = true;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <MenuApp />
                    <h1 className={classes.title}>   {title}          </h1>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
                                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;