import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import ReactCardFlip from 'react-card-flip';
import { AppContext } from '../Context/AppContext';

const styles = theme => ({
  cardFront: {
    minWidth: '285px',
    maxWidth: '310px',
    border: '2px solid lightgrey',
    width: '45%',
    borderRadius: '4%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '350px'
  },
  cardBack: {
    minWidth: '275px',
    maxWidth: '300px',
    border: '2px solid lightgrey',
    width: '45%',
    borderRadius: '4%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '445px'
  },
  container: {
    width: '90%'
  },
  title: {
    fontSize: '1.6rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  pos: {
    border: '1px solid black',
    marginTop: '8px',
    width: '65%',
    maxWidth: '180px',
    borderRadius: '8%',
    marginBottom: '12px',
    padding: '10px'
  },
  upcoming: {
    border: '1px solid black',
    marginTop: '8px',
    width: '90%',
    borderRadius: '8%',
    marginBottom: '7px',
    padding: '10px'
  },
  button: {
    border: '1px solid lightgrey',
    borderRadius: '6%'
  },
  p: {
    fontSize: 13
  }
});

class TeamCard extends React.Component {
  state = {
    name: this.props.name,
    id: this.props.id,
    coach_name: this.props.coach_name,
    coach_email: this.props.coach_email,
    coach_phone: this.props.coach_phone,
    wins: this.props.wins,
    losses: this.props.losses,
    ties: this.props.ties,
    isFlipped: false,
    containsTies: false,
    teamSchedule: [],
    scheduleGame1: {
      game1Month: null,
      game1Day: null,
      game1Time: null,
      game1Opp: null
    },
    scheduleGame2: {
      game2Month: null,
      game2Day: null,
      game2Time: null,
      game2Opp: null
    }
  };

