import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//componentes de la vista
import TableSugestions from './tableSugestions';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    }
});

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div class="row">
                <div class="col-sm">
                    <TableSugestions />
                </div>
            </div>
        </div>
    );
}

export default Home;