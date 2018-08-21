import { expect } from 'chai'
import Vue from 'vue'
import Index from '@/js/conf/home/pages/home/index.vue'

describe('home -> pages -> home -> index.vue', () => {
  it('should render contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.home p').textContent).to.equal('hello analysys')
  })
})
