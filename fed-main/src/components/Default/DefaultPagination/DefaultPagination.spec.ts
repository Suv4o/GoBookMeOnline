import { render, cleanup } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultPagination from './DefaultPagination.vue'

describe('DefaultPagination', () => {
  it('render component correctly', async () => {
    render(DefaultPagination)
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultPagination)
    expect(wrapper).toMatchSnapshot()
  })
})
