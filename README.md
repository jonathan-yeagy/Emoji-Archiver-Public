# Emoji Archiver
Emoji Archiver is a Node.js Discord bot used to help archive custom emojis that I've created on Discord.

## Technologies Used
 - Node.js 14.14.28
### Node Dependencies
- archiver 5.2.0
- discord.js 11.5.1
- fs 0.0.1-security
- googleapis 39.2.0
- got 11.8.1

## Getting Started

**Entrypoint:** index.js

> **Note:** This project requires you to create a project on the Discord Developer Portal as well as with Google APIs to access Discord and Google Drive.

### How it works

This bot streams files from Discord to Google Drive archiving them in a zipped file. It then posts a message on discord once it's been completed. 
## Context

### Why Create this?
I created this because I have over 60 Discord servers with the explicit purpose of hoarding (over 3000) emojis. sometimes, this requires me to merge, reorganize, or split where emojis are on Discord servers to better keep them organized as our need change over time. this bot allows me to mass download each emoji in the respective server folder allowing me to maintain backup in case an emoji is accidentally erased.

> **Note:** I also enjoy creating Discord bots in Node.js

### Why Create Emojis
I create emojis because I enjoy having a bunch of little icons that replace words in Discord. It's very satisfying to me. I joke that this endeavor won't be complete until I can communicate in emojiglyphics (hieroglyphics but with emojis).

I also enjoy using my skills with GIMP and Inkscape to create emojis, and find graphic design to be an enjoyable and relaxing task.

There's even been instances where I've been able to run some JavaScript in order to download emojis in mass (other than this project).