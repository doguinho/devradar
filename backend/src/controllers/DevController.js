const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')

//TODO: index,show,update,delete

module.exports = {

    async index(req,res) {

        const devs = await Dev.find()

        return res.json(devs)

    },

    async store(req,res) {

        const { github_username, techs, latitude, longitude } = req.body

        const respostaGit = await axios.get(`https://api.github.com/users/${github_username}`)


        let dev = await Dev.findOne({github_username})

        if (dev != null) {
            return res.json({"msg":"Já existe um dev com esse nome"})
        }

        const { name = login, avatar_url, bio } = respostaGit.data

        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        
        

        return res.json(dev)

    }

}

