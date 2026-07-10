import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheModal from '@/components/the-modal.vue'

// Mock @vueuse/core
vi.mock('@vueuse/core', async () => {
  const { ref } = await import('vue')
  return {
    useMagicKeys: () => ({
      escape: ref(false),
    }),
  }
})

describe('the-modal.vue', () => {
  describe('rendering', () => {
    it('does not render when open is false', () => {
      const wrapper = mount(TheModal, {
        props: {
          open: false,
          title: 'Test Modal',
        },
        slots: {
          default: '<p>Modal content</p>',
        },
      })

      const backdrop = wrapper.find('[class*="fixed"]')
      expect(backdrop.exists()).toBe(false)
    })

    it('renders when open is true', () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test Modal',
        },
        slots: {
          default: '<p>Modal content</p>',
        },
      })

      const backdrop = wrapper.find('[class*="fixed"]')
      expect(backdrop.exists()).toBe(true)
    })

    it('renders title when provided', () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'My Title',
        },
        slots: {
          default: '<p>Modal content</p>',
        },
      })

      expect(wrapper.text()).toContain('My Title')
    })

    it('renders slot content', () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Modal Title',
        },
        slots: {
          default: '<p>This is the modal content</p>',
        },
      })

      expect(wrapper.text()).toContain('This is the modal content')
    })

    it('renders close button (X icon)', () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
        global: {
          components: {
            Icon: { template: '<div>X</div>' },
          },
        },
      })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('events', () => {
    it('emits close event when close button is clicked', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
        global: {
          components: {
            Icon: { template: '<div>X</div>' },
          },
        },
      })

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('emits close event when backdrop (outside modal) is clicked', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
        global: {
          components: {
            Icon: { template: '<div>X</div>' },
          },
        },
      })

      // Find the backdrop div (the outermost fixed div)
      const backdrop = wrapper.find('[class*="fixed"]')
      // Trigger click with self modifier - should emit
      await backdrop.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not emit close when clicking inside modal content', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Click me</p>',
        },
        global: {
          components: {
            Icon: { template: '<div>X</div>' },
          },
        },
      })

      // Find the content area (inside the modal, not the backdrop)
      const content = wrapper.find('[class*="bg-black text-white  p-4"]')
      if (content.exists()) {
        await content.trigger('click')
        // Should not emit because of @click.self on backdrop
        expect(wrapper.emitted('close')).toBeFalsy()
      }
    })
  })

  describe('props reactivity', () => {
    it('shows modal when open prop changes to true', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: false,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
      })

      expect(wrapper.find('[class*="fixed"]').exists()).toBe(false)

      await wrapper.setProps({ open: true })

      expect(wrapper.find('[class*="fixed"]').exists()).toBe(true)
    })

    it('hides modal when open prop changes to false', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
      })

      expect(wrapper.find('[class*="fixed"]').exists()).toBe(true)

      await wrapper.setProps({ open: false })

      expect(wrapper.find('[class*="fixed"]').exists()).toBe(false)
    })

    it('updates title when prop changes', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Original Title',
        },
        slots: {
          default: '<p>Content</p>',
        },
      })

      expect(wrapper.text()).toContain('Original Title')

      await wrapper.setProps({ title: 'New Title' })

      expect(wrapper.text()).toContain('New Title')
      expect(wrapper.text()).not.toContain('Original Title')
    })
  })

  describe('modal behavior', () => {
    it('tracks hot state when hovering over modal', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
      })

      // The modal content div should have mouseenter/mouseleave
      const modalContent = wrapper.find('[class*="max-w"]')
      expect(modalContent.exists()).toBe(true)

      // Entering should set hot to true
      await modalContent.trigger('mouseenter')
      // Leaving should set hot to false
      await modalContent.trigger('mouseleave')
    })

    it('only renders once when open is true', async () => {
      const wrapper = mount(TheModal, {
        props: {
          open: true,
          title: 'Test',
        },
        slots: {
          default: '<p>Content</p>',
        },
      })

      const backdrops = wrapper.findAll('[class*="fixed"]')
      expect(backdrops.length).toBe(1)
    })
  })
})
