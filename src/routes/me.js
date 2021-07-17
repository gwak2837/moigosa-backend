import { Router } from 'express'
// import { getUserById } from '../database/postgres.js'
import { verifyJWT } from '../utils/jwt.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { jwt } = req.body

    const userInfo = await verifyJWT(jwt).catch(() => {
      return null
    })

    if (userInfo) {
      // const rows = await getUserById(userInfo.userId)
      // res.send(rows[0])
    } else {
      res.send({ id: null })
    }
  } catch (error) {
    console.error(error)
    res.send({ id: null })
  }
})

export default router
