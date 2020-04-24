const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

export const sendTextMessage = (request) => {
    if (request.action.type !== "commentCard") {
        return;
    }

    const sms = request.action.data.text;

    // When we put the customer's SMS on the card via API call, we don't want to accidentally
    // send that message back to the customer.
    if (sms.startsWith('Message from customer:')) {
        return;
    }

    const toNumber = `+${request.action.data.card.name}`;

    client.messages
        .create({
            body: sms,
            from: fromNumber,
            to: toNumber,
        })
        .then(message => console.log('Message sent!', sms));
}