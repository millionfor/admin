import Vue from 'vue'
import Index from '@/js/conf/home/pages/home/index.vue'

describe('home -> pages -> home -> index.vue', () => {
  it('渲染正确的内容', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.home p').textContent).toEqual('hello analysys')
  })
})
