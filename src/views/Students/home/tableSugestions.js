import React, { useState, Fragment } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import BtnLikeSugestion from './btnLikeSugestions';
import CircularProgress from '@material-ui/core/CircularProgress';
import stylesTable from '../../../config/theme/tableStyles';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { clientBackendHeroko } from '../../../config/axios';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import BtnDetailSuggestion from './buttons/detailSuggestion';
import BtnShareSuggestion from './buttons/shareSuggestion';

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
  }
}));


export default function MaterialTableDemo() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: null, type: null });
  const [updateView, setUpdateView] = useState(true);
  const classes = useStyles();
  const columns = [
    { title: 'Tema', field: 'topic.name', width: '10%', cellStyle: stylesTable.cellLeft },
    { title: 'Sugerencia', field: 'description', width: '40%', cellStyle: stylesTable.cellLeft },
    { title: 'Más detalles', cellStyle: stylesTable.cellTable, render: rowData => <BtnDetailSuggestion />, width: '5%' },
    { title: 'Me gusta', cellStyle: stylesTable.cellTable, render: rowData => <BtnLikeSugestion />, width: '5%' },
    { title: 'Compartir', cellStyle: stylesTable.cellTable, render: rowData => <BtnShareSuggestion />, width: '5%' },
  ]

  const getSuggestions = async () => {
    await clientBackendHeroko.get("/v1/suggestion").then(
      response => {
        if(response.status === 208){
          setUpdateView(false);
          setData(response.data);
        }
      }
    ).catch(
      execption => {
        setUpdateView(false);
        if (execption.response) {
          if (execption.response.status === 404) {
            setAlert({ show: true, msg: "No existen sugrencias registradas.", type: "alert alert-info m-0 p-0" });
          }
        } else {
          setAlert({ show: true, msg: "Existen problemas de red. Contáctese con soporte.", type: "alert alert-warning m-0 p-0" });
        }
        setData([]);

      }
    );
  }

  const renderTable = () => {
    if (updateView) {
      getSuggestions();
      return (
        <div style={{ padding: '10%' }}>
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div style={{ padding: '1%' }}>
          {alert.show ?
            <div class={alert.type} role="alert">
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=> setAlert({show: false})}>
                <ClearIcon style={{ color: "#FF0000" }}  fontSize="small" />
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
              pageSize: 10,
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
                    <h4>Sugerencias Publicadas</h4>
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

  return (
    <Fragment>
      {renderTable()}
    </Fragment>
  );
}