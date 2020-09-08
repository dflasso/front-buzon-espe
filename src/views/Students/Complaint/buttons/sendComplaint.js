import React, { useState, Fragment } from 'react';
import {
    makeStyles, DialogTitle, DialogContentText,
    Dialog, DialogContent, Button, Stepper, Step, StepLabel, Typography,
    Backdrop, CircularProgress, IconButton
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import { clientBackendHeroko } from '../../../../config/axios';
import FormUser from '../Forms/FormUser';
import FormComplaint from '../Forms/FormComplaint';
import { useSelector } from "react-redux";

import validations, { getInfo } from "../validations";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    title: {
        color: "rgba(0,83,28,1)",
        borderColor: "rgba(0,83,28,1)",
        borderBottomWidth: "1px",
        borderLeftWidth: "0px",
        borderRightWidth: "0px",
        borderTopWidth: "0px",
        display: "flex",
        justifyContent: "center",
        borderStyle: "solid"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function getSteps() {
    return ['Datos personales', 'Detalle de la denuncia'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Ingrese o actualice sus datos personales.';
        case 1:
            return 'Detalle cada hecho sucedido.';
        default:
            return 'Paso desconocido.';
    }
}




const SendCompaint = ({ showAlert, updateView }) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [openLoader, setOpenLoader] = useState(false);
    const user = useSelector(state => state.user.data);
    const [userData, setUser] = useState({});
    const [updateUser, setUpdateUser] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const [errors, setErrors] = useState({});
    const [newUserdata, setNewUserdata] = useState(null);
    const [complaint, setComplaint] = useState(null);
    const handleClickOpen = () => {
        setActiveStep(0);
        setOpenDialog(true);
        getDetailUser();
    }

    const getDetailUser = async () => {
        setOpenLoader(true);
        await clientBackendHeroko.get("/v1/user/" + user.email).then(
            response => {
                if (response.status >= 200 && response.status <= 300) {
                    setUser(response.data);
                }
                setOpenLoader(false);
            }
        ).catch(
            exception => {
                if (exception.response) {
                    showAlert({ show: true, msg: "Error al consultar los datos de su cuenta. Contáctese con soporte.", type: "alert alert-danger" });
                } else {
                    showAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                }
                setOpenLoader(false);
            }
        );
    }

    const handleClose = () => {
        setOpenDialog(false);
        setErrors({});
        updateView();
    }

    const findEmailUser = () => {
        if (userData) {
            if (userData.user) {
                if (userData.user.email) {
                    return userData.user.email
                } else {
                    return null;
                }
            } else if (userData.email) {
                return userData.email;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const saveCompaint = async () => {
        if (complaint) {
            const emailUser = findEmailUser();
            if (emailUser) {
                setOpenLoader(true);
                await clientBackendHeroko.post("/v1/complaint/save/" + emailUser, complaint).then(
                    response => {
                        if (response.status >= 200 && response.status <= 300) {
                            showAlert({ show: true, msg: "Denuncia registrada.", type: "alert alert-primary" });
                        }
                        setOpenLoader(false);
                        handleClose();
                    }
                ).catch(
                    exception => {
                        if (exception.response) {
                            setAlert({ show: true, msg: "Error al registrar la denuncia. Contáctese con soporte.", type: "alert alert-danger" });
                        } else {
                            setAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                        }
                        setOpenLoader(false);
                    }
                );
            } else {
                setAlert({ show: true, msg: "Error al detectar el usuario logeado.", type: "alert alert-warning" });
            }
            
        } else {
            setAlert({ show: true, msg: "Verique que los datos sean los correctos.", type: "alert alert-danger" });
        }
    }


    const handleNext = async () => {
        if (activeStep === 1) {
            const errors = validations.newComplaint(complaint);
            if (Object.keys(errors).length === 0) {
                saveCompaint();
            } else {
                setErrors(errors)
                setAlert({ show: true, msg: "Verique que los datos sean los correctos.", type: "alert alert-danger" });
            }
          
        } else if (activeStep === 0) {
            if (updateUser) {
                if (newUserdata) {
                    setOpenLoader(true);
                    await clientBackendHeroko.post("/v1/user/save-datail", newUserdata).then(
                        response => {
                            if (response.status >= 200 && response.status <= 300) {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                            setOpenLoader(false);
                        }
                    ).catch(
                        exception => {
                            if (exception.response) {
                                setAlert({ show: true, msg: "Error al actualizar los datos de su cuenta. Contáctese con soporte.", type: "alert alert-danger" });
                            } else {
                                setAlert({ show: true, msg: "Error en la red. Contáctese con soporte.", type: "alert alert-danger" });
                            }
                            setUser(newUserdata);
                            setOpenLoader(false);
                        }
                    );
                } else {
                    setAlert({ show: true, msg: "Verique que los datos sean los correctos.", type: "alert alert-danger" });
                }
            } else {
                const errors = validations.updateUserData(getInfo(userData));
                if (Object.keys(errors).length === 0) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setErrors(errors)
                    setAlert({ show: true, msg: "Verique que los datos sean los correctos.", type: "alert alert-danger" });
                }

            }
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeUser = (data) => {
        setUpdateUser(true)
        setNewUserdata(data)
    }

    const handleChangeComplaint = data => {
        if (data) {
            setComplaint(data)
        }
    }

    const renderForms = () => {
        switch (activeStep) {
            case 0:
                return <FormUser user={userData} onChange={handleChangeUser} errorsMsg={errors} />;
            case 1:
                return <FormComplaint onChange={handleChangeComplaint}  errorsMsg={errors} />;
            default:
                return null;
        }
    }

    const renderMsgBtnSteps = () => {
        switch (activeStep) {
            case 0:
                if (updateUser) {
                    return 'Actualizar Información y continuar';
                } else {
                    return 'Siguiente';
                }

            case 1:
                return 'Enviar';
            default:
                return 'Enviar';
        }
    }

    return (
        <Fragment>
            <button className="btnCommon" onClick={handleClickOpen}>Enviar Nueva Denuncia</button>
            {openLoader ?
                <Backdrop className={classes.backdrop} open={openLoader} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                <Dialog
                    fullWidth
                    maxWidth="xl"
                    open={openDialog}
                    onClose={handleClose}
                >
                    <DialogTitle className={classes.title}> <strong>Nueva Denuncia</strong>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <label > Los campos marcados con (<font color="#d50000">*</font>) son obligatorios. </label>
                            {alert.show ?
                                <div className={alert.type} role="alert">
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                                        <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                                    </IconButton>
                                    {alert.msg}
                                </div> : null
                            }
                            {renderForms()}
                        </DialogContentText>

                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel >{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}
                                variant="contained" color="default">
                                Regresar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {renderMsgBtnSteps()}
                            </Button>
                            {alert.show ?
                                <em style={{ color: "#FF0000" }} >  {alert.msg}</em> : null
                            }
                        </div>

                    </DialogContent>
                </Dialog>
            }
        </Fragment>
    );
}

export default SendCompaint;