import React from 'react';
import { Grid } from '@material-ui/core';

const FromUser = () => {
    return (
        <form>
            <Grid container spacing={1} justify="center">
                <Grid item xs={3}>
                    <label>Apellidos y Nombres:</label>
                </Grid>
                <Grid item xs={9}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>No. de Cédula de Identidad Pasaporte:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Nacionalidad:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Genero:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Sexo:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Relación con la Universidad:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Estado Civil:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Lugar de fecha de Nacimiento:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    <label>Etnia a la que pertenece:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
            </Grid>
        </form>
    );
}

export default FromUser;