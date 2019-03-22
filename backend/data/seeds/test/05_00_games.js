exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('game').insert([
        { league_id: 1, home_team_id: 1, away_team_id: 2 },
        { league_id: 2, home_team_id: 3, away_team_id: 4 }
      ]);
    });
};
