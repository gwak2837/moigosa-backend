/* eslint-disable import/first */
/* eslint-disable no-process-exit */
import dotenv from 'dotenv'

dotenv.config()

import jsonwebtoken from 'jsonwebtoken'

const { sign, verify } = jsonwebtoken

const secretKey = process.env.JWT_SECRET_KEY ?? ''

// 만약 파일이 빈 값이면 프로세스 종료하기
if (!secretKey) {
  console.error('Error: No JWT secret key. Exit process.')
  // eslint-disable-next-line node/no-process-exit
  process.exit(1)
}

export function generateJWT(payload, expiresIn = '3d') {
  return new Promise((resolve, reject) => {
    sign(payload, secretKey, { expiresIn }, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

export function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    verify(token, secretKey, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}
