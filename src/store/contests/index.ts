import { LogSettingsOptions } from '../types'

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export type ContestSettings = {
    operator: {
        default: LogSettingsOptions.Operator,
        override: LogSettingsOptions.Operator[],
        exclude: boolean,
        hide: boolean
    },
    band: {
        default: LogSettingsOptions.Band,
        override: LogSettingsOptions.Band[],
        exclude: boolean,
        hide: boolean
    },
    power: {
        default: LogSettingsOptions.Power,
        override: LogSettingsOptions.Power[],
        exclude: boolean,
        hide: boolean
    },
    mode: {
        default: LogSettingsOptions.Mode,
        override: LogSettingsOptions.Mode[],
        exclude: boolean,
        hide: boolean
    },
    overlay: {
        default: LogSettingsOptions.Overlay,
        override: LogSettingsOptions.Overlay[],
        exclude: boolean,
        hide: boolean
    },
    stationCategory: {
        default: LogSettingsOptions.StationCategory,
        override: LogSettingsOptions.StationCategory[],
        exclude: boolean,
        hide: boolean
    }
    assistedCategory: {
        default: LogSettingsOptions.AssistedCategory,
        override: LogSettingsOptions.AssistedCategory[],
        exclude: boolean,
        hide: boolean
    }
    timeCategory: {
        default: LogSettingsOptions.TimeCategory,
        override: LogSettingsOptions.TimeCategory[],
        exclude: boolean,
        hide: boolean
    }
    sentExchange: {
    }
    operators: {
    }
    soapbox: {
    }
}

export type ContestCustomEntry = {
  regex: string | RegExp,
  inputRegex: string | RegExp,
  allowSpace: boolean,
  required: boolean,
  label: string,
  exclude: boolean,
  hide: true,
  size: number
}

export type ContestEntry = {
        call: {
            regex: string | RegExp,
            inputRegex: string | RegExp,
            required: boolean
        },
        received: {
            inputRegex: string | RegExp,
            required: boolean,
            skip: boolean,
            hide: boolean
        },
        sent: {
            inputRegex: string | RegExp,
            required: boolean,
            skip: boolean,
            hide: boolean
        },
        receivedExchange: {
            label: string,
            exclude: boolean,
            hide: boolean
        },
        sentExchange: {
            label: string,
            exclude: boolean,
            hide: true
        },
        custom: {
          // @todo: Exclude self keys from possible key value/type
          [key: string]: Partial<ContestCustomEntry>
        }
}

export type FinalContestEntry = ContestEntry & {
  [key: string]: ContestCustomEntry
}

export type ContestRules = {
    dupe: boolean | 'band' | 'day' | 'mode'
}

export type MasterContest = {
    name: string,
    settings: ContestSettings,
    entry: ContestEntry,
    rules: ContestRules
}

export type Contest = {
    name: string,
    settings: DeepPartial<ContestSettings>,
    entry: DeepPartial<ContestEntry>,
    rules: DeepPartial<ContestRules>
}

export type Contests = {
  DX: Contest,
  WWFF_ACTIVATOR: Contest,
  SOTACHASER: Contest
 }

export type ContestsKey = keyof Contests

export const contests:Contests = {
  DX: {
    name: 'DX',
    settings: {
      timeCategory: {
        exclude: true
      },
      sentExchange: {
        exclude: true
      },
      assistedCategory: {
        exclude: true
      },
      overlay: {
        exclude: true
      }
    },
    entry: {
      // Native fields
      call: {
        // regex: '^K' // Can be use to restrict to certain callsigns
      },
      received: {
        hide: false,
        inputRegex: '/d/'
      },
      sent: {
        hide: false,
        inputRegex: '/d/'
      },
      receivedExchange: {
        exclude: true // exclude from log export
        // hide: true, // not needed if excluded
      },
      sentExchange: {
        exclude: true
        // hide: true
      },

      // Custom fields
      custom: {
        name: {
          label: 'Name',
          allowSpace: true,
          size: 4
        },
        comment: {
          label: 'Comment',
          allowSpace: true, // Allow use of space in this field
          size: -1
          // inputRegex: '',
          // regex: '',
        }
      }
    },
    rules: {
      dupe: true // false, 'band', 'day' // Will forbid dupes
    }
  },
  WWFF_ACTIVATOR: {
    name: 'WWFF_ACTIVATOR',
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
      // Native fields
      call: {
        // regex: '^K' // Can be use to restrict to certain callsigns
      },
      received: {
        hide: false,
        inputRegex: '/d/'
      },
      sent: {
        hide: false,
        inputRegex: '/d/'
      },
      receivedExchange: {
        exclude: true // exclude from log export
        // hide: true, // not needed if excluded
      },
      sentExchange: {
        exclude: true
        // hide: true
      },

      // Custom fields
      custom: {
        name: {
          label: 'Name',
          allowSpace: true,
          size: 4
        },
        comment: {
          label: 'Comment',
          allowSpace: true, // Allow use of space in this field
          size: -1
          // inputRegex: '',
          // regex: '',
        }
      }
    },
    rules: {
      dupe: true // false, 'band', 'day' // Will forbid dupes
    }
  },
  SOTACHASER: {
    name: 'SOTA Chaser',
    settings: {
      timeCategory: {
        exclude: true
      },
      sentExchange: {
        exclude: true
      },
      assistedCategory: {
        exclude: true
      },
      overlay: {
        exclude: true
      }
    },
    entry: {
      // Native fields
      call: {
        // regex: '^K' // Can be use to restrict to certain callsigns
      },
      received: {
        hide: false,
        inputRegex: '/d/'
      },
      sent: {
        hide: false,
        inputRegex: '/d/'
      },
      receivedExchange: {
        label: 'SotaRef'
        // hide: true, // not needed if excluded
      },
      sentExchange: {
        exclude: true
        // hide: true
      }
    },
    rules: {
      dupe: true // false, 'band', 'day' // Will forbid dupes
    }
  }
}

export const master:MasterContest = {
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
      regex: '[\\dA-Za-z\\/]+/',
      inputRegex: '/[\\dA-Za-z\\/]/',
      required: true
    },
    received: {
      inputRegex: '/d/',
      required: true,
      skip: true,
      hide: false
    },
    sent: {
      inputRegex: '/d/',
      required: true,
      skip: true,
      hide: false
    },
    receivedExchange: {
      label: 'RcvExch',
      exclude: false,
      hide: false
    },
    sentExchange: {
      label: 'SentExch',
      exclude: false,
      hide: true
    },
    custom: {}
  },
  rules: {
    dupe: true // false, 'band', 'day', 'mode' // Will forbid dupes
  }
}
