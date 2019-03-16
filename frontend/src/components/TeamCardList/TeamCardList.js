import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import TeamCard from './TeamCard.js';

const styles = theme => ({});

class TeamCardList extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    // const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            {/* //       {this.props.LeagueTeams.map(team => ( */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(team => (
              <Grid key={team} item>
                <TeamCard
                  team={team}
                  key={team.id}
                  id={team.id}
                  name={team.name}
                  email={team.coach_email}
                  phone={team.coach_phone_number}
                  wins={team.wins}
                  losses={team.losses}
                  ties={team.ties}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TeamCardList);
