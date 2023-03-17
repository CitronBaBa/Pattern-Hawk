import config from 'config'
import { PatternDetector } from './PatternDetector'

const patternDefinitions =
  config.get<Record<string, string>>('patternDefinitions')

function main() {
  const detctor = new PatternDetector(patternDefinitions)
  const ex = [
    '111',
    '123',
    '145',
    '122',
    '1111',
    '123°',
    '361°',
    '000°',
    '00°',
    '0°',
    '°333°',
    '163🧑‍🤝‍🧑5',
    '1632🧑‍🤝‍🧑5',
  ]

  ex.forEach((s) => {
    const r = detctor.detect(s)
    console.log(`${s}: ${Array.from(r).join(', ')}`)
  })

  const r = detctor.detect('123')
}

main()
