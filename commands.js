const fs = require('fs');

const config = require('./config');
const utils = require('./utils');

// list of all public clips, it's in global scope cause multiple files need em
const clips = [
    'hi',
    'gay',
    'earwigs',
    'apes',
]

const sendHelpMenu = message => {
    
    const clipsList = clips
        .map(clip => {
            return '   **' + clip + '**'
        })
        .join('\n')
    
    const helpMenu =
        `type **!troy** followed by any of the following commands:
      >>> 
      **help** - reopen this menu
      **random** - play a random clip
      \n All of the following play specific clips: \n` + clipsList
    
    message.channel.send(helpMenu)
    message.channel.send(
        `\n\n_Example_ \n \`!troy hi\``
    )
}

const playRandomClip = message => {
    utils.play(message, clips[Math.floor(Math.random() * clips.length)]);
}


module.exports = {
    sendHelpMenu,
    playRandomClip,
};
