import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CreateLeagueForm from './CreateLeagueForm';

const styles = theme => ({
  root: {
    // padding: 20
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
    // borderTop: '1px solid red',
    minHeight: 'calc(50vh - 9px)',
    height: 'auto',
    // minHeight: 350,
    backgroundColor: '#1565c0'
  },
  card: {
    width: '20%',
    minWidth: 250,
    margin: '0 2%',
    marginBottom: 15,
    minHeight: 200,
    height: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '1px 2px 3px #000, 2px 3px 2px #111'
  },
  title: {
    fontSize: 16,
    textDecoration: 'underline'
  },
  pos: {
    marginBottom: 12
  },
  button: {
    width: '70%',
    margin: '0 auto'
    // border: '1px solid #eee'
    // backgroundColor: '#42b6ff'
  },
  instructions: {
    // border: '1px solid blue',
    height: '40vh',
    minHeight: 300,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: 20
    }
  },
  step: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    // width: '25%',
    minHeight: '80px',
    // boxShadow: '0px 1px 2px #333, 1px 2px 3px #1565c0',
    // borderRadius: '7px'
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      borderBottom: '1px solid #333',
      paddingBottom: 20
    }
  },
  number: {
    fontSize: '1.3rem',
    color: '#1565c0'
  },
  text: {
    fontSize: '1.2rem'
  },
  unavailable: {
    color: '#555'
    // lineHeight: '1.3'
  },
  unavailableTitle: {
    fontSize: 16,
    textDecoration: 'underline',
    color: '#555'
  }
});

function ChooseLeague(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        <div className={classes.step}>
          <p className={classes.number}>1.</p>
          <p className={classes.text}>Buy a league!</p>
        </div>
        <div className={classes.step}>
          <p className={classes.number}>2.</p>
          <p className={classes.text}>Set it up!</p>
        </div>
        <div className={classes.step}>
          <p className={classes.number}>3.</p>
          <p className={classes.text}>Manage it with ease!</p>
        </div>
      </div>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              // className={classes.title}
              // color="textSecondary"
              gutterBottom
            >
              Basic League
            </Typography>
            <Typography className={classes.title}>
              League Description
            </Typography>
            <Typography>
              - Create a Custom Sports League <br /> - Generate a Custom
              Schedule <br /> - Drag and Drop Edit Schedule <br /> - Public
              Calendar
            </Typography>
          </CardContent>
          <CardActions>
            <CreateLeagueForm leagueType="basic" />
            {/* <Button className={classes.button}>Select</Button> */}
          </CardActions>
        </Card>
        <Card className={classes.card} style={{ backgroundColor: '#c0c0df' }}>
          <CardContent>
            <Typography
              className={classes.unavailable}
              variant="h5"
              component="h2"
              // className={classes.title}
              // color="textSecondary"
              gutterBottom
            >
              Premium League
            </Typography>
            <Typography className={classes.unavailableTitle}>
              Coming Soon
            </Typography>
            <Typography className={classes.unavailable}>
              - Team Stats <br /> - Tournament Mode <br /> - League Standings
            </Typography>
          </CardContent>
          <CardActions>
            <CreateLeagueForm leagueType="premium" />
            {/* <Button className={classes.button}>Select</Button> */}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

ChooseLeague.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChooseLeague);
