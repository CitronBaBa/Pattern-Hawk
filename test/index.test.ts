describe('expect function', () => {
  const name = 'John'
  // Assert greeter result
  it('dear John', () => {
    expect(name).toBe(`John`)
  })
  it('dear John 2', () => {
    expect(name).toBe(`John`)
  })
})