  ClickHandler = event => {
    event.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  InputHandler = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  EditHandler = event => {
    event.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    let teamData = {
      name: this.state.name,
      id: this.state.id,
      coach_name: this.state.coach_name,
      coach_email: this.state.coach_email,
      coach_user_id: null,
      coach_phone: this.state.coach_phone,
      wins: this.state.wins,
      losses: this.state.losses,
      ties: this.state.ties
    };
    this.context.editTeamInLeague(teamData, this.props.index, this.state.id);
    if (this.state.ties > 0) {
      this.setState({
        containsTies: true
      });
    }
  };

  getTeamSchedule() {
    const lid = this.context.state.leagues[this.props.index].id;
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let date = year + '-' + month + '-' + day;
    let hours = today.getHours();
    let time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    let dateTime = date + 'T' + time;
    const teamSchedule = [];
    if (this.context.state.schedule_by_league.find(x => x.league_id === lid)) {
      const leagueSchedule = this.context.state.schedule_by_league.find(
        x => x.league_id === lid
      ).games;
      for (let i = 0; i < leagueSchedule.length; i++) {
        if (leagueSchedule[i].home_team_id === this.state.id) {
          teamSchedule.push(leagueSchedule[i]);
        }
        if (leagueSchedule[i].away_team_id === this.state.id) {
          teamSchedule.push(leagueSchedule[i]);
        }
      }
    }
    for (let j = 0; j < teamSchedule.length; j++) {
      if (Date.parse(teamSchedule[j].start_time) < Date.parse(today)) {
        let removedGames = teamSchedule.splice(j, 1);
      }
    }
    this.setState({
      teamSchedule
    });
  }

  displayGames() {
    let editedTeamSchedule = this.state.teamSchedule;
    const lid = this.context.state.leagues[this.props.index].id;
    editedTeamSchedule.length = 2;
    let game1Opp;
    // Opponent Testing
    if (this.context.state.teams_by_league.find(x => x.league_id === lid)) {
      const teamsInLeague = this.context.state.teams_by_league.find(
        x => x.league_id === lid
      ).teams;
      if (editedTeamSchedule[0].home_team_id !== this.state.id) {
        const OppTeamIndex = teamsInLeague.findIndex(
          x => x.id === editedTeamSchedule[0].home_team_id
        );
        game1Opp = teamsInLeague[OppTeamIndex].name;
      } else if (editedTeamSchedule[0].away_team_id !== this.state.id) {
        const OppTeamIndex = teamsInLeague.findIndex(
          x => x.id === editedTeamSchedule[0].away_team_id
        );
        game1Opp = teamsInLeague[OppTeamIndex].name;
      }
      const game1 = new Date(editedTeamSchedule[0].start_time);
      let options = { month: 'long' };
      let game1Month = new Intl.DateTimeFormat('en-US', options).format(game1);
      let game1Day = game1.getDate();
      let game1Hours = game1.getHours();
      let game1Minutes = game1.getMinutes();
      if (game1Minutes < 10) {
        game1Minutes = '0' + game1Minutes;
      }
      let game1Time = game1Hours + ':' + game1Minutes;
      if (game1Hours < 12) {
        game1Time += ' AM';
      }
      if (game1Hours > 12) {
        game1Time += ' PM';
      }

      let scheduleGame1 = {
        game1Month,
        game1Day,
        game1Time,
        game1Opp
      };
      this.setState({
        scheduleGame1
      });
    }

    let game2Opp;

    // Opponent Testing
    if (this.context.state.teams_by_league.find(x => x.league_id === lid)) {
      const teamsInLeague = this.context.state.teams_by_league.find(
        x => x.league_id === lid
      ).teams;
      if (editedTeamSchedule[1].home_team_id !== this.state.id) {
        const OppTeamIndex = teamsInLeague.findIndex(
          x => x.id === editedTeamSchedule[1].home_team_id
        );
        game2Opp = teamsInLeague[OppTeamIndex].name;
      } else if (editedTeamSchedule[1].away_team_id !== this.state.id) {
        const OppTeamIndex = teamsInLeague.findIndex(
          x => x.id === editedTeamSchedule[1].away_team_id
        );
        game2Opp = teamsInLeague[OppTeamIndex].name;
      }
      const game2 = new Date(editedTeamSchedule[1].start_time);
      let options = { month: 'long' };

      let game2Month = new Intl.DateTimeFormat('en-US', options).format(game2);
      let game2Day = game2.getDate();
      let game2Hours = game2.getHours();
      let game2Minutes = game2.getMinutes();
      if (game2Minutes < 10) {
        game2Minutes = '0' + game2Minutes;
      }
      let game2Time = game2Hours + ':' + game2Minutes;
      if (game2Hours < 12) {
        game2Time += ' AM';
      }
      if (game2Hours > 12) {
        game2Time += ' PM';
      }

      let scheduleGame2 = {
        game2Month,
        game2Day,
        game2Time,
        game2Opp
      };
      this.setState({
        scheduleGame2
      });
    }
  }

  componentDidMount = async () => {
    if (this.state.ties > 0) {
      this.setState({
        containsTies: true
      });
    }
    await this.getTeamSchedule();
    await this.displayGames();
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      id,
      coach_name,
      coach_email,
      coach_phone,
      wins,
      losses,
      ties
    } = this.state;

    //     let teamNameShort = this.state.name;
    // if(teamNameShort.length > 12) { teamNameShort = teamNameShort.substring(0,11)}
    // This will keep team name from Breaking Card styling by Showing Only first 12 characters for team Name without altering team name.
    return (
      <div>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
        >
          {/* Card only flips when EditIcon is clicked. */}
          <Card
            className={classes.cardFront}
            key="front"
            style={{ height: this.state.containsTies ? '365px' : '350px' }}
          >
            <CardContent className={classes.container}>
              <Typography className={classes.title}>
                {name}
                <EditIcon onClick={this.ClickHandler} />
              </Typography>
              <Typography className={classes.p}>
                Name: {coach_name}
                <br />
                Email: {coach_email}
                <br />
                Phone #: {coach_phone}
              </Typography>
              <Typography
                className={classes.pos}
                style={{ display: this.state.containsTies ? 'none' : 'block' }}
              >
                Record:
                <br />
                Wins: {wins}
                <br />
                Losses: {losses}
              </Typography>
              <Typography
                className={classes.pos}
                style={{ display: this.state.containsTies ? 'block' : 'none' }}
              >
                Record:
                <br />
                Wins: {wins}
                <br />
                Losses: {losses}
                <br />
                Ties: {ties}
              </Typography>
              <Typography className={classes.upcoming}>
                Upcoming:
                <br />
                {this.state.scheduleGame1.game1Month}{' '}
                {this.state.scheduleGame1.game1Day}{' '}
                {this.state.scheduleGame1.game1Time} vs{' '}
                {this.state.scheduleGame1.game1Opp}
                <br />
                {this.state.scheduleGame2.game2Month}{' '}
                {this.state.scheduleGame2.game2Day}{' '}
                {this.state.scheduleGame2.game2Time} vs{' '}
                {this.state.scheduleGame2.game2Opp}
              </Typography>
              {/* Still not quite Sure how we are going to do the upcoming games part. */}
            </CardContent>
          </Card>

          <Card className={classes.cardBack} key="back">
            <CssBaseline />
            <CardContent className={classes.container}>
              <form onSubmit={this.EditHandler}>
                <FormControl
                  margin="none"
                  required
                  fullWidth
                  className={classes.title}
                >
                  <InputLabel htmlFor="name">Team Name: {name}</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    onChange={this.InputHandler}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="none" fullWidth>
                  <InputLabel htmlFor="coach_name">
                    Coach Name: {coach_name}
                  </InputLabel>
                  <Input
                    id="coach_name"
                    name="coach_name"
                    onChange={this.InputHandler}
                  />
                </FormControl>
                <FormControl margin="none" fullWidth>
                  <InputLabel htmlFor="coach_email">
                    Coach Email: {coach_email}
                  </InputLabel>
                  <Input
                    id="coach_email"
                    name="coach_email"
                    onChange={this.InputHandler}
                  />
                </FormControl>
                <FormControl margin="none">
                  <InputLabel htmlFor="coach_phone">
                    Coach #: {coach_phone}
                  </InputLabel>
                  <Input
                    id="coach_phone"
                    name="coach_phone"
                    onChange={this.InputHandler}
                  />
                </FormControl>
                <FormControl margin="none">
                  <InputLabel htmlFor="wins">Wins: {wins}</InputLabel>
                  <Input id="wins" name="wins" onChange={this.InputHandler} />
                </FormControl>
                <FormControl margin="none">
                  <InputLabel htmlFor="losses">Losses: {losses}</InputLabel>
                  <Input
                    id="losses"
                    name="losses"
                    onChange={this.InputHandler}
                  />
                </FormControl>
                <FormControl margin="none" display="none">
                  <InputLabel htmlFor="ties">Ties: {ties}</InputLabel>
                  <Input id="ties" name="ties" onChange={this.InputHandler} />
                </FormControl>
              </form>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                className={classes.button}
                onClick={this.EditHandler}
              >
                Edit Team
              </Button>
            </CardActions>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired
};

TeamCard.contextType = AppContext;

export default withStyles(styles)(TeamCard);
