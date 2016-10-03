import cheerio from 'cheerio'
import {createGame} from '../src/api/api'
import http from 'http'
import testGames from '../src/data/test_games.json'

export function loadGamesFromExternalSource () {
  console.log('loading games')
  let options = {
    host: 'https://boardgamegeek.com',
    path: ''
  }
  let index = 0
  while (index < 5) {
    index++
    options.path = '/browse/boardgame/page/' + index
    http.get(options, (err, res) => {
      if (err) {
        console.log(err)
      } else if (res.statusCode === 200) {
        const $ = cheerio.load(res.content)
        const scrapedGames = $('.collection_objectname').find('a')
        console.log(scrapedGames)
        // _.each(scrapedGames, (game, index) => {
        //   const title = $(game).text()
        //   let newGame = {
        //     name: title
        //   }
        //   createGame(newGame)
        // })
      }
    })
  }
}

export function loadGamesFromTestData () {
  console.log(testGames)
  testGames.forEach((game, index) => {
    createGame(game)
  })
}