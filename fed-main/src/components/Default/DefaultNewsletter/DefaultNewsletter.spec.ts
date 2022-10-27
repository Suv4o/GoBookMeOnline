import { render, cleanup } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultNewsletter from './DefaultNewsletter.vue'

describe('DefaultNewsletter', async () => {
  it('render component correctly', async () => {
    render(DefaultNewsletter)
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultNewsletter)
    expect(wrapper).toMatchSnapshot()
  })
})
