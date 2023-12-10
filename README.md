# AutopullServer
Simple way to auto sync git changes to your server.

## How to install
- Make sure you habe node installed (Tested on node v16.20.2)
- clone the repo or download it to your server
- Update .env file with the absolute path to your local git repo on the server
- Update .env file with a port and url you like
- run `npm i` and npm `run test` from the command line (the server will pull on start)
- go to github.com and open your repo. Then under setting/webhooks you can create a new webhook. Enter your server domain with the port and path you specified. Select on which actions the webhook should be called.
- You are ready to go. Test it by pushing something to any branch, and the server should auto sync

  If you need help or support feel free to open and issue.
