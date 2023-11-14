const express = require('express');
const ApiController = require('../controller/ApiController');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('<h1>API RankKing</h1>')
});

routes.get('/ping', (req, res) => {
    res.json({pong: true})
});

routes.get('/addscore/:nick/:score', ApiController.addScore);
routes.get('/ranking', ApiController.ranking);
routes.get('/highscore', ApiController.highScore)


module.exports = routes;