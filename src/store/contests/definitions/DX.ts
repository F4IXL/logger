import { Contest } from '..'

const contest:Contest = {
  name: 'DX',
  settings: {
    timeCategory: {
      exclude: true
    },
    sentExchange: {
      exclude: false
    },
    assistedCategory: {
      exclude: true
    },
    overlay: {
      exclude: true
    }
  },
  entry: {
    name: {
      name: 'Name',
      skip: false,
      hide: false
    },
    gridsquare: {
      skip: false,
      hide: false
    },
    comment: {
      hide: false
    }
  },
  rules: {
    dupe: true // false, 'band', 'day' // Will forbid dupes
  }
}

export default contest
