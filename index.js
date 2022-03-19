const Discord = require('discord.js');
const bot = new Discord.Client();

/* Bring in Config File*/
const config = require("./config.json");

/* Import Bot Commands */
const help = require("./modules/commands/help");
const servers = require("./modules/commands/servers");
const list = require("./modules/commands/list");
const archive = require("./modules/commands/archive");
const archive_all = require("./modules/commands/archive_all");

bot.login(config.token)
    .then( () => console.log("Login Successful") )
    .catch(console.log);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "Your Emojis",  //The message shown
            type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    })
        .then( () => console.log("Watching Your Emojis Set") )
        .catch(console.log);
});

bot.on('message', msg => {

//Check to Make sure User is in right server
    if(msg.guild.id === config.serverID){
        //Check to see if string starts with prefix
        if(msg.content.startsWith(config.prefix)){
            //remove prefix from string to get command
            let command = msg.content.substring(1);
            switch (command){
                case 'list': list(msg, bot); break;
                case 'servers': servers(msg, bot); break;
                case 'help': help(msg, bot); break;
                case 'archive': archive(msg, bot); break;
                case 'archive all':
                case 'archive *': archive_all(msg, bot); break;
            }
        }
    }


});