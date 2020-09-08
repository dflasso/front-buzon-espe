import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Grid, Backdrop, CircularProgress, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { clientBackendHeroko } from '../../../../config/axios';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { palette } from "../../../../config/theme/palette";

import validations, { getInfo } from "../validations";
import ErrorMsg from "../../../../widgets/errorMsg";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    selectEmpty: {
        minWidth: '80%',
        maxWidth: '100%'
    },
    subtittle: {
        background: palette.primary.light,
        display: "flex",
        justifyContent: "center",
        color: palette.primary.contrastText,
        borderRadius: "8px"
    },

}));

const FromUser = ({ user, onChange, errorsMsg }) => {
    const classes = useStyles();
    const [data, setData] = useState({
        user: {
            cellphone: "",
            civilStatus: "",
            conventionalTelephone: "",
            currentLevel: "",
            disability: "",
            email: "",
            ethnicity: "",
            gender: "",
            homeAddress: "",
            idUserESPE: "",
            lastname: "",
            name: "",
            nationality: "",
            numDocument: "",
            placeDateBirth: "",
            relationshipUniversity: "",
            sex: ""
        },
        carrer: {
            idCarrer: null
        }
    });
    const [openLoader, setOpenLoader] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const [departmentSelected, setDepartmentSelected] = useState(null);
    const [modalitySelected, setModalitySelected] = useState(null);
    const [departments, setDepartments] = useState([{
        description: "Cargando..."
    }]);
    const [modalities, setModalities] = useState([{
        description: "Cargando..."
    }]);
    const [carrers, setCarrers] = useState([{
        idCarrer: 0,
        description: "Cargando..."
    }]);
    const [carrer, setCarrer] = useState({});
    const [errors, setErrors] = useState({});
    const [isStudent, setIsStudent] = useState(true);
    const [nameCarrer, setNameCarrer]= useState(null);
    useEffect(() => {
        const getComboBoxs = async () => {
            await clientBackendHeroko.get("/v1/department/all").then(
                response => {
                    if (response.status >= 200 && response.status <= 300) {
                        setDepartments(response.data)
                    }
                }
            ).catch(
                exception => {
                    if (exception.response) {
                        setAlert({ show: true, msg: "Error al consultar los departamentos. Contáctese con soporte.", type: "alert alert-danger" });
                    } else {
                        setAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                    }
                }
            );

            await clientBackendHeroko.get("/v1/modality-carrer").then(
                response => {
                    if (response.status >= 200 && response.status <= 300) {
                        setModalities(response.data)
                    }
                }
            ).catch(
                exception => {
                    if (exception.response) {
                        setAlert({ show: true, msg: "Error al consultar las modalidades. Contáctese con soporte.", type: "alert alert-danger" });
                    } else {
                        setAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                    }
                }
            );
        }
        setData(getInfo(user));
        if(user.carrer){
            setNameCarrer(user.carrer)
        }
     
        getComboBoxs();
    }, [user]);

    const getCarrers = useCallback(async () => {
        setOpenLoader(true);
        await clientBackendHeroko.get(`/v1/carrer/get-by/${departmentSelected}/${modalitySelected}`).then(
            response => {
                if (response.status >= 200 && response.status <= 300) {
                    setCarrers(response.data);
                }
                setOpenLoader(false);
            }
        ).catch(
            exception => {
                if (exception.response) {
                    setAlert({ show: true, msg: "Error al consultar las carreras. Contáctese con soporte.", type: "alert alert-danger" });
                } else {
                    setAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                }
                setOpenLoader(false);
            }
        );
    }, [departmentSelected, modalitySelected]);

    useEffect(() => {
        if (departmentSelected && modalitySelected) {
            setCarrer({});
            getCarrers();
        }
    }, [departmentSelected, modalitySelected, getCarrers]);

    useEffect(() => {
        setErrors(errorsMsg)
    }, [errorsMsg]);

    const checkData = (allData) => {
        let newErrors = validations.updateUserData(allData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onChange(allData)
        } else {
            onChange(null)
        }
    }

    const handleChangeDataUser = event => {
        setData({
            ...data,
            user: {
                ...data.user,
                [event.target.name]: event.target.value
            }
        })

        let allData = {
            ...data,
            user: {
                ...data.user,
                [event.target.name]: event.target.value
            },
            carrer
        };

        if (event.target.name === 'relationshipUniversity') {
            if (event.target.value !== 'Estudiante') {
                setIsStudent(false);
                setNameCarrer(null);
                setCarrer({
                    idCarrer: -1
                })

                allData = {
                    ...data,
                    user: {
                        ...data.user,
                        [event.target.name]: event.target.value
                    },
                    carrer: {
                        idCarrer: -1
                    }
                };
            } else {
                setIsStudent(true);
                setNameCarrer(null);
                setCarrer({
                    idCarrer: null
                })

                allData = {
                    ...data,
                    user: {
                        ...data.user,
                        [event.target.name]: event.target.value
                    },
                    carrer: {
                        idCarrer: null
                    }
                };

            }
        }


        checkData(allData);
    }

    const handleChangeCombo = event => {
        switch (event.target.name) {
            case "departmentSelected":
                setDepartmentSelected(event.target.value);
                break;
            case "modalitySelected":
                setModalitySelected(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleChangeCarrer = event => {
        setCarrer({
            idCarrer: event.target.value
        });

        const allData = {
            ...data,
            carrer: {
                idCarrer: event.target.value
            }
        }

        checkData(allData);
    }

    const renderInputCarrer = () => {
        if (departmentSelected && modalitySelected) {
            return (
                <Select
                    name="carrer"
                    value={carrer.idCarrer}
                    onChange={handleChangeCarrer}
                    className={classes.selectEmpty}
                    fullWidth
                >
                    {carrers.map(item => (
                        <MenuItem value={item.idCarrer} key={item.idCarrer}>{item.description}</MenuItem>
                    ))}
                </Select>
            );
        } else {
            return <em>Primero selecciona la modalidad y el departamento.</em>
        }
    }

    const renderForm = () => {
        return (

            <Grid container spacing={2} justify="flex-start" alignItems="center">
                {alert.show ?
                    <div className={alert.type} role="alert">
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                            <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                        </IconButton>
                        {alert.msg}
                    </div> : null
                }
                <Grid item xs={12} className="div-subtitle">
                    <strong>Datos personales</strong>
                </Grid>
                <Grid item xs={2}>
                    <label>Apellidos:  <font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input type="text" className="form-control is-valid"
                        value={data.user.lastname}
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={3}>
                    <label>Nombres:  <font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input type="text" className="form-control is-valid"
                        value={data.user.name}
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={2} >
                    <label>Nacionalidad:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input type="text" className="form-control"
                        value={data.user.nationality}
                        autoComplete="off"
                        name="nationality"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.nationality} msg={errors.nationality} />
                </Grid>
                <Grid item xs={3}>
                    <label>No. de Cédula de Identidad o Pasaporte:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input type="text" className="form-control"
                        value={data.user.numDocument}
                        autoComplete="off"
                        name="numDocument"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.numDocument} msg={errors.numDocument} />
                </Grid>
                <Grid item xs={2}>
                    <label>Genero:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        name="gender"
                        value={data.user.gender}
                        onChange={handleChangeDataUser}
                        label="Generos"
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Masculino'} >Masculino</MenuItem>
                        <MenuItem value={'Femenino'} >Femenino</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.gender} msg={errors.gender} />
                </Grid>
                <Grid item xs={1} >
                    <label>Sexo:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={2}>
                    <Select
                        name="sex"
                        value={data.user.sex}
                        onChange={handleChangeDataUser}
                        label="Generos"
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'H'} >Hombre</MenuItem>
                        <MenuItem value={'M'} >Mujer</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.sex} msg={errors.sex} />
                </Grid>
                <Grid item xs={1}>
                    <label>Discapacidad:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={2}>
                    <Select
                        name="disability"
                        value={data.user.disability}
                        onChange={handleChangeDataUser}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Ninguna'} >Ninguna</MenuItem>
                        <MenuItem value={'Intelectual'} >Intelectual</MenuItem>
                        <MenuItem value={'Física'} >Física</MenuItem>
                        <MenuItem value={'Auditiva'} >Auditiva</MenuItem>
                        <MenuItem value={'Mental'} >Mental</MenuItem>
                        <MenuItem value={'Psicológica'} >Psicológica</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.disability} msg={errors.disability} />
                </Grid>
                <Grid item xs={2}>
                    <label>Dirección Domiciliaria:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={9}>
                    <input className="form-control" type="text"
                        value={data.user.homeAddress}
                        autoComplete="off"
                        name="homeAddress"
                        onChange={handleChangeDataUser}

                    />
                    <small>Ingrese la parroquía, ciudad, sector, calle principal, calle secundaria y la numeración de domicilio.</small><br />
                    <ErrorMsg reference={errors.homeAddress} msg={errors.homeAddress} />
                </Grid>
                <Grid item xs={2}>
                    <label>Lugar de de Nacimiento:</label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control"
                        type="text"
                        value={data.user.placeBirth}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.placeBirth} msg={errors.placeBirth} />
                </Grid>
                <Grid item xs={2}>
                    <label>Fecha de de Nacimiento:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={4}>
                    <input className="form-control"
                        type="date"
                        min="1920-01-01" max="2004-12-31"
                        value={data.user.placeDateBirth}
                        autoComplete="off"
                        name="placeDateBirth"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.placeDateBirth} msg={errors.placeDateBirth} />
                </Grid>
                <Grid item xs={2}>
                    <label>Estado Civil:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        name="civilStatus"
                        value={data.user.civilStatus}
                        onChange={handleChangeDataUser}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Soltero'} >Soltero</MenuItem>
                        <MenuItem value={'Casado'} >Casado</MenuItem>
                        <MenuItem value={'Unión de hecho'} >Unión de hecho</MenuItem>
                        <MenuItem value={'Divorciado'} >Divorciado</MenuItem>
                        <MenuItem value={'Separado'} >Separado</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.civilStatus} msg={errors.civilStatus} />
                </Grid>
                <Grid item xs={2}>
                    <label>Etnia a la que pertenece:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        name="ethnicity"
                        value={data.user.ethnicity}
                        onChange={handleChangeDataUser}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Blanco'} >Blanco</MenuItem>
                        <MenuItem value={'Afro ecuatoriano'} >Afro ecuatoriano</MenuItem>
                        <MenuItem value={'Negro'} >Negro</MenuItem>
                        <MenuItem value={'Mestizo'} >Mestizo</MenuItem>
                        <MenuItem value={'Indígena'} >Indígena</MenuItem>
                        <MenuItem value={'Montubía'} >Montubía</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.ethnicity} msg={errors.ethnicity} />
                </Grid>
                <Grid item xs={12} className="div-subtitle">
                    <strong>Datos Universitarios:</strong>
                </Grid>
                <Grid item xs={2}>
                    <label>Relación con la Universidad:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        name="relationshipUniversity"
                        value={data.user.relationshipUniversity}
                        onChange={handleChangeDataUser}
                        className={classes.selectEmpty}
                        defaultValue="- Seleccione -"
                        fullWidth
                    >
                        <MenuItem value={'Docente'} >Docente</MenuItem>
                        <MenuItem value={'Estudiante'} >Estudiante</MenuItem>
                        <MenuItem value={'Administrativo'} >Administrativo</MenuItem>
                        <MenuItem value={'Operativo'} >Operativo</MenuItem>
                    </Select>
                    <ErrorMsg reference={errors.relationshipUniversity} msg={errors.relationshipUniversity} />
                </Grid>
                <Grid item xs={2}>
                    <label>ID:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control"
                        type="text"
                        value={data.user.idUserESPE}
                        autoComplete="off"
                        name="idUserESPE"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.idUserESPE} msg={errors.idUserESPE} />
                </Grid>
                {isStudent ?
                    <>
                        {
                            nameCarrer?
                                <>
                                <Grid item xs={2}>
                                        <label>Carrera:<font color="#d50000">*</font></label>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <em>{nameCarrer}</em>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Grid item xs={2}>
                                        <label>Modalidad:<font color="#d50000">*</font></label>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Select
                                            name="modalitySelected"
                                            value={modalitySelected}
                                            onChange={handleChangeCombo}
                                            className={classes.selectEmpty}
                                            defaultValue="- Seleccione -"
                                            fullWidth
                                        >
                                            {modalities.map(item => (
                                                <MenuItem value={item.idModality} key={item.idModality}>{item.description}</MenuItem>
                                            ))}
                                        </Select>

                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Departamento:<font color="#d50000">*</font></label>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Select
                                            name="departmentSelected"
                                            value={departmentSelected}
                                            onChange={handleChangeCombo}
                                            className={classes.selectEmpty}
                                            defaultValue="- Seleccione -"
                                            fullWidth
                                        >
                                            {departments.map(item => (
                                                <MenuItem value={item.idDepartment} key={item.idDepartment}>{item.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <label>Carrera:<font color="#d50000">*</font></label>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {renderInputCarrer()}
                                        <br />
                                        <ErrorMsg reference={errors.carrer} msg={errors.carrer} />
                                    </Grid>
                                </>
                        }

                        <Grid item xs={2}>
                            <label>Período que cursa:<font color="#d50000">*</font></label>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                name="currentLevel"
                                value={data.user.currentLevel}
                                onChange={handleChangeDataUser}
                                label="Generos"
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                                fullWidth
                            >
                                <MenuItem value={'I nivel'} >I nivel</MenuItem>
                                <MenuItem value={'II nivel'} >II nivel</MenuItem>
                                <MenuItem value={'III nivel'} >III nivel</MenuItem>
                                <MenuItem value={'IV nivel'} >IV nivel</MenuItem>
                                <MenuItem value={'V nivel'} >V nivel</MenuItem>
                                <MenuItem value={'VI nivel'} >VI nivel</MenuItem>
                                <MenuItem value={'VII nivel'} >VII nivel</MenuItem>
                                <MenuItem value={'IX nivel'} >IX nivel</MenuItem>
                                <MenuItem value={'X nivel'} >X nivel</MenuItem>
                            </Select>
                            <ErrorMsg reference={errors.currentLevel} msg={errors.currentLevel} />
                        </Grid>
                    </>
                    :
                    null
                }

                <Grid item xs={12} className="div-subtitle">
                    <strong>Contactos:</strong>
                </Grid>
                <Grid item xs={2}>
                    <label>Teléfono celular:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control"
                        type="number"
                        value={data.user.cellphone}
                        autoComplete="off"
                        name="cellphone"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.cellphone} msg={errors.cellphone} />
                </Grid>
                <Grid item xs={2}>
                    <label>Teléfono convencional:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={4}>
                    <input className="form-control"
                        type="number"
                        value={data.user.conventionalTelephone}
                        autoComplete="off"
                        name="conventionalTelephone"
                        onChange={handleChangeDataUser}
                    />
                    <ErrorMsg reference={errors.conventionalTelephone} msg={errors.conventionalTelephone} />
                </Grid>
                <Grid item xs={2}>
                    <label>Correo institucional:<font color="#d50000">*</font></label>
                </Grid>
                <Grid item xs={3}>
                    <input className="form-control is-valid"
                        type="email"
                        value={data.user.email}
                        autoComplete="off"
                    />
                    <ErrorMsg reference={errors.email} msg={errors.email} />
                </Grid>
            </Grid>

        );
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