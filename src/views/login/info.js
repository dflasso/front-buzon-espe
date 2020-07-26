import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Unidad de Bienestar Estudiantil ESPE',
    imgPath:
      'https://ube.espe.edu.ec/wp-content/uploads/2019/03/Imagen1.png',
  },
  {
    label: 'Medios ESPE',
    imgPath:
      'https://ube.espe.edu.ec/wp-content/uploads/2018/11/logo-espe-medios.png',
  },
  {
    label: 'Unidad de Bienestar Estudiantil',
    imgPath:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQrPjwrQ9jIGVHsQ7mMLq9Ciw4wJ2TcY2clA&usqp=CAU',
  },
  {
    label: 'ESPE - Sangolqui',
    imgPath:
      'https://www.espe.edu.ec/wp-content/uploads/2019/05/Espe-Sangolgui.jpg',
  },
  {
    label: 'ESPE',
    imgPath:
      'https://cec.espe.edu.ec/wp-content/uploads/2018/11/espe-banner-administrativo.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '70%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: "90%",
    paddingLeft: theme.spacing(0),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "90%",
    display: 'block',
    maxWidth: '90%',
    overflow: 'hidden',
    width: '90%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
