import React, { Fragment } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
    }
}));

const BtnLikeSugestions = () => {

    const classes = useStyles();

    return (
        <Fragment>
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.IconButton}>
                <FavoriteIcon  style={{ color: '#9e9e9e' }} />
            </IconButton>
        </Fragment>
    );
}

export default BtnLikeSugestions;