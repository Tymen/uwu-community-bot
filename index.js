// <=========> Define Variables, Modules <=========> //

// Discord imports
const Discord = require('discord.js');
const client = new Discord.Client();

// Module imports
require('dotenv').config();
const { EventResponse } = require('./modules/onMessage')
var mysql = require('mysql');

// Define Variable
const { customMessage } = require('./modules/customMessage')
const welcome = client.channels.cache.get(process.env.WELCOME_ID)

// <=========> DB Connection <=========> //

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected! to the DB");
  });

// <=========> Status Message <=========> //

client.once('ready', () => {
    console.log("Bot is online!")
})

// <=========> Listen for messages <=========> //

client.on('message', message => {
    EventResponse(message, client, db);
})
client.stat
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(channel => channel.id === welcome).send(customMessage.welcomeMessage(member.user, client))
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.find(channel => channel.id === welcome).send(customMessage.leaveMessage(member.user, client))
})
//
// <=========> Login to the discord bot client <=========> //
client.login(process.env.BOT_TOKEN)