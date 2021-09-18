import { Contest } from '..'

const contest:Contest = {
  name: 'NEAF',
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
    rcvdExchange: {
      name: 'S/P/C',
      required: false,
      skip: true,
      hide: false
    },
    power: {
      name: 'Power',
      skip: false,
      hide: false,
      required: true
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
