import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { StatCard } from '#components'

describe('StatCard Component', () => {
  it('should render with required props', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Total Revenue',
        value: '$12,345'
      }
    })

    expect(wrapper.text()).toContain('Total Revenue')
    expect(wrapper.text()).toContain('$12,345')
  })

  it('should render numeric value correctly', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Active Users',
        value: 1234
      }
    })

    expect(wrapper.text()).toContain('1234')
  })

  it('should render description when provided', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Sales',
        value: 500,
        description: 'Compared to last month'
      }
    })

    expect(wrapper.text()).toContain('Compared to last month')
  })

  it('should not render description when not provided', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Sales',
        value: 500
      }
    })

    expect(wrapper.find('.text-xs.text-slate-500').exists()).toBe(false)
  })

  it('should render progress badge with decrease type', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Revenue',
        value: '$8,000',
        progress: {
          value: '-5%',
          type: 'decrease'
        }
      }
    })

    expect(wrapper.text()).toContain('-5%')
  })

  it('should render progress badge with neutral type', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Revenue',
        value: '$9,000',
        progress: {
          value: '0%',
          type: 'neutral'
        }
      }
    })

    expect(wrapper.text()).toContain('0%')
  })

  it('should render progress without type', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Revenue',
        value: '$9,000',
        progress: {
          value: '2%'
        }
      }
    })

    expect(wrapper.text()).toContain('2%')
  })

  it('should display correct badge variant for increase', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Sales',
        value: 100,
        progress: {
          value: '+10%',
          type: 'increase'
        }
      }
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('variant')).toBe('success')
  })

  it('should display correct badge variant for decrease', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Sales',
        value: 100,
        progress: {
          value: '-10%',
          type: 'decrease'
        }
      }
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('variant')).toBe('error')
  })

  it('should display correct badge variant for neutral', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Sales',
        value: 100,
        progress: {
          value: '0%',
          type: 'neutral'
        }
      }
    })

    const badge = wrapper.findComponent({ name: 'UiBadge' })
    expect(badge.props('variant')).toBe('secondary')
  })

  it('should render all elements together', async () => {
    const wrapper = await mountSuspended(StatCard, {
      props: {
        title: 'Total Sales',
        value: '$25,000',
        description: 'Last 30 days',
        progress: {
          value: '+15%',
          type: 'increase'
        }
      }
    })

    expect(wrapper.text()).toContain('Total Sales')
    expect(wrapper.text()).toContain('$25,000')
    expect(wrapper.text()).toContain('Last 30 days')
    expect(wrapper.text()).toContain('+15%')
  })
})
