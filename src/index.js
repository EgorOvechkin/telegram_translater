import express from 'express'
import promisify from 'es6-promisify'
import request_cb from 'request'
const request = promisify(request_cb.post)

const app = express()

export function translate(text, distanation) {
  // let result = {}
  return request(
    `https://translate.yandex.net//api/v1.5/tr.json/translate?`
    + `lang=${distanation}`
    + `&key=trnsl.1.1.20170326T141009Z.afd6d8e4e238cde0.83e36ba00fd16f9ba8df819f0d5a4ae4042b58df`
    + `&text=${text}`)
  // .then(response => {
  //   // console.log('>>>', response.body)
  //   // result = response.body
  // })

  // return result
          // if (!error && response.statusCode == 200) {
          // }
  // .catch(err => console.log(err))
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
  console.log('>>>>>', encodeURIComponent('http://fucking-great-advice.ru/api/random_by_tag/кодеру'))
  return request('http://fucking-great-advice.ru/api/random_by_tag/%D0%BA%D0%BE%D0%B4%D0%B5%D1%80%D1%83')
}
