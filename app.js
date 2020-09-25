//Module
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const config = require("./config.json");
    const jimp = require('jimp');

//Start Bot
    client.on("ready", () => {
        console.log("Aisha Está pronta para dizer Bem vindo")
    })

//Catch Command

    client.on("guildMemberAdd", async member => {

        const channaldefaul = member.guild.systemChannelID
        let canal = client.channels.cache.get(channaldefaul)
        let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
        let mask = await jimp.read('./mask/mascara.png')
        let fundo = await jimp.read('./mask/fundo.png')

        const URL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`
        jimp.read(URL).then(avatar => {

            avatar.resize(110, 110)
            mask.resize(110, 110)
            avatar.mask(mask)
            fundo.print(fonte, 120, 220, member.user.username)
            fundo.composite(avatar, 142, 100).write('bemvindo.png')
            canal.send(``, { 
                files: ["bemvindo.png"] 
            })
    
        }).catch(err => {
            console.log('error avatar: '+err)
        })

    })

//Token Acess
    client.login(config.token);