import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

//estilos
import './login.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    id: 1,
    tittle: '¡Envía Sugerencias!',
    description: 'Comparte tus ideas, nuevos procesos o mejoras que pueden aplicarse a la Universidad de las Fuerzas Armadas - ESPE',
    imgPath:
      'https://www.espe.edu.ec/wp-content/uploads/2019/05/Espe-Sangolgui.jpg',
  },
  {
    id: 2,
    tittle: 'Denuncia todo tipo de Abuso.',
    description: 'Esta plataforma te permite denunciar cualquier tipo de abuso dentro de la comunidad o infraestructura de la Universidad de las Fuerzas Armadas - ESPE',
    imgPath:
      'https://cec.espe.edu.ec/wp-content/uploads/2018/11/espe-banner-administrativo.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: "100%",
    paddingLeft: theme.spacing(0),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div style={{ backgroundImage: `url(${step.imgPath})` }}>
                <div className="div-info-container">
                  <div className="div-info">
                    <h4>{step.tittle}</h4>
                    <p>{step.description}</p>
                    </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

    </div>
  );
}

export default SwipeableTextMobileStepper;