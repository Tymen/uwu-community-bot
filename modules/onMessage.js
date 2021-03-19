// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();
const { customMessage } = require('./customMessage')
const { quote } = require('./commands/quotes')

// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
// <=========> Message Handler <=========> //
const EventResponse = (message, client, db) => {
    if (!message.author.bot && message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        switch(command) {
            case 'welcome':
                client.channels.cache.find(channel => channel.id === process.env.WELCOME_ID).send(customMessage.welcomeMessage(message.author, client))
                break;
            case 'help':
                reply(message, customMessage.help())
                break;
            case 'test':
                reply(message, customMessage.test())
                break;
            case 'addquote':
                reply(message, quote.add(message.author, client, db, args))
                break;
            case 'getquote':
                reply(message, quote.get(message.author, client, db, args))
                break;
        }
    }
    console.log(message.author.username + ": " + message.content)
}

// <=========> Export Module <=========> //
module.exports = { EventResponse }