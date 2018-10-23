const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const transporter = require('../../services/nodemailer')
const ip = require('ip')

require('dotenv').config()

const User = require('../models/User')
let url = "http://" + ip.address() + ":3000"

if (process.env.NODE_ENV === 'production')
  url = 'https://energy-calculator-api.herokuapp.com'


const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.JWT_ENCRYPTION, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

const create =  async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' })

    const user = await User.create({ 
      name, email, password
    })

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Registration failed' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid password' })

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Login failed' })
  }
}

const forgotPassword =  async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    })

    transporter.sendMail({
      from: process.env.NM_EMAIL,
      to: email,
      subject: 'Smart Health - Recuperação de senha',
      template: 'forgot_password',
      context: { url, email, token }
    }, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(400).send({ error: 'Cannot send forgot password email' })
      } else {
        console.log('Email sent: ' + info.response)
        res.send()
      }
    })
    
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error on forgot password, try again' })
  }
}

const resetPassword =  async (req, res) => {
  const { email, password, token } = req.body

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires')

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'Token invalid' })

    const now = new Date()

    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'Token expired, generate a new one' })

    user.password = password

    await user.save()

    return res.send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Cannot reset password, try again' })
  }
}

module.exports = {
  create,
  login,
  forgotPassword,
  resetPassword
}

// module.exports = app => app.use('/auth', router)
