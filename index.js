require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL, PORT } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

const reverseText = (text) => {
  return text.split("").reverse().join("");
};
app.post(URI, async (req, res) => {
  console.log(req.body);

  let chatId = req.body.message.chat.id;
  let text = req.body.message.text;
  console.log(text);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: reverseText(text)
  });
  res.send();
});

app.listen(process.env.PORT || 8080, async () => {
  await init();
});
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL, PORT } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

const reverseText = (text) => {
  return text.split("").reverse().join("");
};
app.post(URI, async (req, res) => {
  console.log(req.body);

  let chatId = req.body.message.chat.id;
  let text = req.body.message.text;
  console.log(text);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: reverseText(text)
  });
  res.send();
});

app.listen(process.env.PORT || 8080, async () => {
  await init();
});
