import bcrypt from 'bcryptjs'
import { Router } from 'express'
// import { registerUser } from '../database/postgres.js'
import { generateJWT } from '../utils/jwt.js'

const { genSalt, hash } = bcrypt
const router = Router()

router.post('/', async (req, res) => {
  try {
    const { password } = req.body

    const passwordHash = await hash(password, await genSalt())

    const userInfo = { ...req.body, passwordHash }

    // const rows = await registerUser(userInfo)

    const jwt = await generateJWT({ userId: 1 /* rows[0].id */ })

    res.send({ jwt })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: '서버 오류가 발생했어요' })
  }
})

export default router
