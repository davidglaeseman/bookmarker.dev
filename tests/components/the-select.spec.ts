import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheSelect from '@/components/the-select.vue'

describe('the-select.vue', () => {
  const mockOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]

  describe('rendering', () => {
    it('renders label with correct id association', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test Select',
          id: 'test-select',
          value: 'a',
          options: mockOptions,
        },
      })

      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.attributes('for')).toBe('test-select')
      expect(label.text()).toBe('Test Select')
    })

    it('renders select with correct id', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'my-select',
          value: 'a',
          options: mockOptions,
        },
      })

      expect(wrapper.find('select').attributes('id')).toBe('my-select')
    })

    it('renders one option element for each option prop', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'a',
          options: mockOptions,
        },
      })

      const options = wrapper.findAll('option')
      expect(options).toHaveLength(3)
    })

    it('renders option with correct label and value', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'a',
          options: mockOptions,
        },
      })

      const options = wrapper.findAll('option')
      expect(options[0].text()).toBe('Option A')
      expect(options[0].attributes('value')).toBe('a')
      expect(options[1].text()).toBe('Option B')
      expect(options[1].attributes('value')).toBe('b')
      expect(options[2].text()).toBe('Option C')
      expect(options[2].attributes('value')).toBe('c')
    })
  })

  describe('props', () => {
    it('selects the correct option based on value prop', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'b',
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      expect(select.element.value).toBe('b')
    })

    it('handles null value - defaults to first option', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: null,
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      // When value is null/undefined, the select defaults to the first option value
      expect(select.element.value).toBe('a')
    })

    it('handles undefined value - defaults to first option', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: undefined,
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      // When value is null/undefined, the select defaults to the first option value
      expect(select.element.value).toBe('a')
    })

    it('works with empty options array', () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: '',
          options: [],
        },
      })

      const options = wrapper.findAll('option')
      expect(options).toHaveLength(0)
    })
  })

  describe('events', () => {
    it('emits update event with selected value on change', async () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'a',
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('b')

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')![0]).toEqual(['b'])
    })

    it('emits update event when changing from one option to another', async () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'a',
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('c')

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')![0]).toEqual(['c'])
    })

    it('emits multiple update events on consecutive changes', async () => {
      const wrapper = mount(TheSelect, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'a',
          options: mockOptions,
        },
      })

      const select = wrapper.find('select')
      await select.setValue('b')
      await select.setValue('c')

      expect(wrapper.emitted('update')).toHaveLength(2)
      expect(wrapper.emitted('update')![0]).toEqual(['b'])
      expect(wrapper.emitted('update')![1]).toEqual(['c'])
    })
  })
})
