import React, { useState, Fragment } from 'react';
import {
    makeStyles, DialogTitle, DialogContentText,
    Dialog, DialogContent, Button, Stepper, Step, StepLabel, Typography
} from '@material-ui/core';

import FormUser from '../Forms/FormUser';
import FormComplaint from '../Forms/FormComplaint';

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


const SendCompaint = () => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const steps = getSteps();

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderForms = () => {
        switch (activeStep) {
            case 0:
                return <FormUser />;
            case 1:
                return <FormComplaint />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <button className="btnCommon" onClick={handleClickOpen}>Enviar Nueva Denuncia</button>
            <Dialog
                fullWidth
                maxWidth="md"
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"> Nueva Denuncia
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <label > Los campos marcados con (<font color="#d50000">*</font>) son obligatorio. </label>
                        {renderForms()}
                    </DialogContentText>

                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Regresar
                            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default SendCompaint;