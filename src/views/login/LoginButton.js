import React, { useState, Fragment, useEffect } from 'react';
import { useGoogleAuth } from '../../hooks/GoogleAuthContext';
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
    const { signIn, isSignedIn, signOut, googleUser } = useGoogleAuth();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [openDialogPre, setOpenDialogPre] = useState(false);
    const [startProcessAuth, setStartProcessAuth] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    const [erroDialog, setErrorDialog] = useState(false);


    const dispatch = useDispatch();
    const signInUser = user => dispatch(signInUserAction(user));
    const addResources = resources => dispatch(addResourcesAction(resources));

    useEffect(() => {
        if (typeof googleUser !== 'undefined' && startProcessAuth) {
            setTimeout(() => { setOpen(true) }, 2000);

        }
    }, [googleUser, open, startProcessAuth]);

    const handleClose = () => {
        signOut();
        setOpen(false);
    };

    const handleCloseDialogError = () => {
        setErrorDialog(false);
    };

    const handleClosePre = () => {
        setOpenDialogPre(false);
    }

    const handleClick = () => {
        setOpenDialogPre(true);
    }

    const handleStart = async () => {
        setOpenDialogPre(false);
        if (isSignedIn) {
            signOut();
        }
        signIn();
        setStartProcessAuth(true);
    }

    const handleConfirmEntry = async () => {
        setOpenLoader(true);
        await clientBackendHeroko.post("/v1/resources-user", {
            email: googleUser.profileObj.email,
            lastname: googleUser.profileObj.familyName,
            name: googleUser.profileObj.givenName
        }).then(
            response => {
                if (response.status === 208) {
                    signInUser(response.data.user);
                    addResources(response.data.resources);
                    history.push("/community-espe");
                }
                setOpenLoader(false);
                setOpen(false);
            }
        ).catch(
            exception => {
                setOpenLoader(false);
                setOpen(false);
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
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Gracias por Autenticarte</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mediante este aplicativo usted puede:
                    <ul>
                            <li>
                                Enviar Sugerencias a las Autoridades, con el fin de mejorar: procesos, el uso de instalaciones, entre otros.
                        </li>
                            <li>
                                Denunciar actos que perjudiquen su integridad o la de otros.
                        </li>
                        </ul>
                        El aplicativo enviara un correo con su mensaje a las autoridades.
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={handleConfirmEntry}>
                            De acuerdo
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Salir
                      </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
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
                        <strong>Recuerde:</strong> La plataforma está destinada a los usuarios de la comunidad universitaria. <br />
                        <strong>Nota:</strong> Si usted se encuentra en un navegador en el cual previamente inicio sesión con el correo otorgado por la Universidad de las Fuerzas Armadas - ESPE.
                        El sistema no le volvera a pedir que se autentique.
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
                <DialogTitle id="max-width-dialog-title">Erro</DialogTitle>
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