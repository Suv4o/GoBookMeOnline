import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultFooter from './DefaultFooter.vue'

describe('DefaultFooter', () => {
  it('render DefaultFooter component correctly', async () => {
    render(DefaultFooter)
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultFooter)
    expect(wrapper).toMatchSnapshot()
  })
})
