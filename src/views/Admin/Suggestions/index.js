import React, { useState } from 'react';
import { makeStyles, CircularProgress, Backdrop, IconButton } from '@material-ui/core';
import { clientBackendHeroko } from "../../../config/axios";
import ClearIcon from '@material-ui/icons/Clear';

import InfoReports from "./Alerts/InfoReports";
import FormSearchByDates from "./Forms/SearchSuggestionByDate";
import TableSuggestiosByDates from "./tables/SuggestionsByDates";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const Home = () => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });

    const handleSubmit = async dates => {
        setOpen(true);
        await clientBackendHeroko.get(`/v1/suggestion/get-report/${dates.startDate}/${dates.endingDate}`).then(
            response => {
                if (response.status >= 200 && response.status <= 300) {
                    setSuggestions(response.data);
                }
                setAlert({ show: false, msg: null, type: null });
                setOpen(false);
            }
        ).catch(
            exception => {
                if (exception.response) {
                    if (exception.response.status === 404) {
                        setAlert({ show: true, msg: "No existen sugerencias en ese rango de fechas.", type: "alert alert-warning  p-1" });
                    } else {
                        setAlert({ show: true, msg: "Ocurrio un error al consultar las sugerencias. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                    }
                } else {
                    setAlert({ show: true, msg: "Ocurrio un error en la red. Contáctese con soporte. ", type: "alert alert-info m-0 p-0" });
                }
                setSuggestions([]);
                setOpen(false);
            }
        );
    }

    return (
        <div className={classes.root}>
            <div class="row">
                <div class="col-sm">
                    <InfoReports />
                    <FormSearchByDates onSubmit={handleSubmit} />
                    {alert.show ?
                        <div class={alert.type} role="alert">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                                <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                            </IconButton>
                            {alert.msg}
                        </div> : null
                    }
                    <TableSuggestiosByDates data={suggestions} />
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Home;