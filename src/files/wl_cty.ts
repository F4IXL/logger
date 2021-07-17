import cty from '../files/wl_cty.dat?raw'

type Prefixes = {
    [prefix: string]: number
}

type Cty = {
    name: string,
    continent: string,
    lat: string,
    lon: string,
    prefix: string
}

const datCommmentRegex = /^#(.*?);/gms
const callFromListRegex = /(=)?([A-Za-z\d/]+)(\(\d+\))?(\[\d+\])?/g

const ctyClean = cty.replaceAll(datCommmentRegex, '').split(';\r\n')

const prefixes:Prefixes = {}
const ctyList:Cty[] = ctyClean.map((line, index) => {
  const prefix = line.substring(69, 69 + 6).split(':')[0]
  const rest = line.substring(69 + 6, line.length)
  const all = [prefix, ...Array.from(rest.matchAll(callFromListRegex)).map((res) => res[2])]

  all.forEach((k) => {
    k && (prefixes[k] = index)
  })

  return {
    name: line.substring(0, 25).split(':')[0],
    continent: line.substring(36, 36 + 5).split(':')[0],
    lat: line.substring(42, 41 + 9).split(':')[0],
    lon: line.substring(51, 50 + 10).split(':')[0],
    prefix
  }
})

const prefixesProxy = new Proxy(prefixes, {
  get (target, prop, receiver) {
    const index = Reflect.get(target, prop, receiver)
    return index && ctyList[index]
  }
})

export { prefixesProxy as prefixes, ctyList as list }
