const Discord = require('discord.js');

const config = require("../../config.json");

module.exports = list = (msg, bot) => {
    const serverList = bot.guilds.array();
    serverList.sort();

    console.log(serverList.length);
    let text = "";

    for (let i = 0; i < serverList.length; i++) {text = text+ "\n" + serverList[i].id + "," + serverList[i].name;}

    msg.channel.send("Check Terminal")
        .then( () => console.log(text) )
        .catch(console.log);
}