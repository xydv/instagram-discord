require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const fetch = require('cross-fetch');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
// If Client Gets Ready
client.once('ready', () => {
    console.log('Ready!');
    // Add A Activity
    client.user.setActivity("Reels 😂", { type: 'WATCHING' });
});
// New Message
client.on('messageCreate', async (message) => {
    // If Not A Bot
    if (!message.author.bot) {
        if (message.content.startsWith("!ig")) {
            let splited = message.content.split(" ");
            let username = splited[1];
            let url = `https://instapi.deta.dev/${username}`;
            let fetching = await fetch(url);
            let response = await fetching.json()
            let IEMBED = new MessageEmbed()
                .setColor("#e95950")
                .setTitle(response.name)
                .setURL(`https://instagram.com/${username}`)
                .setDescription(response.bio)
                .addFields(
                    { name: `Username`, value: `\`${response.username}\`` },
                    { name: `Posts`, value: `\`${response.posts}\``, inline: true },
                    { name: `Followers`, value: `\`${response.followers}\``, inline: true },
                    { name: `Following`, value: `\`${response.following}\``, inline: true },
                )
                .setTimestamp(Number(response.timestamp));
            message.channel.send({ embeds: [IEMBED] });
        }
    }
})
// Login
client.login(process.env.BOT_TOKEN);