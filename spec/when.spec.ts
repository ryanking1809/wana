import { o, when } from '../src'

describe('when()', () => {
  describe('first run', () => {
    it('remains pending when the condition is false', async () => {
      const state = o({ flag: false })
      const promise = when(() => state.flag)

      const resolve = jest.fn()
      promise.then(resolve, resolve)

      await Promise.resolve()
      expect(resolve).not.toBeCalled()
    })

    it('fulfills its promise when the condition is true', async () => {
      const state = o({ flag: true })
      const promise = when(() => state.flag)

      const fulfill = jest.fn()
      promise.then(fulfill)

      await Promise.resolve()
      expect(fulfill).toBeCalled()
    })

    it('rejects its promise when the condition throws', async () => {
      const promise = when(() => {
        throw Error('test')
      })

      const reject = jest.fn()
      promise.catch(reject)

      await Promise.resolve()
      expect(reject).toBeCalled()
    })
  })

  describe('after an observable change', () => {
    it('remains pending when the condition returns false', async () => {
      const state = o({ count: 0 })
      const promise = when(() => state.count == 2)

      const resolve = jest.fn()
      promise.then(resolve, resolve)
      await Promise.resolve()

      state.count = 1
      await Promise.resolve()
      expect(resolve).not.toBeCalled()
    })

    it('fulfills its promise when the condition returns true', async () => {
      const state = o({ count: 0 })
      const promise = when(() => state.count == 1)

      const fulfill = jest.fn()
      promise.then(fulfill)
      await Promise.resolve()

      state.count = 1
      await Promise.resolve()
      expect(fulfill).toBeCalled()
    })

    it('rejects its promise when the condition throws', async () => {
      const state = o({ count: 0 })
      const promise = when(() => {
        if (state.count > 0) {
          throw Error('test')
        }
        return false
      })

      const reject = jest.fn()
      promise.catch(reject)
      await Promise.resolve()

      state.count = 1
      await Promise.resolve()
      expect(reject).toBeCalled()
    })
  })
})
