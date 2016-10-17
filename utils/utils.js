import cheerio from 'cheerio'
import {checkIfGamesTypeExists, createGame, createUser} from '../src/api/api'
import request from 'request'
import testGames from '../src/data/test_games.json'
import testUsers from '../src/data/test_users.json'
import _ from 'lodash'

export function loadGamesFromExternalSource () {
  checkIfGamesTypeExists().then(exists => {
    if (!exists) {
      let index = 0
      while (index < 10) {
        index++
        request(`https://boardgamegeek.com/browse/boardgame/page/${index}`, (err, res, html) => {
          if (!err && res.statusCode === 200) {
            const $ = cheerio.load(html)
            const scrapedGames = $('.collection_objectname').find('a')
            _.each(scrapedGames, (game, index) => {
              const title = $(game).text()
              console.log(title)
              let newGame = {
                title: title
              }
              createGame(newGame)
            })
          }
        })
      }

      console.log('done scraping boardgamegeek')
    }
  })
}

export function loadGamesFromTestData () {
  testGames.forEach((game, index) => {
    createGame(game)
  })
}

export function loadUsersFromTestData () {
  testUsers.forEach((user, index) => {
    createUser(user)
  })
}
