import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//componentes de la vista
import TableSugestions from './tableSugestions';
import InfoUser from './infoUser';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    }
});

const Home = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={8}>
               <TableSugestions/>
            </Grid>
            <Grid item xs={4}>
               <InfoUser/>
            </Grid>
        </Grid>
    );
}

export default Home;