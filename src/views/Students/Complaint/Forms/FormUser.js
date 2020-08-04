import React, { Fragment, useState } from 'react';
import { Grid, Backdrop, CircularProgress, LinearProgress, Select, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { clientBackendHeroko } from '../../../../config/axios';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    selectEmpty: {
        minWidth: '80%',
        maxWidth: '100%'
    },
}));

const FromUser = () => {
    const classes = useStyles();
    const emailUser = useSelector(state => state.user.data.email);
    const [data, setData] = useState({});
    const [openLoader, setOpenLoader] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const [gender, setGender] = useState('M');
    const [update,setUpdate]= useState(true);

    const getInfoUser = async () => {
        await clientBackendHeroko.get("/v1/user/" + emailUser).then(
            response => {
                if (response.status === 208) {
                    setData(response.data);
                }
                setOpenLoader(false);
                setUpdate(false);
            }
        ).catch(
            exception => {
                setOpenLoader(false);
                if (exception.response) {
                    setAlert({ show: true, msg: "Error al buscar los detalles del usuario", type: "alert alert-danger m-0 p-0" });
                } else {
                    setAlert({ show: true, msg: "Existen problemas en la red. Contáctese con soporte.", type: "alert alert-warning m-0 p-0" });
                }
                setUpdate(false);
            }
        );
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const renderForm = () => {
        if (update) {
            return (<LinearProgress />);
        } else {
            return (
                <form>
                    <Grid container spacing={1} justify="center">
                        {alert.show ?
                            <div class={alert.type} role="alert">
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                                    <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                                </IconButton>
                                {alert.msg}
                            </div> : null
                        }
                        <Grid item xs={3}>
                            <label>Apellidos  <font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input type="text" className="form-control"
                                value={data.user.lastname}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label>Nombres  <font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input type="text" className="form-control"
                                value={data.user.name}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label>No. de Cédula de Identidad Pasaporte:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input type="text" className="form-control"
                                value={data.user.numDocument}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label>Nacionalidad:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input type="text" className="form-control"
                                value={data.user.nationality}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label>Genero:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id="select-gener"
                                value={gender}
                                onChange={handleChangeGender}
                                label="Generos"
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                            >
                                <MenuItem value={'M'} >Masculino</MenuItem>
                                <MenuItem value={'F'} >Femenino</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Sexo:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id="select-gener"
                                value={gender}
                                onChange={handleChangeGender}
                                label="Generos"
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                            >
                                <MenuItem value={'H'} >Hombre</MenuItem>
                                <MenuItem value={'M'} >Mujer</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Relación con la Universidad:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id="select-gener"
                                value={gender}
                                onChange={handleChangeGender}
                                label="Generos"
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                            >
                                <MenuItem value={'Docente'} >Docente</MenuItem>
                                <MenuItem value={'Estudiante'} >Estudiante</MenuItem>
                                <MenuItem value={'Administrativo'} >Administrativo</MenuItem>
                                <MenuItem value={'Operativo'} >Operativo</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Estado Civil:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id="select-gener"
                                value={gender}
                                onChange={handleChangeGender}
                                label="Generos"
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                            >
                                <MenuItem value={'Soltero'} >Docente</MenuItem>
                                <MenuItem value={'Estudiante'} >Estudiante</MenuItem>
                                <MenuItem value={'Administrativo'} >Administrativo</MenuItem>
                                <MenuItem value={'Operativo'} >Operativo</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Lugar de fecha de Nacimiento:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input className="form-control" />
                        </Grid>
                        <Grid item xs={3}>
                            <label>Etnia a la que pertenece:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <input className="form-control" />
                        </Grid>
                    </Grid>
                </form>
            );
        }
    }

    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={openLoader} >
                <CircularProgress color="inherit" />
            </Backdrop>
            {renderForm()}
        </Fragment>
    );
}

export default FromUser;