'use strict';

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _index = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = '339608802:AAFewFYiBYoWyzmDLSYfToqOcAcda_hoviQ';
var bot = new _nodeTelegramBotApi2.default(token, { polling: true });
// const bot = promisify(bot_cb.onText)
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  // console.log(msg)
  var resp = match[1]; // the captured "whatever"
  console.log('>>', (0, _index.translate)(match[1]));
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, match[1]);
});