import React, { useState, Fragment, useEffect } from 'react';
import { useGoogleAuth } from '../../hooks/GoogleAuthContext';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { clientBackendHeroko } from '../../config/axios';
const LoginButton = () => {

    const { signIn, isSignedIn, signOut, googleUser } = useGoogleAuth();
    const [signInUser, setSignIn] = useState(0);
    const history = useHistory();
    useEffect(() => {
        if (isSignedIn && signInUser === 1) {
            setSignIn(2);
        }
    }, [isSignedIn, signInUser]);

    const handleClose = () => {
        setSignIn(0);
        signOut();
    };

    const handleStart = async () => {
        const data = {
            "email": googleUser.profileObj.email,
            "lastname": googleUser.profileObj.familyName,
            "name": googleUser.profileObj.givenName
        };
        console.log(data);
        await clientBackendHeroko.post('/v1/resources-user',data).then(
            response => {
                console.log(response);
            }
        ).catch(
            exception => {
                console.log({exception})
            }
        );
        
        history.push("/community-espe");
    }


    return (
        <Fragment>
            <Button variant="outlined" color="primary" onClick={() => { setSignIn(1); signIn(); }}>
                Iniciar Sesión
      </Button>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={signInUser === 2}
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
                        <Button variant="outlined" color="primary" onClick={handleClose}>
                            Salir
                      </Button>
                        <Button variant="outlined" color="primary" onClick={handleStart} >
                            De acuerdo
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default LoginButton;