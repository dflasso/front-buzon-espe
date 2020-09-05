import React, { useState, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { clientBackendHeroko } from '../../config/axios';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch } from 'react-redux';
import { signInUserAction } from '../../redux/actions/userActions';
import { addResourcesAction } from '../../redux/actions/resourcesActions';

import Swal from 'sweetalert2'
//estilos
import './login.css'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff',
    },
}));


const LoginButton = () => {
    const classes = useStyles();
    const history = useHistory();
    const [openDialogPre, setOpenDialogPre] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    const [erroDialog, setErrorDialog] = useState(false);

    const dispatch = useDispatch();
    const signInUser = user => dispatch(signInUserAction(user));
    const addResources = resources => dispatch(addResourcesAction(resources));

    const handleCloseDialogError = () => {
        setErrorDialog(false);
    };

    const handleClosePre = () => {
        setOpenDialogPre(false);
    }

    const handleClick = () => {
        setOpenDialogPre(true);
    }

    const signIn = async () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (typeof auth2 === "object") {
            await auth2.signIn().then(
                () => {
                    const profile = auth2.currentUser.get().getBasicProfile();
                    if(profile){
                        handleConfirmEntry(profile);
                    }
                   
                }
            ).catch(
                exception => {
                    let errorMsgHtml = "";
                    if (exception.error) {
                        if (exception.error === "popup_closed_by_user") {
                            errorMsgHtml = `
                            <div align="left"><strong>El error puedo suceder por:</strong>
                            <ul>
                            <li>Se ingreso un correo que no pertenece a la Universidad de las Fuerza Armadas - ESPE</li>
                            <li>En el navegador se encontraba abierta la sesión de otro correo.</li>
                            <li>Cuando el navegador Google Chrome está en modo incognito no permite guardar cookies. Google recomienda: 
                            "Crear una excepción  para https://accounts.google.com agregando accounts.google.com en dominios permitidos."
                            <a href="https://developers.google.com/identity/sign-in/web/troubleshooting#third-party_cookies_and_data_blocked">Más Información</a>
                            </li>
                            </ul>
                            <strong>Recomendación: Utilizar la Aplicación en el navegador Mozilla Firefox en modo incógnito.</strong>
                            <div>
                            `;
                        }
                    } else {
                        errorMsgHtml = "<strong> Ocurrio un error inesperado, intentes más tarde, o contáctese con soporte.</strong>";
                    }
                    Swal.fire({
                        title: 'Error en la Autenticación.',
                        html: errorMsgHtml,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    })
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'La api de google no es soportada en esté navegador.',
                html: `<div align="left"><strong>Por favor prueba con estos navegadores</strong>
                    <ul>
                    <li>Google Chrome en macOS, Windows, Linux, Android, iOS </li>
                    <li> Mozilla Firefox en macOS, Windows, Linux </li>
                    <li> Safari en macOS y iOS </li>
                    <li> Mozilla Firefox en macOS, Windows, Linux </li>
                    </ul></div> `,
            })
        }
    }

    const handleStart = async () => {
        setOpenDialogPre(false);
        signIn();
    }

    const handleConfirmEntry = async (googleUser) => {
        setOpenLoader(true);
        await clientBackendHeroko.post("/v1/resources-user", {
            email: googleUser.getEmail(),
            lastname: googleUser.getFamilyName(),
            name: googleUser.getGivenName()
        }).then(
            response => {
                if (response.status === 208) {
                    signInUser(response.data.user);
                    addResources(response.data.resources);
                    history.push("/community-espe");
                }
                setOpenLoader(false);

            }
        ).catch(
            exception => {
                setOpenLoader(false);
                setErrorDialog(true);
            }
        );
    }


    return (
        <Fragment>
            <button className="btnSingin" onClick={handleClick}> Iniciar Sesión</button>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openDialogPre}
                onClose={handleClosePre}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title" >Advertencia</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Acontinuación usted deberá ingresar el correo de otorgado por la Universidad de las Fuerzas Armadas - ESPE. <br />
                        <strong>Recuerde:</strong> La plataforma está destinada solo a los usuarios de la comunidad universitaria. <br />
                        <strong>Nota:</strong> Si usted se encuentra en un navegador en el cual previamente inicio sesión con el correo otorgado por la Universidad de las Fuerzas Armadas - ESPE.
                        El sistema no le volvera a pedir que se autentique.
                        <div class="alert alert-primary" role="alert">
                            Se recomienda ingresar al aplicativo en el navegador Mozilla Firefox en modo incógnito, por
                            razones de seguridad y compatibilidad.
                        </div>
                    </DialogContentText>
                    <DialogActions>

                        <Button variant="outlined" color="primary" onClick={handleStart} >
                            Continuar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClosePre}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Backdrop className={classes.backdrop} open={openLoader} >
                <CircularProgress color="primary" />
            </Backdrop>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={erroDialog}
                onClose={handleCloseDialogError}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ocurrio un error, en el proceso. Comuniquese con Soporte.
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleCloseDialogError}>
                            Cerrar
                            </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default LoginButton;