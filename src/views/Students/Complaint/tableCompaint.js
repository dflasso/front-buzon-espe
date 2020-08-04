import React, { useState, Fragment } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { clientBackendHeroko } from '../../../config/axios';
import { useSelector } from 'react-redux';
import stylesTable from '../../../config/theme/tableStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Avatar } from '@material-ui/core';
import SendComplaint from './buttons/sendComplaint';
import DetailComplaint from './buttons/BtnDetailComplaint';
import pdfIcon from '../../../assets/icons/pdf.png'
import { clientBackendHerokoFiles } from '../../../config/axios';

const useStyles = makeStyles(theme => ({
    buscador: {
        marginLeft: '1%',
        marginRight: '1%'
    },
    backdrop: {
        marginBottom: '10%',
        marginTop: '10%'
    },
    botonesHeader: {
        marginTop: '0.5%',
        marginLeft: '2%'
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
    divTable: {
        borderColor: "rgba(0,83,28,1)",
        borderStyle: 'solid',
        margin: '1%',
        padding: '0.5%'
    }
}));

const TableCompaints = () => {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const user = useSelector(state => state.user.data);
    const [stateComplaint, setStateComplaint] = useState({ id: 1, description: 'No procesada' });
    const classes = useStyles();
    const columns = [
        { title: 'Tipo', field: 'type', width: '10%', cellStyle: stylesTable.cellLeft },
        { title: 'Descripción', field: 'description', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Efectos', field: 'effects', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Fecha Envío', field: 'sendDateComplaint', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Detalles', cellStyle: stylesTable.cellTable, render: rowData => <DetailComplaint data={rowData} />, width: '5%' },
        { title: 'PDF', cellStyle: stylesTable.cellTable, render: rowData => <BotonPDF data={rowData} />, width: '5%' },
    ]

    const getComplaints = async () => {
        await clientBackendHeroko.get("/v1/complaint/find/" + user.email + "/" + stateComplaint.description).then(
            response => {
                if (response.status === 208) {
                    setData(response.data);
                    setStateComplaint({ id: 1, description: 'No procesada' });
                }
            }
        ).catch(
            exception => {
                if (exception.response) {
                    setAlert({ show: true, msg: "No existen denuncias registradas.", type: "alert alert-info m-0 p-0" });
                } else {
                    setAlert({ show: true, msg: "Existen problemas de red. Contáctese con soporte.", type: "alert alert-warning m-0 p-0" });
                }
            }
        )
    }

    const renderTable = () => {
        if (data.length === 0) {
            getComplaints();
            return (
                <div style={{ padding: '10%' }}>
                    <CircularProgress />
                </div>
            );
        } else {
            return (
                <div className={classes.divTable}>
                    {alert.show ?
                        <div class={alert.type} role="alert">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                                <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                            </IconButton>
                            {alert.msg}
                        </div> : null
                    }
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
                        components={{
                            Toolbar: props => (
                                <Grid className={classes.header} container spacing={0} >
                                    <Grid align='left' xs={4} className={classes.botonesHeader}>
                                        <SendComplaint />
                                    </Grid>
                                    <Grid xs={3}>
                                    </Grid>
                                    <Grid className={classes.buscador} align='right' xs={3}>
                                        <MTableToolbar {...props} align='right' />
                                    </Grid>
                                </Grid>
                            )
                        }}
                    />
                </div>
            );
        }
    }

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
            <IconButton aria-label="PDF" className={classes.IconButton} onClick={()=> displayPDF(data.data.idComplaint) }>
                <Avatar variant="square" src={pdfIcon} className={classes.small} />
            </IconButton>
        );
    }

    return (
        <Fragment>
            {renderTable()}
        </Fragment>
    );
}

export default TableCompaints;