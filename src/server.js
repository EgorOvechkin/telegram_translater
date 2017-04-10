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
    console.log('<><><><><><><>\n', JSON.parse(response.body).lang, '\n<><><>><>><')
    const lang = JSON.parse(response.body).lang
    const dist = lang == 'ru' ? 'en' : 'ru'
    console.log('dist;    ', dist)
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
  console.log(']]]]]]]]]][[[[[[[]]]]]][[[[')
  const chatId = msg.chat.id
  // sayIt(match[1])
  const stream = request
  .get(`https://tts.voicetech.yandex.net/generate?text=Hello&format=mp3&lang=en-US&speaker=oksana&emotion=good&key=689b5e1f-d62e-45dd-9f37-b16c3c587813`)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  bot.sendAudio(chatId, stream)

  // .pipe(bot.sendAudio(chatId, 'doodle.png'))
    // .then(response => console.lo)
    // .then(response => {
    //   // console.log('>>>>>>>>>>\n' + JSON.stringify(response) + '\n<<<<<<<<<<<<')
    //   // const stream = response.pipe()
    //   // console.log(stream)
    //   bot.sendAudio(chatId, response.pipe())
    // })
    // .catch(err => console.log(err))
  // console.log
  // bot.getChat(chatId)
  // getAdvice()
  // .then(response => {
  //   console.log(response.body)
  //   bot.sendMessage(chatId, decodeURIComponent(JSON.parse(response.body).text).replace('&nbsp;', ' '), { parse_mode: 'HTML' })
  // })
})

// bot.onText(/.*/, function (msg, match) {
//   const chatId = msg.chat.id
//   console.log('>>>>>>>\n', msg, '\n<<<<<<<<<')
  // bot.getChat(chatId)
  //   .then(chat => console.log('>>>>>>>>>>\n' + JSON.stringify(chat) + '\n<<<<<<<<<<<<'))
  //   .catch(err => console.log(err))
  // getAdvice()
  // .then(response => {
  //   console.log(response.body)
  //   bot.sendMessage(chatId, decodeURIComponent(JSON.parse(response.body).text).replace('&nbsp;', ' '), { parse_mode: 'HTML' })
  // })
// })
