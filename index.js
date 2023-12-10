const express = require('express');
const exec = require('child_process').exec;
const app = express();
require('dotenv').config();
const serverPath = process.env.PATH_TO_SERVER;
const port = process.env.PORT || 3000;
const webPath = process.env.WEB_PATH || 'webhook';

function pullServer() {
    exec(`cd ${serverPath} && git pull`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`exec error: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
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