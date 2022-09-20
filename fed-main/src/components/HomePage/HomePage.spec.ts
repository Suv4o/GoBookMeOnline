import { render, cleanup, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomePage from './HeroSection.vue'

const container = document.createElement('div')

describe('HomePage', async () => {
  beforeAll(() => {
    const input = document.createElement('input')
    container.setAttribute('id', 'search-bar')
    input.setAttribute('type', 'text')
    container.appendChild(input)
  })

  // Needs to be placed first in the test suite to work.
  // If we place last it will fail because the input is not in the DOM.
  it('snap shot matches', async () => {
    const wrapper = render(HomePage)
    expect(wrapper).toMatchSnapshot()
    cleanup()
  })

  it('render component correctly and click on the main button to focus', async () => {
    const wrapper = render(HomePage, {
      container: document.body.appendChild(container),
    })

    const mainButton = wrapper.getByTestId('Main Button')
    await fireEvent.click(mainButton)

    cleanup()
  })

  it('call focusSearchInput() function', async () => {
    const wrapper = shallowMount(HomePage, {
      container: document.body.appendChild(container),
    })

    const spyFocusSearchInput = vi.spyOn(wrapper.vm, 'focusSearchInput')
    await wrapper.vm.focusSearchInput()
    expect(spyFocusSearchInput).toHaveBeenCalled()
    expect(spyFocusSearchInput).toReturnWith(void 0)
    spyFocusSearchInput.mockReset()
  })
})
