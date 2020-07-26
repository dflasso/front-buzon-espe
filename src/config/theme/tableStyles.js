import { palette } from './palette';

const stylesTable = {
    cellTable: {
        borderStyle: 'solid',
        borderColor: palette.primary.main,
        borderWidth: '1px 1px 0px 1px',
        textAlign: 'center',
        '&:hover': {
            color: '#FFFFFF',
        },
        padding: "0",
    },
    cellLeft : {
        borderStyle: 'solid',
        borderColor: palette.primary.main,
        borderWidth: '1px 1px 0px 1px',
        textAlign: 'left',
        '&:hover': {
            color: '#FFFFFF',
        },
        padding: "0px",
        paddingLeft: "1%"
    },
    cellRight: {
        borderStyle: 'solid',
        borderColor: palette.primary.main,
        borderWidth: '1px 1px 0px 1px',
        textAlign: 'right',
        '&:hover': {
            color: '#FFFFFF',
        },
        padding: "0px",
        paddingRight:"5px"
    }
};

export default stylesTable;