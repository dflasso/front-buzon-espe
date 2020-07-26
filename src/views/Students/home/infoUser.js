import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGoogleAuth } from '../../../hooks/GoogleAuthContext';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    infoUser:{
        padding: '5%',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
        marginTop: '4%',
        marginRight: '2%'
    }
}));

const InfoUser = () => {
    const classes = useStyles();
    const { googleUser } = useGoogleAuth();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={12} className={classes.infoUser}>
                <h3>Bienvenido</h3>
                <h5>{googleUser.profileObj.givenName  + "  "+ googleUser.profileObj.familyName }</h5>
            </Grid>
            <Grid item xs={12}>
               <b>Correo:</b> {googleUser.profileObj.email }
            </Grid>
            <Grid item xs={10} align="center">
            <button type="button" class="btn btn-outline-success btn-block">Denunciar</button>
            </Grid>
            <Grid item xs={10} align="center">
            <button type="button" class="btn btn-outline-success btn-block">Enviar Sugerencia</button>
            </Grid>
        </Grid>
    );
}

export default InfoUser;