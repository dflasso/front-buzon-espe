import React from 'react';
import { Grid } from '@material-ui/core';

const FromComplaint = () => {
    return (
        <form>
            <Grid container spacing={1} justify="center">
                <Grid item xs={4}>
                    Tipo de Agresión: <font color="#d50000">*</font>
            </Grid>
                <Grid item xs={8}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={4}>
                    Descripción de los hechos: <font color="#d50000">*</font>
            </Grid>
                <Grid item xs={8}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={4}>
                    Efectos causados por la agreción: <font color="#d50000">*</font>
            </Grid>
                <Grid item xs={8}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={4}>
                    Frecuencia de la agresión:<font color="#d50000">*</font>
            </Grid>
                <Grid item xs={2}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={3}>
                    Lugar de la agresión:<font color="#d50000">*</font>
            </Grid>
                <Grid item xs={3}>
                    <input className="form-control" />
                </Grid>
                <Grid item xs={4}>
                    Carrera al que pertenece el Agresor: <font color="#d50000">*</font>
            </Grid>
                <Grid item xs={8}>
                    <input className="form-control" />
                </Grid>
            </Grid>
        </form>
    );
}

export default FromComplaint;