import React, { useState, useEffect } from 'react';
import {
    Grid, Select, MenuItem, makeStyles,
    Radio, RadioGroup, FormControlLabel, FormControl,
} from '@material-ui/core';

import { palette } from "../../../../config/theme/palette";
import validations from "../validations";
import ErrorMsg from "../../../../widgets/errorMsg";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(0),
        minWidth: 120,
    },
    radio: {
        display: '-webkit-box',
        marginTop: '0px'
    },
    radioLable: {
        color: palette.primary.main,
        display: 'flex'
    },
    radioButton: {
        marginTop: '0px',
        paddingTop: '0px'
    },
    selectEmpty: {
        minWidth: '80%',
        maxWidth: '100%'
    },
}));

const FromComplaint = ({ onChange, errorsMsg }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        dateAgresion: "",
        description: "",
        effects: "",
        existEvidence: false,
        frequencyAgresion: "",
        placeAgresion: "",
        relationshipAggresor: "",
        type: "",
        departmentAgresion: ""
    });


    useEffect(() => {
        setErrors(errorsMsg)
    }, [errorsMsg]);

    const checkData = values => {
        const errors = validations.newComplaint(values);
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            onChange(values);
        } else {
            onChange(null);
        }
    }

    const handleChangeData = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
        checkData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeCheck = event => {
        setData({
            ...data,
            existEvidence: (event.target.value === 'S') ? true : false
        });
        checkData({
            ...data,
            existEvidence: (event.target.value === 'S') ? true : false
        })
    }

    return (
        <form>
            <Grid container spacing={2} >
                <Grid item xs={3}>
                    Tipo de Agresión: <font color="#d50000">*</font>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        name="type"
                        value={data.type}
                        onChange={handleChangeData}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Física'} >Física</MenuItem>
                        <MenuItem value={'Psicológica'} >Psicológica</MenuItem>
                        <MenuItem value={'Discriminación de genero'} >Discriminación de genero</MenuItem>
                        <MenuItem value={'Otras formas de agresión'} >Otras formas de agresión </MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.type} msg={errors.type} />
                </Grid>
                <Grid item xs={2}>
                    Fecha de la agresión:<font color="#d50000">*</font>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control"
                        type="date"
                        min="2020-01-01" max="2020-09-10"
                        name="dateAgresion"
                        value={data.dateAgresion}
                        onChange={handleChangeData}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.dateAgresion} msg={errors.dateAgresion} />
                </Grid>
                <Grid item xs={3}>
                    Descripción de los hechos: <font color="#d50000">*</font>
                </Grid>
                <Grid item xs={9}>
                    <input className="form-control" type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChangeData}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.description} msg={errors.description} />
                </Grid>
                <Grid item xs={3}>
                    Efectos causados por la agreción:
                </Grid>
                <Grid item xs={9}>
                    <input className="form-control" type="text"
                        name="effects"
                        value={data.effects}
                        onChange={handleChangeData}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.effects} msg={errors.effects} />
                </Grid>
                <Grid item xs={3}>
                    Frecuencia de la agresión:<font color="#d50000">*</font>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        name="frequencyAgresion"
                        value={data.frequencyAgresion}
                        onChange={handleChangeData}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Ocasional'} >Ocasional</MenuItem>
                        <MenuItem value={'Permanente'} >Permanente</MenuItem>
                        <MenuItem value={'Primera vez'} >Primera vez</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.frequencyAgresion} msg={errors.frequencyAgresion} />
                </Grid>
                <Grid item xs={2}>
                    Lugar de la agresión:<font color="#d50000">*</font>
                </Grid>
                <Grid item xs={4}>
                    <input className="form-control"
                        type="text"
                        name="placeAgresion"
                        value={data.placeAgresion}
                        onChange={handleChangeData}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.placeAgresion} msg={errors.placeAgresion} />
                </Grid>

                <Grid item xs={3}>
                    Departamento/Carrera al que pertenece el agresor:
                </Grid>
                <Grid item xs={3}>
                    <Select
                        name="departmentAgresion"
                        value={data.departmentAgresion}
                        onChange={handleChangeData}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Departamento de Ciencias de la Computación'} >Departamento de Ciencias de la Computación</MenuItem>
                        <MenuItem value={'Departamento de Eléctrica y Electrónica'} >Departamento de Eléctrica y Electrónica</MenuItem>
                        <MenuItem value={'Departamento de Ciencias de la Energía y Mecánica'} >Departamento de Ciencias de la Energía y Mecánica</MenuItem>
                        <MenuItem value={'Departamento de Ciencias de Vida'} >Departamento de Ciencias de Vida</MenuItem>
                        <MenuItem value={'Departamento de Ciencias Humanas y Sociales'} >Departamento de Ciencias Humanas y Sociales</MenuItem>
                        <MenuItem value={'Departamento de Ciencias Administrativas Económicas y de Comercio'} >Departamento de Ciencias Administrativas Económicas y de Comercio</MenuItem>
                        <MenuItem value={'Ingeniería en Sistemas e Informática'} >Ingeniería en Sistemas e Informática</MenuItem>
                        <MenuItem value={'Tecnologías de la Información'} > Tecnologías de la Información </MenuItem>
                        <MenuItem value={'Ingeniería de Software'} > Ingeniería de Software </MenuItem>
                        <MenuItem value={'Ingeniería Civil'} > Ingeniería Civil</MenuItem>
                        <MenuItem value={'Ingeniería en Tecnologías Geoespaciales'} > Ingeniería en Tecnologías Geoespaciales </MenuItem>
                        <MenuItem value={'Telecomunicaciones'} > Telecomunicaciones </MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.departmentAgresion} msg={errors.departmentAgresion} />
                </Grid>
                <Grid item xs={2}>
                    Relación con el agresor:<font color="#d50000">*</font>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        name="relationshipAggresor"
                        value={data.relationshipAggresor}
                        onChange={handleChangeData}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Docente'} >Docente</MenuItem>
                        <MenuItem value={'Estudiante'} >Estudiante</MenuItem>
                        <MenuItem value={'Administrativo'} >Administrativo</MenuItem>
                        <MenuItem value={'Operativo'} >Operativo</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.relationshipAggresor} msg={errors.relationshipAggresor} />
                </Grid>
                <Grid item xs={3}>
                    Existe alguna evidencia que acrédite la agresión:
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="tipoDocumento"
                            name="pasaporteCheck"
                            className={classes.radio} required
                            value={data.existEvidence ? 'S' : 'N'}
                            onChange={handleChangeCheck}
                        >

                            <FormControlLabel
                                value="S"
                                control={<Radio color="primary" className={classes.radioButton} />}
                                label="Si"
                                labelPlacement="start"
                                className={classes.radioLable}
                            />
                            <FormControlLabel
                                value="N"
                                control={<Radio color="primary" className={classes.radioButton} />}
                                label="No"
                                labelPlacement="start"
                                className={classes.radioLable}
                            />

                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}

export default FromComplaint;