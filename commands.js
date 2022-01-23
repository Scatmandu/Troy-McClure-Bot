const fs = require('fs');

const config = require('./config');
const utils = require('./utils');

// list of all public clips, it's in global scope cause multiple files need em
const clips = [
    'areugay',
    'earwigsew',
    'planetoftheheaps',
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
      **cleanup** - remove any posts from the bot and any calls to it within the last 100 messages
      \n All of the following play specific clips: \n` + clipsList
    
    message.channel.send(helpMenu)
    message.channel.send(
        `\n\n_Example_ \n \`!troy areugay\``
    )
}

const playRandomClip = message => {
    utils.play(message, clips[Math.floor(Math.random() * clips.length)]);
}

const cleanup = message => {
    message.channel.messages.fetch({ limit: 100, before: message.id })
    .then(messages => {
        messages.each(oldMessage => {
            let messageMadeByBot = oldMessage.author.id === message.guild.me.id;
            let messageMeantForBot = oldMessage.content.includes(config.prefix);

            if (messageMadeByBot || messageMeantForBot) {
                utils.deleteMessage(oldMessage);
            }
        })
        utils.deleteMessage(message);

    }).catch(console.error);
}

module.exports = {
    sendHelpMenu,
    playRandomClip,
    cleanup
};
