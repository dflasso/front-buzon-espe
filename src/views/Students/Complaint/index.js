import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableCompaint from './tableCompaint';

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

const Complaint = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Grid container className={classes.root} spacing={4} justify="center">
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Paper className={classes.paper}>
                            <h4>Bienvenido:</h4>
                            <p><strong>Te queremos ayudar.</strong> Denuncia cualquier tipo de acoso, discriminación y violencia.  <br/>
                            <strong>Tus denuncias son privadas.</strong> Las denuncias enviadas solo las podrán ver las autoridades de la Universidad de las Fuerzas Armadas - ESPE y usted.</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <TableCompaint/>
        </Fragment>
    );
}

export default Complaint;