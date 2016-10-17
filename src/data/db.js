import elasticsearch from 'elasticsearch'
import Config from '../config'

const elasticHost = Config.get().elasticsearch.host

const ReruledDatabase = {
  index: 'reruled',
  client: new elasticsearch.Client({
    host: elasticHost
  })
}

export default ReruledDatabase
