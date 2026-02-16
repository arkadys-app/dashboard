import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Empty } from '#components'

describe('Empty', () => {
  it('renders the title correctly', async () => {
    const wrapper = await mountSuspended(Empty, {
      props: {
        title: 'My Feature'
      }
    })

    expect(wrapper.text()).toContain('My Feature')
  })

  it('renders the icon and description when provided', async () => {
    const wrapper = await mountSuspended(Empty, {
      props: {
        title: 'My Feature',
        description: 'This is a great feature',
        icon: 'heroicons:home'
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })

    expect(wrapper.text()).toContain('This is a great feature')
  })

  it('does not render icon or description if not provided', async () => {
    const wrapper = await mountSuspended(Empty, {
      props: {
        title: 'Minimal Feature'
      }
    })

    const description = wrapper.find('.text-slate-500')
    expect(description.exists()).toBe(false)

    const iconContainer = wrapper.find('.relative.mb-6')
    expect(iconContainer.exists()).toBe(false)
  })

  it('matches the snapshot', async () => {
    const wrapper = await mountSuspended(Empty, {
      props: {
        title: 'Snapshot Title',
        description: 'Snapshot Desc',
        icon: 'heroicons:star'
      },
      global: { stubs: { Icon: true } }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
