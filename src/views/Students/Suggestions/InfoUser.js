import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import { useSelector } from 'react-redux';
import { clientBackendHeroko } from '../../../config/axios';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: "1%",
        height: 100,
        width: '90%',
        background: 'linear-gradient(61deg, rgba(255,255,255,1) 0%, rgba(190,236,205,1) 68%)',
        padding: '1%'
    },
    containerForm: {
        flexGrow: 1,
    },
    paperForm: {
        width: '90%',
        padding: '1%',
        display: 'flex',
        borderStyle: 'solid',
        borderColor: "rgba(0,83,28,1)"
    },
    selectEmpty: {
        minWidth: '60%',
        maxWidth: '100%'
    },
    proggressTopic: {
        height: '10px'
    },
    errorLetters: {
        color: "#FF0000",
        fontSize: '12px',
        fontStyle: 'bold'
    },
}));

const InfoUser = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user.data);
    const [topicSelected, setTopic] = useState({ idTopic: 0 });
    const [topics, setTopics] = useState([]);
    const [alert, setAlert] = useState({ show: false, msg: null, type: null });
    const [suggestions, setSuggestions] = useState({});
    const [errors, setErrors] = useState({});
    const handleChangeTopic = event => {
        const topic = topics.find(elemtent => elemtent.idTopic === event.target.value);
        setTopic(topic);
        setErrors({ ...errors, topicSelected: null });

    }

    const getTopics = async () => {
        await clientBackendHeroko.get("/v1/topic-suggestion").then(
            response => {
                if (response.status === 208) {
                    setTopics(response.data);
                }
            }
        ).catch(
            exception => {
                if (exception.response) {
                    if (exception.response.status === 400) {
                        setAlert({ show: true, msg: "No existen temas registradas.", type: "alert alert-danger m-0 p-0" });
                    }
                } else {
                    setAlert({ show: true, msg: "Existen problemas de red. Contáctese con soporte.", type: "alert alert-warning m-0 p-0" });
                }
            }
        );
    }

    const renderTopics = () => {
        if (topics.length === 0) {
            getTopics();
            return (
                <MenuItem value="">
                    <em>Cargando...</em>
                </MenuItem>
            );
        } else {
            return (
                topics.map(item => <MenuItem value={item.idTopic} key={item.idTopic}>{item.name}</MenuItem>)
            );
        }
    }

    const handleChange = (event) => {
        setSuggestions({ ...suggestions, description: event.target.value });
        setErrors({ ...errors, suggestions: null });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errorsInputs = {}

        if (topicSelected.idTopic === 0) {
            errorsInputs.topicSelected = 'Seleccione un tema.';
        }

        if (Object.keys(suggestions).length === 0) {
            errorsInputs.suggestions = 'Describa la sugerencia.';
        }

        if (Object.keys(errorsInputs).length === 0) {
            const bodyRequest = {
                emailUserAutor: user.email,
                emailUserLike: "",
                suggestion: {
                    ...suggestions,
                    topic: topicSelected
                }
            }
            console.log(bodyRequest);
            sendComplaint(bodyRequest);
        } else {
            setErrors(errorsInputs);
        }
    }

    const sendComplaint = async (bodyRequest) => {
        await clientBackendHeroko.post("/v1/suggestion/save", bodyRequest).then(
            response => {
                if (response.status === 201) {
                    setSuggestions({});
                    setTopic({ idTopic: 0 });
                    setAlert({ show: true, msg: "Sugerencia registrada", type: "alert alert-primary" })
                    setErrors({});
                }
            }
        ).catch(
            exception => {
                if (exception.response) {
                    setAlert({ show: true, msg: "Ocurrio un error en el proceso de registro", type: "alert alert-danger" })
                } else {
                    setAlert({ show: true, msg: "Existen poblemas en la red. Contáctese con soporte. ", type: "alert alert-warning" })
                }
            }
        );
    }

    return (
        <Grid container className={classes.root} spacing={4} justify="center">
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Paper className={classes.paper}>
                        <h4>Bienvenido:{" " + user.name + " " + user.lastname}</h4>
                        <p><strong>Ayudanos a mejorar.</strong> Si tienes una idea nueva, mejores procesos, temas de investigación,
                        eventos sociales o cualquier otra sugerencia que permita crecer a la Institución, Envía tu sugerencia a las autoridades.
                         </p>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={10} >
            {alert.show ?
                <div class={alert.type} role="alert">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setAlert({ show: false })}>
                        <ClearIcon style={{ color: "#FF0000" }} fontSize="small" />
                    </IconButton>
                    {alert.msg}
                </div> : null
            }
            </Grid>
            <Grid item xs={8} >
                <form onSubmit={handleSubmit}>
                    <Grid container justify="center" className={classes.containerForm}>

                        <Paper className={classes.paperForm}>
                            <Grid container justify="flex-start" alignItems="center" spacing={1} >
                                <Grid item xs={12}>
                                    <label > Los campos marcados con (<font color="#d50000">*</font>) son obligatorio. </label>
                                </Grid>

                                <Grid item xs={4}>
                                    <label > Selecciona el tema de la sugerencia:<font color="#d50000">*</font> </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="select-topic"
                                        value={topicSelected.idTopic}
                                        onChange={handleChangeTopic}
                                        label="Tema"
                                        className={classes.selectEmpty}
                                        defaultValue="- Seleccione -"
                                    >
                                        {renderTopics()}
                                    </Select>
                                    {errors.topicSelected ?
                                        <p className={classes.errorLetters}>{errors.topicSelected}</p>
                                        :
                                        null
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    {(topics.length === 0 ? <CircularProgress className={classes.proggressTopic} /> : null)}
                                </Grid>
                                <Grid item xs={4}>
                                    <label > Describa la sugerencia: <font color="#d50000">*</font> </label>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        id="sug-description"
                                        placeholder="La universidad mejora sí..."
                                        multiline
                                        rowsMax={4}
                                        variant="outlined"
                                        fullWidth
                                        value={suggestions.description}
                                        onChange={handleChange}
                                    />
                                    {errors.suggestions ?
                                        <p className={classes.errorLetters}>{errors.suggestions}</p>
                                        :
                                        null
                                    }
                                </Grid>
                                <Grid item xs={12} align="center" >
                                    <button className="btnCommon mt-3" type="submit" > Enviar</button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default InfoUser;