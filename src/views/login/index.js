import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//iconos
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
//components
import Info from './info';
import BtnLogin from './LoginButton';

//estilos
import './login.css'

//assets
import logoESPE from '../../assets/img/logo-espe.png';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
})
const Home = ({ component: Component, ...rest }) => {
    const classes = useStyles();


    return (
        <Fragment>
            <header>
                <div className="container container-header">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <img src={logoESPE}  className="img-fluid" alt="Responsive" width="100%" />
                        </div>
                        <div className="col-sm-8">
                            <h1>Buzón de Sugerencias y Denuncias</h1>
                        </div>
                        <div className="col-sm-2">
                            <BtnLogin/>
                        </div>
                    </div>
                </div>
            </header>
            <main className={classes.root}>
                <div style={{minWidth: '50%', maxWidth: '97%', paddingLeft: '1%'}} >
                    <div className="row justify-content-md-center" >
                        <div className="col-sm-12" align="center">
                            <Info/>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container container-footer">
                    <div className="row ">
                        <div className="col-sm-4">
                            <strong>Contactos</strong> <br />
                            <AddLocationIcon style={{ color: '#FFFFFF' }} /> <label> 	Av. General Rumiñahui s/n y Ambato </label><br />
                            <AddLocationIcon style={{ color: '#FFFFFF' }} /> <label> 	Sangolquí – Ecuador </label><br />
                            <AddIcCallIcon style={{ color: '#FFFFFF' }} /> <label>	(593)23989-400 </label><br />
                            <MailIcon style={{ color: '#FFFFFF' }} /> <label> comunicacion@espe.edu.ec</label><br />
                        </div>
                        <div className="col-sm-4">
                            <strong>Sitios Relacionados</strong> <br />
                            <a href="https://www.espe.edu.ec/" >Universidad de las Fuerzas Armadas - ESPE</a><br />
                            <a href="https://uar.espe.edu.ec/" >Admisión y Registro</a><br />
                            <a href="https://biblioteca.espe.edu.ec/" >Biblioteca</a><br />
                            <a href="https://ube.espe.edu.ec/" >Bienestar Estudiantil</a><br />
                            <a href="https://www.espe.edu.ec/" >Gestión de Tecnologías</a><br />
                            <a href="https://idiomas.espe.edu.ec/" >Instituto de Idiomas</a><br />
                            <a href="https://investigacion.espe.edu.ec/" >Investigación</a><br />
                        </div>
                        <div className="col-sm-4">
                            <strong>Encuéntranos en las redes sociales</strong> <br />
                            <FacebookIcon style={{ color: '#FFFFFF' }} /> <label> 	Facebook </label><br />
                            <TwitterIcon style={{ color: '#FFFFFF' }} /> <label> Twitter	 </label><br />
                            <YouTubeIcon style={{ color: '#FFFFFF' }} /> <label>YouTube</label><br />
                            <InstagramIcon style={{ color: '#FFFFFF' }} /> <label> Instagram</label><br />
                        </div>
                        <div className="col-sm-12 mt-4" align="center">
                            <label>Buzón de Sugerencias y Denuncias | Todos los derechos reservados </label>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Home;