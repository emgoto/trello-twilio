import fetch from 'node-fetch';

const trelloKey = process.env.TRELLO_KEY;
const trelloAuth = process.env.TRELLO_AUTH_TOKEN;
const trelloBoard = process.env.TRELLO_BOARD;
const serverURL = process.env.SERVER_URL;

const TRELLO_API = 'https://api.trello.com/1';

/**
 * Find card ID with a name that matches the given phone number, or return null.
 */
export const findCardId = async (phoneNumber) => {
    const url = `${TRELLO_API}/board/${trelloBoard}/cards?key=${trelloKey}&token=${trelloAuth}`;
    const result = await fetch(url);
    const cardsResult = await result.json();

    let cardId = null;

    cardsResult.forEach((card) => {
        if (card.name === phoneNumber) {
            cardId = card.id;
        }
    });

    return cardId;
}

/**
 * Create a new card with the name equalling the given phone number, and return its ID.
 */
export const createCard = async (phoneNumber) => {
    const listUrl = `${TRELLO_API}/board/${trelloBoard}/lists?key=${trelloKey}&token=${trelloAuth}`;
    const result = await fetch(listUrl);
    const listResult = await result.json();

    if (listResult.length === 0) {
        throw Error("Your Trello board should have at least one list");
    }

    const listId = listResult[0].id;

    const url = `${TRELLO_API}/cards?key=${trelloKey}&token=${trelloAuth}&name=${phoneNumber}&idList=${listId}`;
    const cardResult = await fetch(url, { method: 'post' });
    const createdCard = await cardResult.json();

    return createdCard.id;
};

/**
 * Attach Trello webhook to given cardId
 */
export const attachWebHook = (cardId) => {
    const url = `${TRELLO_API}/webhooks?token=${trelloAuth}&key=${trelloKey}`;

    return fetch(url, { 
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: "Webhook for card comments",
            callbackURL: `${serverURL}/response`,
            idModel: cardId
        })
    }).then(response => {
        if (response && response.status && response.status === 400) {
            console.log("Trello webhook failed to attach on card creation. Is your serverURL env variable correct?")
        }
    });
};

/**
 * Add comment to Trello card
 */
export const addComment = (cardId, text) => {
    const url = `${TRELLO_API}/cards/${cardId}/actions/comments?text=Message from customer: \n\n ${text}&key=${trelloKey}&token=${trelloAuth}`;

    return fetch(url, {
        method: 'post',
    });
}