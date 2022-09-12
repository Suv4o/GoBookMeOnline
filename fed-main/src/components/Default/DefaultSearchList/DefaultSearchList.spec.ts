import { render, cleanup } from '@testing-library/vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { describe, it, expect, beforeAll } from 'vitest'
import DefaultSearchList from './DefaultSearchList.vue'

let router: Router

beforeAll(() => {
  router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        components: {},
      },
    ],
  })
})

describe('DefaultSearchList', () => {
  it('render component correctly', async () => {
    render(DefaultSearchList, {
      props: {
        title: 'Locations',
        type: 'location',
      },
      global: {
        plugins: [router],
      },
    })
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultSearchList, {
      props: {
        title: 'Locations',
        type: 'location',
      },
      global: {
        plugins: [router],
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
