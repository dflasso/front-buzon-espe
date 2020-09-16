import React, { useState } from "react";
import { makeStyles, Grid } from '@material-ui/core';
import ErrorMsg from "../../../../widgets/errorMsg";

const useStyles = makeStyles({
    form: {
        width: '90%',
        padding: '1%',
        margin: "1%",
        display: 'flex',
        borderStyle: 'solid',
        borderColor: "rgba(0,83,28,1)",
        "-webkit-box-shadow": "10px 10px 5px 0px rgba(0,0,0,0.75)",

    }
});

const FormSearchByDates = ({ onSubmit }) => {
    const classes = useStyles();
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [errors, setErrors] = useState({});
    const handleChange = event => {
        switch (event.target.name) {
            case "startDate":
                setStartDate(event.target.value);
                break;
            case "endDate":
                setEndDate(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const newErrors = {};
        if(!startDate){
            newErrors.startDate = "Ingrese la Fecha de Inicio";
        }

        if(!endDate){
            newErrors.endDate = "Ingrese la Fecha de Fin";
        }

        if(Object.keys(newErrors).length === 0){
            setErrors({})
            onSubmit({
                endingDate: endDate,
                startDate:  startDate
            });
        }else{
            setErrors(newErrors)
        }
    }

    return (
        <div align="center">
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={1}>
                        <label>Desde:</label>
                    </Grid>
                    <Grid item xs={3}>
                        <input className="form-control"
                            type="date"
                            min="2020-01-01" max="2020-09-16"
                            autoComplete="off"
                            name="startDate"
                            value={startDate}
                            onChange={handleChange}
                        />
                        <ErrorMsg reference={errors.startDate} msg={errors.startDate} />
                    </Grid>
                    <Grid item xs={1}>
                        <label>Hasta:</label>
                    </Grid>
                    <Grid item xs={3}>
                        <input className="form-control"
                            type="date"
                            min="2020-01-01" max="2020-09-16"
                            autoComplete="off"
                            name="endDate"
                            value={endDate}
                            onChange={handleChange}
                        />
                        <ErrorMsg reference={errors.endDate} msg={errors.endDate} />
                    </Grid>
                    <Grid item xs={4}>
                        <button className="btnCommon" type="submit">Buscar</button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default FormSearchByDates;