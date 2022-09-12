import { render, cleanup } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultSearchBar from './DefaultSearchBar.vue'

describe('DefaultSearchBar', () => {
  it('render component correctly', async () => {
    render(DefaultSearchBar)
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultSearchBar)
    expect(wrapper).toMatchSnapshot()
  })
})
