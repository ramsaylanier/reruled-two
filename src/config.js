const Config = {
  get: () => {
    const env = process.env.NODE_ENV
    return env === 'test' ? require('../config/test.json') : require('../config/default.json')
  }
}

export default Config
