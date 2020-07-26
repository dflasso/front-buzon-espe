import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Toolbar, Typography, IconButton, MenuItem, Menu
} from '@material-ui/core';


import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuApp from '../menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },
}));


const Header = ({ title }) => {
    const classes = useStyles();
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <MenuApp />
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
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
        </header>
    );
}

export default Header;