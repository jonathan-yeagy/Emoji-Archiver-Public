
module.exports = sendEmbed = (msg, embed) => {
    return msg.channel.send({embed})
        .catch(console.log);
};