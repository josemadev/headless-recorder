import { createLocalVue, mount } from '@vue/test-utils'
import App from '../App'

function createChromeLocalStorageMock (options) {
  let ops = options || {}
  return {
    options,
    storage: {
      local: {
        get: (key, cb) => { return cb(ops) },
        set: (options, cb) => {
          ops = options
          cb()
        }
      }
    }
  }
}

describe('App.vue', () => {
  let localVue
  beforeEach(() => { localVue = createLocalVue() })

  test('it has the correct pristine / empty state', () => {
    const mocks = { $chrome: createChromeLocalStorageMock() }
    const wrapper = mount(App, { mocks, localVue })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it loads the default options', () => {
    const mocks = { $chrome: createChromeLocalStorageMock() }
    const wrapper = mount(App, { mocks, localVue })
    expect(wrapper.vm.$data.options.code.wrapAsync).toBeTruthy()
  })

  test('it has the default key code for capturing inputs as 9 (Tab)', () => {
    const mocks = { $chrome: createChromeLocalStorageMock() }
    const wrapper = mount(App, { mocks, localVue })
    expect(wrapper.vm.$data.options.code.keyCode).toBe(9)
  })

  test('clicking the button will listen for the next keydown and update the key code option', () => {
    const options = { code: { keyCode: 9 } }
    const mocks = { $chrome: createChromeLocalStorageMock(options) }
    const wrapper = mount(App, { mocks, localVue })
    return wrapper.vm.$nextTick()
      .then(() => {
        wrapper.find('button').element.click()
        const event = new KeyboardEvent('keydown', { keyCode: 16 })
        window.dispatchEvent(event)
        return wrapper.vm.$nextTick()
      })
      .then(() => {
        expect(wrapper.vm.$data.options.code.keyCode).toBe(16)
      })
  })
})
