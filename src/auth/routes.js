import express from 'express'
import passport from 'passport'
let router = express.Router()

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.user)
    res.send({
      user: req.user
    })
  }
)

router.get('/logout',
  (req, res) => {
    req.logout()
    res.redirect('/')
  }
)

router.get('/user',
  (req, res) => {
    if (req.session.passport.user) {
      res.send({user: req.session.passport.user})
    } else {
      res.redirect('/login')
    }
  }
)

export default router
