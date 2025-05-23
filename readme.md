这基于eventmitter3，它实现了类似于DOM事件的事件消息订阅，可以冒泡和捕获传播

This is based on eventmitter3, which implements event message subscriptions similar to DOM events that can bubble and capture propagation
﻿
﻿
```typescript
    import {EventTarget,Event,EventPhase} from 'event-propagation'

    // bubbles：Whether to support bubbles, default to true
    // cancelable: Whether to support cancel the default behavior, the default is true
    const e=new Event(type:string, bubbles?:boolean, cancelable?:boolean)
    
    e.preventDefault() //Block the default behavior of events, you need to implement the default behavior logic of blocking yourself.
    e.stopPropagation() // Stop propagating events up or down
    e.stopImmediatePropagation() // As above, and stop triggering of subsequent events of the current object
    const target1=new EventTarget()
    const target2=new EventTarget()
    const target3=new EventTarget()


    target2.parentNode=target1
    target3.parentNode=target2

    //e.target==target1,e.currentTarget===target3
    // print 1,2,3
    target1.on('mousedown',e=>{
        console.log(e.eventPhase)
        consolog.og('1',e.target==target1,e.currentTarget===target3)
    },{capture:true})

    target2.on('mousedown',e=>{
        consolog.og('3')
    })

    target3.on('mousedown',e=>{
            consolog.og('2')
    })
    target3.emit(e.setData()) // Trigger event or target3.dispatchEvent(e) // Trigger event



  // print 1,2,3
    target1.on('mousedown',e=>{
        consolog.og('3')
    },{capture:false})

    target2.on('mousedown',e=>{
        consolog.og('2')
    })

    target3.on('mousedown',e=>{
            consolog.og('1')
    })
    target3.emit(e) // Trigger event or target3.dispatchEvent(e) // Trigger event
 

   // print 1,2
    target1.on('mousedown',e=>{
        consolog.og('3')
    },{capture:false})

    target2.on('mousedown',e=>{
        e.stopPropagation()
        consolog.og('2')
    })

    target3.on('mousedown',e=>{
            consolog.og('1')
    })
    target3.emit(e) // Trigger event or target3.dispatchEvent(e) // Trigger event
 

 
   // print 3
    target1.on('mousedown',e=>{
        consolog.og('3')
        e.stopPropagation()
    },{capture:true})

    target2.on('mousedown',e=>{
        consolog.og('2')
    })

    target3.on('mousedown',e=>{
            consolog.og('1')
    })
    target3.emit(e) // Trigger event or target3.dispatchEvent(e) // Trigger event
 

```
## Examples of event bubbling and capture applied in graphics engines
```typescript
    import {EventTarget,Event,EventPhase} from 'event-propagation'
    class DisplayObject extends EventTarget<{
        mousedown:{},

    }>{
        type='container'
        children=[]
        add(child: DisplayObject) {
            child.parentNode=this
            this.children.push(child)
        }   

    }
    let container=new DisplayObject()
    let child=new DisplayObject()
    container.add(child)

    canvas.addEventListener('mousedown',e=>{
        let hitObj=findHitObject(e.x,e.y)
        hitObj.emit(Event.create(e.type).setData({x:e.x,y:e.y}))
    })

    container.on('mousedown',e=>{
        console.log('container mouseDown',e.eventPhase)
    })
    // Higher priority, capture phase triggers
     container.on('mousedown',e=>{
       // e.stopPropagation()
        console.log('container mouseDown',e.eventPhase)
    },{
        capture:true, // Capture phase triggers
    })
    child.on('mousedown',e=>{
        console.log('type',e.currentTarget.type)
        e.stopImmediatePropagation() // Prevents triggering of peer and parent events
        e.stopPropagation() // Prevent the triggering of parent events
        console.log('child mouseDown',e.eventPhase)
    })
  
     child.on('mousedown',e=>{
        console.log('child mouseDown2',e.eventPhase)
    })
    // output log
    // capture-container mouseDown 3
    // child mouseDown 2
    // container mouseDown 1
  

```