import React, { Fragment } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

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
                <InfoIcon  style={{ color: '#2196f3' }} />
            </IconButton>
        </Fragment>
    );
}

export default BtnLikeSugestions;