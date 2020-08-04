import React, { useState, Fragment } from 'react';
import {
    IconButton, makeStyles, CircularProgress, DialogTitle, DialogContentText, DialogActions,
    Dialog, DialogContent, Button
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Backdrop from '@material-ui/core/Backdrop';
import { clientBackendHeroko } from '../../../../config/axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserDetail from '../Forms/UserDetail';
import ComplaintDetail from '../Forms/ComplaintDetail';

const useStyles = makeStyles(theme => ({
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
    },
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff',
    },
}));


const SendCompaint = ({ data }) => {
    const classes = useStyles();
    const [openLoader, setOpenLoader] = useState(false);
    const [value, setValue] = React.useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [detail, setDetail] = useState(null);

    const getDetail = async () => {
        setOpenLoader(true);
        await clientBackendHeroko.get(`/v1/complaint/get-detail/${data.idComplaint}`).then(
            response => {
                if (response.status === 208) {
                    setDetail(response.data);
                    setOpenDialog(true);
                }
                setOpenLoader(false);
            }
        ).catch(
            exception => {
                setOpenLoader(false);
            }
        );
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderDetail = () => {
        if (detail !== null) {
            if (value === 0) {
                return (
                    <UserDetail user={{
                        data: detail.user, carrer: detail.carrer,
                        department: detail.department, modality: detail.modality
                    }} />
                );
            } else {
                return <ComplaintDetail complaint={detail.complaint}/>;
            }
        } else {
            return null;
        }
    }

    return (
        <Fragment>
            <IconButton component="span" className={classes.IconButton} onClick={getDetail}>
                <InfoIcon style={{ color: '#2196f3' }} />
            </IconButton>
            <Backdrop className={classes.backdrop} open={openLoader} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                fullWidth
                maxWidth="md"
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Datos Personales" />
                        <Tab label="Detalle de la Denuncia" />
                    </Tabs>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {renderDetail()}
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Salir
                      </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default SendCompaint;