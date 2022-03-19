/* Import Node Modules */
const Stream = require('stream');
const archiver = require('archiver');
const Discord = require('discord.js');

/* Get Info From config.json */
const config = require("../../config.json");

/* Import Custom Modules */
const upload = require("../utils/google");
const date = require("../utils/date");
const emojiSort = require("../utils/emojiSort");
const sendEmbed = require("../utils/sendEmbed");

/* Establish Transform Stream */
const transformStream = new Stream.Transform();

transformStream._transform = function (chunk,encoding,done){
    this.push(chunk)
    done()
}

/* Exported Module for index.js */
module.exports = archive = (msg, bot) => {
    const emojiList = msg.guild.emojis.map(e => e);
    const filename = msg.guild.name.replace(/[^a-zA-Z0-9]/g,'_')+"_"+ date() + ".zip";

    let emojiTally = {animated: 0, normal: 0, total: 0};

    msg.channel.send("Processing").then(console.log("Processing")).catch(console.log);

    Promise
        // Wait for all the connections to open
        .all(emojiList.map(emoji => { return emojiSort(emojiTally, emoji, filename)}))
        // For each connection
        .then(results => {
            // Add to archive
            const archive = archiver('zip', {});
            archive.pipe(transformStream);
            return Promise
                .all(results.map(result => archive.append(result.stream, {name: result.name})))
                .then(() => archive.finalize())
                .then(() => transformStream)
                .catch(console.log);
        })
        .then( () =>  upload.read(transformStream, filename) )
        .then( file_id => {
            console.log("Upload complete!", "https://drive.google.com/open?id=" + file_id);

            const embed = new Discord.RichEmbed()
                .setThumbnail(msg.guild.iconURL)
                .setTitle(msg.guild.name)
                .setAuthor( "Emoji Archiver", bot.user.avatarURL)
                .setColor(config.color)
                .setDescription('Here is your emoji archive for **' + msg.guild.name + '**! You have **' + emojiTally.total + '** archived emojis from this server. **' + emojiTally.normal + "** static emojis and **" + emojiTally.animated + "** animated emojis!")
                .setFooter("Thank you for using the emoji archiver", bot.user.avatarURL)
                .setTimestamp()
                .setURL("https://drive.google.com/open?id=" + file_id)
                .addField('Total', emojiTally.total, true)
                .addField('Static', emojiTally.normal, true)
                .addField('Animated', emojiTally.animated, true)

            sendEmbed(msg, embed);
        })
        .catch(console.log);
}