import React from "react";
import { makeStyles, Grid, Paper } from '@material-ui/core';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: "1%",
        height: 100,
        width: '90%',
        background: 'linear-gradient(61deg, rgba(255,255,255,1) 0%, rgba(190,236,205,1) 68%)',
        padding: '1%'
    },
}));

const InfoReports = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user.data);
    return (
        <Grid container className={classes.root} spacing={4} justify="center">
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Paper className={classes.paper}>
                        <h5>Bienvenido:{" " + user.name + " " + user.lastname}</h5>
                        <p>En esta sección puede obtener las denuncias según su estado y fecha: </p>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default InfoReports;