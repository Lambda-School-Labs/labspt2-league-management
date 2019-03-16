const express = require('express');
const app = express();
const authRouter = require('./routers/authRouter');
const settingsRouter = require('./routers/settingsRouter');
const leagueRouter = require('./routers/leagueRouter');

const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

app.use(express.json());
app.use(cors);

const PORT = process.env.PORT || '4000';

app.use('/auth', authRouter);
app.use('/settings', settingsRouter);
app.use('/leagues', leagueRouter);

app.get('/', (req, res) => {
  res.status(200).send(`API active on port: ${PORT}`);
});

app.get('/weather', async (req, res) => {
  const axios = require('axios');
  const requestIp = require('request-ip');
  const geoip = require('geoip-lite');
  const clientIp = requestIp.getClientIp(req);
  //   console.log(clientIp);
  const geo = geoip.lookup(
    clientIp === '::1' ? '2601:443:380:5bbd:4dde:9bb0:3d2c:66d' : clientIp
  );
  //   console.log(geo);
  const latitude = geo.ll[0];
  const longitude = geo.ll[1];

  const apiKey = process.env.DS_API_KEY || null;
  axios
    .get(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`)
    .then(response => {
      res.json({
        city: geo.city,
        state: geo.region,
        weatherData: response.data
      });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = app;
