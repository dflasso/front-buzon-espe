import React, { Fragment } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
const useStyles = makeStyles(theme => ({
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
    }
}));

const BtnShareSugestions = () => {

    const classes = useStyles();

    return (
        <Fragment>
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.IconButton}>
                <FacebookIcon  style={{ color: '#1769aa' }} />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.IconButton}>
                <InstagramIcon  style={{ color: '#f50057' }} />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.IconButton}>
                <TwitterIcon  style={{ color: '#4dabf5' }} />
            </IconButton>
        </Fragment>
    );
}

export default BtnShareSugestions;