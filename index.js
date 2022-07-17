require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const memes = require("random-memes");

const { TOKEN, SERVER_URL, PORT } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
};

app.post(URI, async (req, res) => {
  let chatId = req.body.message.chat.id;
  //let text = req.body.message.text;
  let meme = await memes.random();

  await axios.post(`${TELEGRAM_API}/sendPhoto`, {
    chat_id: chatId,
    photo: meme.image,
    caption: meme.caption
  });
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: 788243822,
    text: "meme sent"
  });
  // Notify the API that the message was recieved
  res.send();
});

//listen for webhook notifications
app.listen(process.env.PORT || 8080, async () => {
  await init();
});

// Old functionality to reverse text
/*const reverseText = (text) => {
  return text.split("").reverse().join("");
};*/
