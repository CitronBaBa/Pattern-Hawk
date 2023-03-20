import exp from 'constants'
import Pattern from './pattern/Pattern'

/**
 * Enables logical groupings of patterns
 * For now it only supports shallow groupings and considers 'or' relationship first,
 * embedded relationships can be added later
 *
 * Syntax uses '(', ')', '|':
 * (pattern1)(pattern2) => matches pattern1 and then pattern2
 * (pattern1)|(pattern2) => matches pattern1 or pattern2
 * (pattern1)(pattern2) | (pattern3)(pattern4) => matches pattern1 and then pattern2, or matches pattern3 and then pattern4
 * ((pattern1) | (pattern2)) (pattern3) => not supported yet
 */

type GroupRelation = 'and' | 'or'

export class PatternGroup {
  children: (Pattern | PatternGroup)[] = []
  childrenRelation: GroupRelation

  constructor(expression: string) {
    try {
      this.parseExpression(expression)
    } catch (e: unknown) {
      console.info(`Invalid PatternGroup expression: ${expression}`)
      throw e
    }
  }

  parseExpression(expr: string) {
    if (expr.includes('|')) {
      this.childrenRelation = 'or'
      this.parseOrExpression(expr)
    } else {
      this.childrenRelation = 'and'
      this.parseAndExpression(expr)
    }
  }

  parseOrExpression(expr: string) {
    const subExprs = expr.split('|')
    for (const subExpr of subExprs) {
      this.children.push(new PatternGroup(subExpr))
    }
  }

  parseAndExpression(expr: string) {
    const symbolStack: string[] = []

    const popPatternExpr = (left: string | undefined) => {
      let patternExpr = ''
      let poppedChar: string | undefined = ''
      while (poppedChar !== left && poppedChar !== undefined) {
        patternExpr = poppedChar + patternExpr
        poppedChar = symbolStack.pop()
      }
      if (poppedChar !== left) {
        throw new Error('Illegal PatternGroup syntax')
      }
      this.children.push(new Pattern(patternExpr))
    }

    for (const char of expr) {
      if (char === ')') {
        popPatternExpr('(')
      } else {
        // when '(', ')' is omitted
        if (char === '(' && symbolStack.length > 0) {
          popPatternExpr(undefined)
        }
        symbolStack.push(char)
      }
    }

    if (symbolStack.includes('(')) {
      throw new Error('Illegal PatternGroup syntax')
    }

    // when '(', ')' is omitted
    if (symbolStack.length > 0) {
      this.children.push(new Pattern(symbolStack.join('')))
    }
  }

  public validateInput(s: string): boolean {
    if (this.childrenRelation === 'or') {
      return this.children.some((c) => c.validateInput(s))
    }

    if (this.childrenRelation === 'and') {
      let sIndex = 0
      for (const child of this.children) {
        const childResult = child.validateInput(
          s.slice(sIndex, sIndex + child.getLength()),
        )
        sIndex += child.getLength()
        if (!childResult) return false
      }
      // have remaining strings unvalidated
      if (sIndex < s.length) return false
    }
    return true
  }

  public getChildrenRelation = (): GroupRelation => this.childrenRelation

  /**
   * Should consider variable length if embedded relations were added
   *  */
  public getLength = (): number =>
    this.children.reduce((sum, curr) => sum + curr.getLength(), 0)
}
