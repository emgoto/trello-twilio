# Trello + Twilio
This Trello + Twilio integration will allow you to manage your SMS communications via a Trello board.

## Local development
### Setting up your Twilio number to receive messages
Make sure you have installed Twilio's CLI and have logged in:
```
npm install -g twilio-cli
twilio login
```

You'll need to provision a new Twilio number in the [Manage Numbers page](https://www.twilio.com/user/account/phone-numbers/incoming) under your account.

Configure your Twilio phone number to call the webhook URL whenever a new message comes in:
```
twilio phone-numbers:update "+15017122661" --sms-url="http://localhost:3000/sms"
```

This will give you an ngrok URL - keep note of it as we will need it in the next section.

### Setup your .env file

Open `.env.example` at the root of the project and save the file as `.env`. You'll need to fill out all six values.

You can get your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` values from your [Twilio console](https://www.twilio.com/console).

The `TWILIO_NUMBER` variable should be the same as the one you setup above for your Twilio webhook. The phone number should be in [E.164 format](https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers).

For `TRELLO_KEY`, log into your Trello account and go to Trello's [Developer API Keys](https://trello.com/app-key/) page.

For `TRELLO_AUTH_TOKEN` you can generate a token using the "manually generate a Token" link on the page linked above. Make sure not to share this token with anyone else!

For `TRELLO_BOARD`, please input the ID of Trello board that you want this integration to run on. To get this ID, visit your Trello board and add `.json` to the end of the URL e.g. https://trello.com/b/12345/board-name.json. Make sure your board has at least one list.

For `SERVER_URL`, enter the ngrok URL you received previously when you ran the `twilio` command.

Run `source .env` to export the environment variables.

### Running the app locally

For first-time use, make sure you have run `npm install`. 

Then, to launch the application, run `node -r esm . `. This should start up your app at `http://localhost:3000`.

### Have fun!
Now when your Twilio number is messaged, this will generate a new card on your Trello board and leave a comment in the first list on the board.

### References
Initial code taken from [server-notifications-node](https://github.com/TwilioDevEd/server-notifications-node).