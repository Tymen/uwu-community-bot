// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');
const { customMessage } = require('../customMessage')

let getMemberCount = (client) => {
    return client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
 };
// Define Variables
const defaultColor = '#fcca03'
const defaultAuthor = 'UwU Community'
let getquotes = (sql, db) => {
    return new Promise(data => {
        db.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                data(result);

            } catch (error) {
                data({});
                throw error;
            }

        });
    });
}
// Custom messages
const quote = {
    add: (Author, client, db, args) => {
        // const quote = "]
        console.log(args)
        let quotedUser = args[0]
        if (quotedUser.startsWith('<@') && quotedUser.endsWith('>')) {
            quotedUser = quotedUser.slice(2, -1);
    
            if (quotedUser.startsWith('!')) {
                quotedUser = quotedUser.slice(1);
            }
    
            quotedUser = client.users.cache.get(quotedUser);
        }
        let quote = "testquote"
        var sql = `INSERT INTO quotes (creator_id, user_id, body) VALUES (${Author.id}, ${quotedUser.id}, '${args[1]}')`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        return customMessage.quote(client, Author.id, quotedUser.id, quote)
    },
    get: async (Author, client, db, args) => {
        let quotedUser = args[0]
        let userquotes = [];
        if (quotedUser.startsWith('<@') && quotedUser.endsWith('>')) {
            quotedUser = quotedUser.slice(2, -1);
    
            if (quotedUser.startsWith('!')) {
                quotedUser = quotedUser.slice(1);
            }
        }
        quotedUser = client.users.cache.get(quotedUser);
        var sql = `SELECT * FROM quotes WHERE user_id='${quotedUser.id}'`;
        let quotes = await getquotes(sql, db);
        Object.entries(quotes).forEach(entry => {
            const [key, value] = entry;
            userquotes.push({ name: '\u200B', value: value.body, inline: true });
        });
        let getMessage = customMessage.quoteList(client, quotedUser, userquotes);
        console.log(getMessage);
        return getMessage;
    },
}

module.exports = { quote }