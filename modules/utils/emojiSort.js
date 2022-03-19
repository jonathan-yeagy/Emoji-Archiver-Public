const got = require('got');

module.exports = emojiSort = (emojiTally, emoji, filename) => {
    const emojiLink = "https://cdn.discordapp.com/emojis/";
    let type;
    emojiTally.total++;
    if (emoji.animated === true){type = ".gif"; emojiTally.animated++;}
    else if (emoji.animated === false){type = ".png"; emojiTally.normal++ ;}
    else console.error();

    return {
        folder: filename,
        name: emoji.name + type,
        stream: got.stream.get(emojiLink + emoji.id + type)
    };
};