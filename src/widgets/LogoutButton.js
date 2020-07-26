import React from 'react';
import { useGoogleAuth } from '../hooks/GoogleAuthContext';
import Button from '@material-ui/core/Button';

const LogoutButton = () => {
    const { signOut } = useGoogleAuth();

    return (
        <Button variant="outlined" color="primary" onClick={signOut}>
            Cerrar Sesión
      </Button>
    );
};

export default LogoutButton;