const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()
// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
// app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/shop', function (request, response) {
  response.render('pages/shop', { title: 'Shop' })
})
app.get('/passengers', function (request, response) {
  response.render('pages/passengers', { title: 'Passengers' })
})
app.get('/trains', function (request, response) {
  response.render('pages/trains', { title: 'Trains' })
})
app.get('/tickets', function (request, response) {
  response.render('pages/tickets', { title: 'Tickets' })
})
app.get('/sold-tickets', function (request, response) {
  response.render('pages/sold-tickets', { title: 'Sold Tickets' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
})

