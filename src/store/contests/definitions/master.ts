import { MasterContest } from '..'

const master:MasterContest = {
  name: 'Default',
  settings: {
    operator: {
      default: 'SINGLE-OP',
      override: ['SINGLE-OP', 'MULTI-OP', 'CHECKLOG'],
      exclude: false,
      hide: false
    },
    band: {
      default: 'ALL',
      override: [
        'ALL',
        '160M',
        '80M',
        '40M',
        '20M',
        '15M',
        '10M',
        'LIMITED',
        'CHECKLOG'
      ],
      exclude: false,
      hide: false
    },
    power: {
      default: 'HIGH',
      override: ['HIGH', 'LOW', 'QRP'],
      exclude: false,
      hide: false
    },
    mode: {
      default: 'MIXED',
      override: ['CW', 'DIGI', 'FM', 'RTTY', 'SSB', 'MIXED'],
      exclude: false,
      hide: false
    },
    overlay: {
      default: 'N/A',
      override: [
        'N/A',
        'CLASSIC',
        'ROOKIE',
        'TB-WIRES',
        'NOVICE-TECH',
        'OVER-50'
      ],
      exclude: false,
      hide: false
    },
    stationCategory: {
      default: 'FIXED',
      override: [
        'FIXED',
        'MOBILE',
        'PORTABLE',
        'ROVER',
        'EXPEDITION',
        'HQ',
        'SCHOOL'
      ],
      exclude: false,
      hide: false
    },
    assistedCategory: {
      default: 'NON-ASSISTED',
      override: ['ASSISTED', 'NON-ASSISTED'],
      exclude: false,
      hide: false
    },
    timeCategory: {
      default: 'N/A',
      override: ['N/A', '6-HOURS', '12-HOURS', '24-HOURS'],
      exclude: false,
      hide: false
    },
    sentExchange: {
      exclude: false,
      hide: false
    },
    operators: {
      exclude: false,
      hide: false
    },
    soapbox: {
      exclude: false,
      hide: false
    }
  },
  entry: {
    call: {
      name: 'Callsign',
      regex: '[\\dA-Za-z\\/]+/',
      inputRegex: '/[\\dA-Za-z\\/]/'
    },
    rcvdRst: {
      name: 'RST RX',
      inputRegex: /d/,
      skip: true,
      hide: false
    },
    sentRst: {
      name: 'RST TX',
      inputRegex: /d/,
      skip: true,
      hide: false
    },
    name: {
      name: 'Name',
      required: false,
      skip: true,
      hide: true
    },
    rcvdSerial: {
      name: 'Serial RX',
      inputRegex: /\d/,
      required: false,
      skip: true,
      hide: true
    },
    sentSerial: {
      name: 'Serial TX',
      inputRegex: /\d/,
      required: false,
      skip: true,
      hide: true
    },
    rcvdExchange: {
      name: 'Exch RX',
      required: false,
      skip: true,
      hide: true
    },
    sentExchange: {
      name: 'Exch TX',
      required: false,
      skip: true,
      hide: true
    },
    power: {
      name: 'Power',
      inputRegex: /\d/,
      required: false,
      skip: true,
      hide: true
    },
    reference: {
      name: 'Reference',
      required: false,
      skip: true,
      hide: true
    },
    gridsquare: {
      name: 'Grid',
      inputRegex: /[A-Za-z0-9]/,
      regex: /^[A-Za-z]{2}\\d{2}([A-Za-z]{2}(\\d{2})?)?$/g,
      required: false,
      skip: true,
      hide: true
    },
    comment: {
      name: 'Comment',
      required: false,
      skip: true,
      hide: false
    }
  },
  rules: {
    dupe: true // false, 'band', 'day', 'mode' // Will forbid dupes
  }
}

export default master
