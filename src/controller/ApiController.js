const mongoose = require('mongoose');
const Player = require('../models/Player');
 
module.exports = {
    addScore: async(req, res) => {
        const nick = req.params.nick;
        const newScore = req.params.score;
        //pegando valor do nick e do score via params da url
 
        let player = await Player.findOne({nick}); //busca o player pelo nick
        if(!player) { //se nao achar o player entao cria na base de dados
           player = await Player.create({nick, score: newScore}) //cria novo player
        }
 
        const scoreAtual = player.score;
        if(newScore > scoreAtual) {//alterar o score pois new score eh maior que score atual
            const updatePlayer = await Player.findByIdAndUpdate(player.id, {score: newScore});
        }
        //gerar o ranking
        const geraRanking = await Player.aggregate([{
            $setWindowFields: {
                sortBy: {score: -1},
                output: {
                    ranking: {
                        $rank: {}
                    }
                }
            }
        }]);
        geraRanking.map(async (player) => {
            await Player.updateOne({_id: player._id}, {ranking: player.ranking }).exec();
        });
        const returnPlayer = await Player.findOne({nick}).exec();
        res.status(200).json(returnPlayer);
    },
    
    ranking: async (req, res) => {
        const rankingList = await Player.find({ ranking: { $gt: 0, $ne: 0 } })
          .sort({ ranking: 1 })
          .select({
            ranking: 1,
            nick: 1,
            score: 1,
            _id: 0,
          })
          .exec();
        if (!rankingList) {
          res.json({ error: "Erro ao realizar consulta" });
          return;
        }
        res.status(200).json(rankingList);
    },

    highScore: async (req, res) => {
        const player = await Player.findOne({ ranking: 1 })
          .select({ nick: 1, ranking: 1, score: 1, _id: 0 })
          .exec();
        if (!player) {
          res.json(null);
          return;
        }
        res.json( player );
    },

    
}