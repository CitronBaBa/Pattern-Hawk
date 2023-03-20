import { expect } from '@jest/globals'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSet: (expected: Set<unknown>) => CustomMatcherResult
    }
  }
}

expect.extend({
  toMatchSet,
})

function toMatchSet(received: Set<unknown>, expected: Set<unknown>) {
  const diff = new Set(received)

  for (const el of expected) {
    if (received.has(el)) {
      diff.delete(el)
    } else {
      diff.add(el)
    }
  }
  return {
    pass: diff.size === 0,
    message: () =>
      `Result ${[...received].join(', ')}\nExpected ${[...expected].join(
        ', ',
      )}`,
  }
}
