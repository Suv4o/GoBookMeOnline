import { render, cleanup, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomePage from './HeroSection.vue'
import { ComponentPublicInstance } from 'vue'

const container = document.createElement('div')

describe('HomePage', async () => {
  beforeAll(() => {
    // Adding div with id="search-bar" and input inside so will mimic the real input
    const input = document.createElement('input')
    container.setAttribute('id', 'search-bar')
    input.setAttribute('type', 'text')
    container.appendChild(input)
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

    const wrapperVm = wrapper.vm as ComponentPublicInstance & {
      focusSearchInput: () => void
    }

    const spyFocusSearchInput = vi.spyOn(wrapperVm, 'focusSearchInput')
    await wrapperVm.focusSearchInput()
    expect(spyFocusSearchInput).toHaveBeenCalled()
    expect(spyFocusSearchInput).toReturnWith(void 0)
    spyFocusSearchInput.mockReset()
  })

  it('snap shot matches', async () => {
    const wrapper = render(HomePage)
    expect(wrapper).toMatchSnapshot()
    cleanup()
  })
})
