import React from 'react';
import MaterialTable from 'material-table';
import BtnLikeSugestion from './btnLikeSugestions';

import stylesTable from '../../../config/theme/tableStyles';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Tema', field: 'topic', width: '10%', cellStyle: stylesTable.cellLeft },
      { title: 'Sugerencia', field: 'description', width: '40%', cellStyle: stylesTable.cellLeft },
      { title: 'Me gusta', cellStyle: stylesTable.cellTable, render: rowData => <BtnLikeSugestion />, width: '5%' },
    ],
    data: [
      { topic: 'Instalaciones', description: 'Poner cercas alrededor de los Jardines' },
      { topic: 'Educación', description: 'Optimizar el Aula Virtual.' },
      { topic: 'Eventos Sociales', description: 'El ESPE - FEST debe ser organizado por estudiantes.' },
    ],
  });


  return (
    <div style={{padding: '2%'}}>
      <MaterialTable
        title="Sugerencias Públicadas"
        columns={state.columns}
        data={state.data}

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
            backgroundColor: '#b3e5fc',
            color: '#01579b',
            borderStyle: 'solid',
            borderColor: '#FFFFFF',
            borderWidth: '1px',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0px',
          },
          rowStyle: {
            borderStyle: 'solid',
            borderColor: '#01579b',
            borderWidth: '1px 1px ',
            alignContent: 'center',
            textAlign: 'center'
          }
        }}

      />
    </div>
  );
}