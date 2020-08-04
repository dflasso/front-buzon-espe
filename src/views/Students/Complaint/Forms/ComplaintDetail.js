import React from 'react';
import { Grid } from '@material-ui/core';

const ComplaintDetail = ({complaint}) => {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={4}>
                Tipo de Agresión:
            </Grid>
            <Grid item xs={8}>
                {complaint.type}
            </Grid>
            <Grid item xs={4}>
                Descripción de los hechos:
            </Grid>
            <Grid item xs={8}>
                {complaint.description}
            </Grid>
            <Grid item xs={4}>
                Efectos causados por la agreción:
            </Grid>
            <Grid item xs={8}>
                {complaint.effects}
            </Grid>
            <Grid item xs={4}>
                Frecuencia de la agresión:
            </Grid>
            <Grid item xs={2}>
                {complaint.frequencyAgresion}
            </Grid>
            <Grid item xs={3}>
                Lugar de la agresión:
            </Grid>
            <Grid item xs={3}>
                {complaint.placeAgresion}
            </Grid>
            <Grid item xs={4}>
               Carrera al que pertenece el Agresor:
            </Grid>
            <Grid item xs={8}>
                {complaint.departmentAgresion}
            </Grid>
            <Grid item xs={4}>
              Fecha de envió de la denuncia:
            </Grid>
            <Grid item xs={8}>
                {complaint.sendDateComplaint}
            </Grid>
        </Grid>
    );
}

export default ComplaintDetail;