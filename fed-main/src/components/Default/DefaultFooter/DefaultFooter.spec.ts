import { render, cleanup } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultFooter from './DefaultFooter.vue'

describe('DefaultFooter', async () => {
  it('render component correctly', async () => {
    render(DefaultFooter)
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultFooter)
    expect(wrapper).toMatchSnapshot()
  })
})
