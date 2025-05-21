import { expect, test, } from 'vitest'
import { EventEmitter4, Event } from '../lib'

test('触发基本事件', () => {

    const event = new EventEmitter4<{ test: { count: number } }>()
    let count = 0
    event.on('test', (e) => {
        count = e.data!.count
    })
    event.dispatchEvent(new Event('test').setData({ count: 10 }))
    expect(count).toBe(10)
})
test('触发冒泡事件', () => {
    const event = new EventEmitter4<{ test: {} }>()
    const event2 = new EventEmitter4<{ test: {} }>()

    event2.parentNode = event
    let list: string[] = []
    event.on('test', (e) => {
        list.push('a')
    })
    event2.on('test', (e) => {
        list.push('b')
    })

    event2.dispatchEvent(new Event('test'))
    expect(list).toEqual(['b', 'a'])
})
test('触发捕获冒泡事件', () => {
    const event = new EventEmitter4<{ test: {} }>()
    const event2 = new EventEmitter4<{ test: {} }>()

    event2.parentNode = event
    let list: string[] = []
    event.on('test', (e) => {
        list.push('a')
    }, true)
    event2.on('test', (e) => {
        list.push('b')
    })

    event2.dispatchEvent(new Event('test'))
    expect(list).toEqual(['a', 'b'])
})
test('阻止冒泡到父级', () => {
    const event = new EventEmitter4<{ test: {} }>()
    const event2 = new EventEmitter4<{ test: {} }>()

    event2.parentNode = event
    let list: string[] = []
    event.on('test', (e) => {
        list.push('a')
    })
    event2.on('test', (e) => {
        e.stopPropagation()
        list.push('b')
    })

    event2.dispatchEvent(new Event('test'))
    expect(list).toEqual(['b'])
})

test('定义父级捕获事件，阻冒泡到子级', () => {
    const event = new EventEmitter4<{ test: {} }>()
    const event2 = new EventEmitter4<{ test: {} }>()

    event2.parentNode = event
    let list: string[] = []
    event.on('test', (e) => {
        list.push('a')
        e.stopPropagation()
    },true)
    event2.on('test', (e) => {
        e.stopPropagation()
        list.push('b')
    })

    event2.dispatchEvent(new Event('test'))
    expect(list).toEqual(['a'])
})