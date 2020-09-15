import React, { Fragment, useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
        "&:hover": {
            
        }
    }
}));

const BtnLikeSugestions = () => {
    const [styleBtn, setStyleBtn] = useState('#9e9e9e');
    const classes = useStyles();

    const handleClick = () => {
        setStyleBtn('#f44336');
    }
    
    return (
        <Fragment>
            <IconButton color="primary" className={classes.IconButton} 
            onClick={handleClick}>
                <FavoriteIcon  style={{ color: styleBtn }} />
            </IconButton>
        </Fragment>
    );
}

export default BtnLikeSugestions;