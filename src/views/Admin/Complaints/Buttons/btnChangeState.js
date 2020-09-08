import React, { useState } from 'react';
import { makeStyles, IconButton, Dialog, Button, DialogContent, Grid,  Select, MenuItem, DialogTitle,
    CircularProgress, Backdrop } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { clientBackendHeroko } from "../../../../config/axios";

const useStyles = makeStyles(theme => ({
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
    },
    root: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const BtnChangeStateComplaint = ({ complaint, updateView, dates, onShowAlert }) => {
    const classes = useStyles();
    const [stateComplaint, setStateComplaint] = useState(null);
    const [open, setOpen] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    const handleChangeData = event => {
        setStateComplaint(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleUpdateState = async () => {
        setOpenLoader(false);
        await clientBackendHeroko.patch(`/v1/complaint/change-state/${complaint.idComplaint}/${stateComplaint}`).then(
            response => {
                if(response.status >= 200 && response.status <= 300){
                    onShowAlert({ show: true, msg: "La denuncia paso al estado:" + stateComplaint, type: "alert alert-success  p-1" });
                }
                updateView(dates)
                setOpenLoader(false);
                setOpen(false);
            } 
        ).catch(
            expection => {
                if (expection.response) {
                    if (expection.response.status === 404) {
                        onShowAlert({ show: true, msg: "No existen denuncias en ese rango de fechas.", type: "alert alert-warning  p-1" });
                    } else {
                        onShowAlert({ show: true, msg: "Ocurrio un error al consultar las denuncias. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                    }
                } else {
                    onShowAlert({ show: true, msg: "Ocurrio un error en la red. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                }
                setOpenLoader(false);
            }
        );
    }

    return (
        <>
            <IconButton color="primary" className={classes.IconButton} onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >Cambiar estado denuncia</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <label>Seleccione el nuevo estado:</label>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                name="type"
                                value={stateComplaint}
                                onChange={handleChangeData}
                                className={classes.selectEmpty}
                                defaultValue="- Seleccione -"
                                fullWidth
                            >
                                <MenuItem value={'No procesada'} >No procesada</MenuItem>
                                <MenuItem value={'Procesada'} >Procesada</MenuItem>
                                <MenuItem value={'Archivada'} >Archivada</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="primary" fullWidth variant="contained" onClick={handleUpdateState}>Cambiar</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="secondary" fullWidth variant="contained" onClick={handleClose}>Cancelar</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Backdrop className={classes.backdrop} open={openLoader} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default BtnChangeStateComplaint;