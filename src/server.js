import promisify from 'es6-promisify'
import TelegramBot from 'node-telegram-bot-api'
import { translate } from './index.js'

const token = '339608802:AAFewFYiBYoWyzmDLSYfToqOcAcda_hoviQ'
const bot = new TelegramBot(token, { polling: true })
// const bot = promisify(bot_cb.onText)
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id
  // console.log(msg)
  var resp = match[1] // the captured "whatever"
  console.log('>>', translate(match[1]))
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, match[1])
})
