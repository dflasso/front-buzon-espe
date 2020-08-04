import React from 'react';
import { Grid } from '@material-ui/core';



const UserDetail = ({ user }) => {
    return (
        <Grid container  spacing={1} justify="center">
            <Grid item xs={3}>
                <label>Apellidos y Nombres:</label>
            </Grid>
            <Grid item xs={9}>
                {user.data.name + " " + user.data.lastname}
            </Grid>
            <Grid item xs={3}>
                <label>No. de Cédula de Identidad Pasaporte:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.numDocument}
            </Grid>
            <Grid item xs={3}>
                <label>Nacionalidad:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.nationality}
            </Grid>
            <Grid item xs={3}>
                <label>Genero:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.gender}
            </Grid>
            <Grid item xs={3}>
                <label>Sexo:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.sex}
            </Grid>
            <Grid item xs={3}>
                <label>Relación con la Universidad:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.relationshipUniversity}
            </Grid>
            <Grid item xs={3}>
                <label>Estado Civil:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.civilStatus}
            </Grid>
            <Grid item xs={3}>
                <label>Lugar de fecha de Nacimiento:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.placeDateBirth}
            </Grid>
            <Grid item xs={3}>
                <label>Etnia a la que pertenece:</label>
            </Grid>
            <Grid item xs={3}>
                {user.data.ethnicity}
            </Grid>
        </Grid>
    );
}

export default UserDetail;