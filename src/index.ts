import config from 'config'
import { PatternDetector } from './PatternDetector'
import * as readline from 'readline'

const patternDefinitions =
  config.get<Record<string, string>>('patternDefinitions')

function main() {
  const detector = new PatternDetector(patternDefinitions)
  const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const inquireContinuously = () =>
    cli.question('Enter your input string? ', (answer) => {
      const result = detector.detect(answer)
      console.log(
        `\nDetected patterns: ${[...result].map((e) => `"${e}"`).join(', ')}\n`,
      )
      inquireContinuously()
    })

  inquireContinuously()
}

main()
