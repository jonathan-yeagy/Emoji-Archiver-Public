const Discord = require('discord.js');

const config = require("../../config.json");

module.exports = list = (msg, bot) => {
    const serverList = bot.guilds.array();
    serverList.sort();

    console.log(serverList.length);
    let text = "";

    for (let i = 0; i < serverList.length; i++) {text = text+ "\n" + serverList[i].name;}

    const embed = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Archiving in " + serverList.length + " servers!")
        .setAuthor( "Emoji Archiver", bot.user.avatarURL)
        .setColor(config.color)
        .setDescription(text)
        .setFooter("Thank you for using the emoji archiver", bot.user.avatarURL)
        .setTimestamp()

    msg.channel.send({embed})
        .then( () => console.log("Message:", "Listing Servers") )
        .catch(console.log);
}