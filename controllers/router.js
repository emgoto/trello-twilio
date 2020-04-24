import { findCardId, createCard, attachWebHook, addComment } from '../js/trello';
import { sendTextMessage } from '../js/twilio';

module.exports = function(router) {
  router.post('/sms', async (req, res) => {
    const sms = req.body.Body;
    const number = req.body.From.replace(/\+/g, "")

    let cardId = await findCardId(number);
    if (!cardId) {
      cardId = await createCard(number);
      await attachWebHook(cardId);
    }

    await addComment(cardId, sms);
    res.send('Successfully responded to sms');
  });

  router.get('/response', (req, res) => {
    // Required to get Trello webhook set up successfully
    res.sendStatus(200);
  });

  router.post('/response', async (req, res) => {
    sendTextMessage(req.body);
    res.end('Successfully responded to response POST');
  });

};
