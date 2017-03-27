import express from 'express'
import promisify from 'es6-promisify'
import request_cb from 'request'

const app = express()
const request = promisify(request_cb.post)

request('https://translate.yandex.net//api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20170326T141009Z.afd6d8e4e238cde0.83e36ba00fd16f9ba8df819f0d5a4ae4042b58df&&text=Hello world')
.then(response => console.log(response.body))
        // if (!error && response.statusCode == 200) {
        // }
.catch(err => console.log(err))