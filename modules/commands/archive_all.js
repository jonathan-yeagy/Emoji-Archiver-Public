const Stream = require('stream');
const archiver = require('archiver');
const Discord = require('discord.js');

const config = require("../../config.json");

const upload = require("../utils/google");
const date = require("../utils/date");
const emojiSort = require("../utils/emojiSort");
const sendEmbed = require("../utils/sendEmbed");

/* Establish Transform Stream */

// 2560000000 bytes = 100 emojis in 100 servers maximum
const transformStream = new Stream.Transform({ readableHighWaterMark: 2560 * 1000 * 1000 });

transformStream._transform = function (chunk,encoding,done){
    this.push(chunk);
    done();
}

module.exports = archive_all = (msg, bot) => {
    const serverList = bot.guilds.array();
    const filename = "archive_" + date() + ".zip"
    let emojiTally = {animated: 0, normal: 0, total: 0};

    msg.channel.send("Processing").then(console.log("Processing")).catch(console.log);

    Promise
        // Wait for all the connections to open
        .all( serverList.map( server => {
            const emojiList = server.emojis.map(e => e);
            const filename = server.name.replace(/[^a-zA-Z0-9]/g,'_')+"_"+date();
            return Promise
                // Wait for all the connections to open
                .all(emojiList.map(emoji => { return emojiSort(emojiTally, emoji, filename)}))
                .catch(console.log);
        }) )
        /*End All*/
        .then( results => {
            console.log("Creating File");

            // Add to archive
            const archive = archiver('zip', {});
            archive.pipe(transformStream);

            return Promise
                .all(results.map(server => server.map(result => archive.append(result.stream, {name: "/"+ result.folder + "/" + result.name})) ))
                .then(() => archive.finalize())
                .then(() => transformStream)
                .catch(console.log);
        })
        .then( () =>  upload.read(transformStream, filename) )
        .then( file_id => {
            console.log("Upload complete!", "https://drive.google.com/open?id=" + file_id);

            const embed = new Discord.RichEmbed()
                .setThumbnail(bot.user.avatarURL)
                .setTitle("Emoji Archiver Complete")
                .setAuthor( "Emoji Archiver", bot.user.avatarURL)
                .setColor(config.color)
                .setDescription('Here is your emoji archive for  all **' + serverList.length + '** discord servers! ' + 'You have **' + emojiTally.total + '** archived emojis from all your servers.' + ' **' + emojiTally.normal + '** static emojis and **' + emojiTally.animated + '** animated emojis!')
                .setFooter("Thank you for using the emoji archiver", bot.user.avatarURL)
                .setTimestamp()
                .setURL("https://drive.google.com/open?id=" + file_id)
                .addField('Servers', serverList.length, false)
                .addField('Total', emojiTally.total, true)
                .addField('Static', emojiTally.normal, true)
                .addField('Animated', emojiTally.animated, true)

            sendEmbed(msg, embed);
        })
        .catch(console.log);
}