import express from 'express'
import passport from 'passport'
let router = express.Router()

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    const user = {
      id: req.user._id,
      username: req.user._source.username
    }
    res.send({
      user: user
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

router.post('/check-session',
  (req, res) => {
    const isLoggedIn = req.isAuthenticated()
    if (isLoggedIn) {
      return res.json({
        loggedIn: isLoggedIn,
        user: req.user
      })
    } else {
      return res.json({
        message: 'not authenticated'
      })
    }
  }
)

export default router
