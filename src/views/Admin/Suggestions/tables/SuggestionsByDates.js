import React from 'react';
import { makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import stylesTable from '../../../../config/theme/tableStyles';

const useStyles = makeStyles(theme => ({
    divTable: {
        borderColor: "rgba(0,83,28,1)",
        borderStyle: 'solid',
        margin: '1%',
        padding: '0.5%'
    }
}));

const TableSuggestiosByDates = ({data = []}) => {
    const classes = useStyles();

    const columns = [
        { title: 'Tema', field: 'topic.name', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Descripción', field: 'description', width: '20%', cellStyle: stylesTable.cellLeft },
        { title: 'Fecha de envío', field: 'creationDate', width: '20%', cellStyle: stylesTable.cellLeft },
    ]

    return (
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
    );
}

export default TableSuggestiosByDates;