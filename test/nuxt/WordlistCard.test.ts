import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { WordlistCard } from '#components'

describe('WordlistCard', () => {
  const defaultProps = {
    title: 'My Article',
    href: '/blog/my-article',
    author: 'John Doe',
    description: 'A short description',
    global: false
  }

  it('renders the title and description correctly', async () => {
    const wrapper = await mountSuspended(WordlistCard, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('My Article')
    expect(wrapper.text()).toContain('A short description')
  })

  it('passes the correct href to the link component', async () => {
    const wrapper = await mountSuspended(WordlistCard, {
      props: defaultProps
    })

    // Find the UiLink component and check its 'to' prop
    const link = wrapper.findComponent({ name: 'UiLink' })
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/blog/my-article')
  })

  it('displays the author in the badge', async () => {
    const wrapper = await mountSuspended(WordlistCard, {
      props: defaultProps
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('label')).toBe('John Doe')
  })

  it('uses the "success" variant when global is true', async () => {
    const wrapper = await mountSuspended(WordlistCard, {
      props: { ...defaultProps, global: true }
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('variant')).toBe('success')
  })

  it('uses the "secondary" variant when global is false', async () => {
    const wrapper = await mountSuspended(WordlistCard, {
      props: { ...defaultProps, global: false }
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('variant')).toBe('secondary')
  })
})