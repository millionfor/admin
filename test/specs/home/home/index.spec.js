import { shallowMount } from '@vue/test-utils'
import Index from '@/js/conf/home/pages/home/index.vue'

describe('Path => src/js/conf/home/pages/home/index.vue', () => {
  it('渲染正确的内容', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.find('.home p').text()).toEqual('hello analysys')
  })
})
