import promisify from 'es6-promisify'
import TelegramBot from 'node-telegram-bot-api'
import { translate } from './index.js'
import { detected } from './index.js'

const token = '339608802:AAFewFYiBYoWyzmDLSYfToqOcAcda_hoviQ'
const bot = new TelegramBot(token, { polling: true })
// const bot = promisify(bot_cb.onText)
// Matches "/echo [whatever]"
// \/echo
bot.onText(/(.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id
  // console.log(msg)
  var resp = match[1] // the captured "whatever"
  // console.log('>>', translate(match[1]))
  detected(encodeURIComponent(match[1]), 'ru,en')
  .then(response => {
    console.log('<><><><><><><>\n', JSON.parse(response.body).lang, '\n<><><>><>><')
    const lang = JSON.parse(response.body).lang
    const dist = lang == 'ru' ? 'en' : 'ru'
    console.log('dist;    ', dist)
    translate(encodeURIComponent(match[1]), dist)
    .then(response => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n', JSON.parse(response.body).text, '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      bot.sendMessage(chatId, JSON.parse(response.body).text[0])
    })
  })
  .catch(err => console.log(err))

  // send back the matched "whatever" to the chat
  // bot.sendMessage(chatId, match[1])
})
