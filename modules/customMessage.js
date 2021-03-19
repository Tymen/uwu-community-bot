// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');

let getMemberCount = (client) => {
    return client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
 };
// Define Variables
const defaultColor = '#fcca03'
const defaultAuthor = 'UwU Community'

// Custom messages
const customMessage = {
    welcomeMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author.username + ", Welcome to " + defaultAuthor)
        .setAuthor(defaultAuthor)
        .setDescription("You are member: " + getMemberCount(client))
        .setThumbnail(Author.avatarURL())
    },
    leaveMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author.username + ' left us!')
        .setAuthor(defaultAuthor)
        .setDescription(defaultAuthor + " has now " + getMemberCount(client) + " members")
        .setThumbnail(Author.avatarURL())
    },
    help: () => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle('UwU Community command list')
        .setAuthor(defaultAuthor)
        .addFields(
            { name: '\u200B', value: 'uwu help', inline: true },
            { name: '\u200B', value: '=>', inline: true },
            { name: '\u200B', value: 'Overview of the commands', inline: true },
            { name: '\u200B', value: 'uwu addquote quoteduser quote', inline: true },
            { name: '\u200B', value: '=>', inline: true },
            { name: '\u200B', value: 'quote someone', inline: true },
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/818475273112518699/822465477531402250/f9cad67e-9fb3-483c-afdb-c4e4dafc4eda.jpg")
    },

    test: () => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle("UwU")
        .setAuthor("This is a test!")
        .setThumbnail("https://cdn.discordapp.com/attachments/818475273112518699/822435479835508746/download_1.png")
    },
    quote: (client, author, quotedUser, quote) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setAuthor(client.users.cache.get(quotedUser).username)
        .setTitle(`"${quote}"`)
        .setDescription("Quoted by " + client.users.cache.get(author).username)
        .setThumbnail(client.users.cache.get(quotedUser).displayAvatarURL({ dynamic: true }))
    },
    quoteList: (client, quotedUser, quotes) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setAuthor(client.users.cache.get(quotedUser).username)
        .addFields(quotes)
        .setThumbnail(client.users.cache.get(quotedUser).displayAvatarURL({ dynamic: true }))
    }
}

module.exports = { customMessage }