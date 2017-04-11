import promisify from 'es6-promisify'
import TelegramBot from 'node-telegram-bot-api'
import { translate } from './index.js'
import { detected } from './index.js'
import { getAdvice, sayIt } from './index.js'
import request from 'request'

const token = '339608802:AAFewFYiBYoWyzmDLSYfToqOcAcda_hoviQ'
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/t(?:@ya_translater_bot)? (.+)/, function (msg, match) {
  const chatId = msg.chat.id
  const resp = match[1]
  detected(encodeURIComponent(match[1]), 'ru,en')
  .then(response => {
    const lang = JSON.parse(response.body).lang
    const dist = lang == 'ru' ? 'en' : 'ru'
    translate(encodeURIComponent(match[1]), dist)
    .then(response => {
      bot.sendMessage(chatId, JSON.parse(response.body).text[0])
    })
  })
  .catch(err => console.log(err))
})

bot.onText(/\/fuck(?:@ya_translater_bot)?.*/, function (msg, match) {
  const chatId = msg.chat.id
  getAdvice()
  .then(response => {
    console.log(response.body)
    bot.sendMessage(chatId, decodeURIComponent(JSON.parse(response.body).text).replace('&nbsp;', ' '), { parse_mode: 'HTML' })
  })
  .catch(err => console.log(err))
})

bot.onText(/\/sayit(?:@ya_translater_bot)?(.*)/, function (msg, match) {
  detected(encodeURIComponent(match[1]), 'ru,en')
  .then(response => {
    console.log(JSON.parse(response.body).lang)
    const detectedLang = JSON.parse(response.body).lang
    const chatId = msg.chat.id
    const msgId = msg.message_id
    console.log(msgId)
    const helper = (array, lang) => {
      let res = array[0]
      array.forEach(str => {
        if (str.indexOf(lang) >= 0) {
          res = str
        }
      })
      return res
    }

    const speakerLang = helper(['ru-RU', 'en-US', 'uk-UK', 'tr-TR'], detectedLang)
    const stream = sayIt(match[1], speakerLang)
    bot.sendVoice(chatId, stream, {reply_to_message_id: msgId})
  })
  .catch(err => console.log(err))
})
