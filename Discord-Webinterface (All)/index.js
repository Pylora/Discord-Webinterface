require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = 3000;

// Discord Bot Client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

// Web Interface Endpoint to Send Message
app.get('/send', async (req, res) => {
    const channelID = req.query.channelID;
    const message = req.query.message;

    if (channelID && message) {
        try {
            const channel = await client.channels.fetch(channelID);
            await channel.send(message);
            res.send('Message sent!');
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    } else {
        res.status(400).send('Please provide channelID and message parameters');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
