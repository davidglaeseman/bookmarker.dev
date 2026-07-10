import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheInput from '~/app/components/the-input.vue'

describe('the-input.vue', () => {
  describe('rendering', () => {
    it('renders label with correct id association', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test Label',
          id: 'test-id',
          value: 'test value',
          type: 'input',
        },
      })

      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.attributes('for')).toBe('test-id')
      expect(label.text()).toBe('Test Label')
    })

    it('renders input with correct id', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'input-id',
          value: 'test',
          type: 'input',
        },
      })

      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe('input-id')
    })

    it('renders input with type="input"', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Email',
          id: 'email',
          value: 'test@example.com',
          type: 'input',
        },
      })

      expect(wrapper.find('input').attributes('type')).toBe('input')
    })

    it('renders input with type="color"', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Color',
          id: 'color',
          value: '#FF0000',
          type: 'color',
        },
      })

      expect(wrapper.find('input').attributes('type')).toBe('color')
    })
  })

  describe('props', () => {
    it('reflects value prop in input', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'hello world',
          type: 'input',
        },
      })

      expect(wrapper.find('input').element.value).toBe('hello world')
    })

    it('renders required attribute when prop is true', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Required Field',
          id: 'required',
          value: '',
          type: 'input',
          required: true,
        },
      })

      expect(wrapper.find('input').attributes('required')).toBeDefined()
    })

    it('does not render required attribute when prop is false', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Optional Field',
          id: 'optional',
          value: '',
          type: 'input',
          required: false,
        },
      })

      expect(wrapper.find('input').attributes('required')).toBeUndefined()
    })

    it('shows help text when provided', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: '',
          type: 'input',
          help: 'This is a help message',
        },
      })

      const helpDiv = wrapper.find('[class*="bg-red"]')
      expect(helpDiv.exists()).toBe(true)
      expect(helpDiv.text()).toBe('This is a help message')
    })

    it('does not show help text when not provided', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: '',
          type: 'input',
        },
      })

      const helpDiv = wrapper.find('[class*="bg-red"]')
      expect(helpDiv.exists()).toBe(false)
    })

    it('handles null value', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: null,
          type: 'input',
        },
      })

      expect(wrapper.find('input').element.value).toBe('')
    })

    it('handles undefined value', () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: undefined,
          type: 'input',
        },
      })

      expect(wrapper.find('input').element.value).toBe('')
    })
  })

  describe('events', () => {
    it('emits update event with input value on input', async () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: 'initial',
          type: 'input',
        },
      })

      const input = wrapper.find('input')
      await input.setValue('new value')

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')![0]).toEqual(['new value'])
    })

    it('emits update event when color input changes', async () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Color',
          id: 'color',
          value: '#FF0000',
          type: 'color',
        },
      })

      const input = wrapper.find('input')
      await input.setValue('#00FF00')

      expect(wrapper.emitted('update')).toBeTruthy()
      // Color input normalizes to lowercase
      expect(wrapper.emitted('update')![0]).toEqual(['#00ff00'])
    })

    it('emits multiple update events on consecutive changes', async () => {
      const wrapper = mount(TheInput, {
        props: {
          label: 'Test',
          id: 'test',
          value: '',
          type: 'input',
        },
      })

      const input = wrapper.find('input')
      await input.setValue('hello')
      await input.setValue('hello world')

      expect(wrapper.emitted('update')).toHaveLength(2)
      expect(wrapper.emitted('update')![0]).toEqual(['hello'])
      expect(wrapper.emitted('update')![1]).toEqual(['hello world'])
    })
  })
})
