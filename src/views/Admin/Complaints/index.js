import React from 'react';
import {
    makeStyles, Accordion, AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InfoReports from "./Alerts/InfoReports";
import TableComplaintByState from "./Tables/TbComplaintByState";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    accordion:{
        marginTop: "1%"
    },
    accordionSummary:{
        background: "linear-gradient(66deg, rgba(255,255,255,1) 0%, rgba(190,236,205,0.5550595238095238) 50%, rgba(255,255,255,1) 100%)",
        borderColor: "rgba(0,83,28,1)",
        borderStyle: "solid",
        borderWidth: "2px"
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div class="row">
                <div class="col-sm-12">
                    <InfoReports />
                 </div> 
                <div class="col-sm-12  container-info">
                    <Accordion className={classes.accordion} >
                        <AccordionSummary  expandIcon={<ExpandMoreIcon  />} 
                         className={classes.accordionSummary}   >
                        Denuncias No procesadas
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableComplaintByState state="No procesada"/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} >
                       
                        <AccordionSummary  expandIcon={<ExpandMoreIcon  />} 
                         className={classes.accordionSummary}     >
                        Denuncias En proceso
                       
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableComplaintByState state="Procesada"/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} >
                        
                        <AccordionSummary    expandIcon={<ExpandMoreIcon  />} 
                         className={classes.accordionSummary}       >
                        Denuncias Archivadas
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableComplaintByState state="Archivada"/>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Home;