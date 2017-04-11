import express from 'express'
import promisify from 'es6-promisify'
import request_cb from 'request'
const request = promisify(request_cb.post)
const get = promisify(request_cb.get)

export function translate(text, distanation) {
  return request(
    `https://translate.yandex.net//api/v1.5/tr.json/translate?`
    + `lang=${distanation}`
    + `&key=trnsl.1.1.20170326T141009Z.afd6d8e4e238cde0.83e36ba00fd16f9ba8df819f0d5a4ae4042b58df`
    + `&text=${text}`)
}

export function detected(text, hint) {
  console.log('text: ', text)
  return request(
    `https://translate.yandex.net//api/v1.5/tr.json/detect?`
    + `&key=trnsl.1.1.20170326T141009Z.afd6d8e4e238cde0.83e36ba00fd16f9ba8df819f0d5a4ae4042b58df`
    + `&text=${text}`
    + `&hint=${hint}`)
}

export function getAdvice() {
  return request('http://fucking-great-advice.ru/api/random')
}

export function sayIt(text, lang) {
  console.log('sayIt: ', text)
  console.log('sayIt: ', lang)
  return request_cb
    .get(
      `https://tts.voicetech.yandex.net/generate`
      + `?text=${encodeURIComponent(text)}`
      + `&format=mp3`
      + `&lang=${lang}`
      + `&speaker=ermil`
      // + `&emotion=good`
      + `&key=689b5e1f-d62e-45dd-9f37-b16c3c587813`
    )
    .on('response', response => {
      console.log(response.statusCode)
      console.log(response.headers['content-type'])
    })
}
