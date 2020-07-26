import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

//components
import Info from './info';
import BtnLogin from './LoginButton';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
})
const Home = ({ component: Component, ...rest }) => {
    const classes = useStyles();
    

    return (
        <Fragment>
            <main className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Info />
                    </Grid>
                    <Grid item xs={4}>
                        <BtnLogin />
                    </Grid>
                </Grid>
            </main>
           
        </Fragment>
    );
}

export default Home;