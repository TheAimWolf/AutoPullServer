const express = require('express');
const exec = require('child_process').exec;
const app = express();
require('dotenv').config();
const axios = require('axios');
const serverPath = process.env.PATH_TO_SERVER;
const port = process.env.PORT || 3000;
const webPath = process.env.WEB_PATH || 'webhook';
const discordWebook = process.env.DC_WEBHOOK;

function pullServer() {
    exec(`cd ${serverPath} && git pull`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`exec error: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        sendDiscordLog(stdout)
    });
}

function sendDiscordLog(pMessage) {
    const embed = {
        title: "GitHub Update",
        description: `Neuer Push auf GitHub: ${pMessage}`,
        color: 3447003,
        timestamp: new Date(),
        footer: {
            text: "GitHub Integration by AimWolf"
        },
        author: {
            name: "GitHub",
            url: "https://github.com",
            icon_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        },
    };

    const message = {
        content: "Update on GitHub Repository",
        embeds: [embed]
    };

    axios.post(discordWebook, message)
        .then(response => {
            console.log('Discord Webhook send: ', response.data);
        })
        .catch(error => {
            console.error('Error while sending embeded: ', error);
        });
}

app.post(`/${webPath}`, (req, res) => {
    pullServer();
    res.status(200).send('Updated');
});

app.listen(port, () => {
    console.log('Testing path');
    pullServer();
    console.log('Server listening on port 3000');
});