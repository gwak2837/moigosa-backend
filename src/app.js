/* eslint-disable no-console */
import dotenv from 'dotenv'

dotenv.config()

import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import { connectDatabase } from './database/postgres.js'
import loginRouter from './routes/login.js'
import registerRouter from './routes/register.js'
import meRouter from './routes/me.js'

connectDatabase()

const app = express()
app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'))
// app.use('/', static(join(__dirname, 'public')))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
)

app.get('/', () => 'Hello world!')
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/me', meRouter)

app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})
