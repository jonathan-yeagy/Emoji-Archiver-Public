const Discord = require('discord.js');

const config = require("../../config.json");

module.exports = help = (msg, bot) => {
    const embed = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setTitle("You asked For help!")
        .setAuthor( "Emoji Archiver", bot.user.avatarURL)
        .setColor(config.color)
        .setDescription("Good Luck with that!")
        .setFooter("Thank you for using the emoji archiver", bot.user.avatarURL)
        .setTimestamp()

    msg.channel.send({embed})
        .then( () => console.log("Message:", "Good Luck with that!") )
        .catch(console.log);
}