import React, { useState } from 'react';
import { makeStyles, CircularProgress, Backdrop, IconButton, Avatar } from '@material-ui/core';
import MaterialTable from 'material-table';
import stylesTable from '../../../../config/theme/tableStyles';
import FormComplaintByDates from "../Forms/SearchComplaintsByDate";
import { clientBackendHeroko, clientBackendHerokoFiles } from "../../../../config/axios";
import ClearIcon from '@material-ui/icons/Clear';
import BtnChangeStateComplaint from "../Buttons/btnChangeState";
import pdfIcon from '../../../../assets/icons/pdf.png'
const useStyles = makeStyles(theme => ({
    divTable: {
        borderColor: "rgba(0,83,28,1)",
        borderStyle: 'solid',
        margin: '1%',
        padding: '0.5%',
        width: "100%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    IconButton: {
        marginTop: "0%",
        marginBottom: "0%",
        padding: "0px",
    },
}));

const TableComplaintByState = ({ state = "No procesada" }) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const [open, setOpen] = useState(false);
    const [dates, setDates] = useState(null);

    const handleUpdateView = dates => {
        setData([]);
        handleSubmit(dates);
    }

    const columns = [
        { title: 'Estado', field: 'stateComplaint', width: '8%', cellStyle: stylesTable.cellLeft },
        { title: 'Tipo', field: 'type', width: '10%', cellStyle: stylesTable.cellLeft },
        { title: 'Descripción', field: 'description', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Efectos', field: 'effects', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Fecha de envío', field: 'sendDateComplaint', width: '10%', cellStyle: stylesTable.cellLeft },
        {
            title: 'Cambiar de estado', width: '8%', cellStyle: stylesTable.cellTable,
            render: rowData => <BtnChangeStateComplaint complaint={rowData} updateView={handleUpdateView} dates={dates}

                onShowAlert={setAlert} />
        },
        {
            title: 'PDF', width: '5%', cellStyle: stylesTable.cellTable,
            render: rowData => <BotonPDF data={rowData} />
        },
    ]

    const displayPDF = async (idComplain) => {
        return await clientBackendHerokoFiles.get(`/v1/report/${idComplain}/complaint`).then(
            response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        ).catch(
            exception => {
                if (exception.response) {
                    console.error('error', exception.response.data);
                } else {
                    console.error('error', exception);
                }

            }
        );
    }

    const BotonPDF = (data) => {
        return (
            <IconButton aria-label="PDF" className={classes.IconButton} onClick={() => displayPDF(data.data.idComplaint)}>
                <Avatar variant="square" src={pdfIcon} className={classes.small} />
            </IconButton>
        );
    }

    const handleSubmit = async dates => {
        setDates(dates);
        setOpen(true);
        const api = `/v1/complaint/get-report/${state}/by-state/${dates.startDate}/${dates.endingDate}/andDates`;
        await clientBackendHeroko.get(api).then(
            response => {
                if (response.status >= 200 && response.status <= 300) {
                    setData(response.data);
                }
                setAlert({ show: false, msg: null, type: null });
                setOpen(false);
            }
        ).catch(
            expection => {
                if (expection.response) {
                    if (expection.response.status === 404) {
                        setAlert({ show: true, msg: "No existen denuncias en ese rango de fechas.", type: "alert alert-warning  p-1" });
                    } else {
                        setAlert({ show: true, msg: "Ocurrio un error al consultar las denuncias. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                    }
                } else {
                    setAlert({ show: true, msg: "Ocurrio un error en la red. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                }
                setData([]);
                setOpen(false);
            }
        );
    }

    return (
        <div class="container m-0 p-0 mw-100" >
            <div class="row">
                <div class="col-12">
                    {alert.show ?
                        <div class={alert.type} role="alert">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                                <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                            </IconButton>
                            {alert.msg}
                        </div> : null
                    }
                </div>
                <div class="col-12">
                    <FormComplaintByDates onSubmit={handleSubmit} />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div className={classes.divTable}>
                        <MaterialTable
                            title=""
                            columns={columns}
                            data={data}
                            localization={{
                                toolbar: {
                                    addRemoveColumns: 'Agregue o elimine columnas',
                                    nRowsSelected: ' Filas Seleccionadas',
                                    searchTooltip: 'Buscar',
                                    searchPlaceholder: 'Buscar ...'
                                },
                                header: {
                                    actions: ''
                                },
                                body: {
                                    emptyDataSourceMessage: 'No existen datos',
                                    addTooltip: 'Agregar ',
                                    deleteTooltip: 'Borrar ',
                                    editTooltip: 'Editar',
                                    editRow: {
                                        deleteText: '¿Esta Seguro que deseea eliminarlo?',
                                        cancelTooltip: 'Cancelar',
                                        saveTooltip: 'Aceptar'
                                    }
                                }
                            }}

                            options={{
                                sorting: false,
                                pageSize: 5,
                                search: false,
                                headerStyle: {
                                    backgroundColor: '#000000',
                                    color: '#FFFFFF',
                                    borderStyle: 'solid',
                                    borderColor: '#FFFFFF',
                                    borderWidth: '1px',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: '0px',
                                },
                                rowStyle: {
                                    borderStyle: 'solid',
                                    borderColor: '#000000',
                                    borderWidth: '1px 1px ',
                                    alignContent: 'center',
                                    textAlign: 'center'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default TableComplaintByState;