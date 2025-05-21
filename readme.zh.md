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

    // print 1,2,3
    target1.on('mousedown',e=>{
        consolog.og('1')
    },{capture:true})

    target2.on('mousedown',e=>{
        consolog.og('3')
    })

    target3.on('mousedown',e=>{
            consolog.og('2')
    })
    target3.emit(e) // Trigger event or target3.dispatchEvent(e) // Trigger event



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

```typescript
    import {EventTarget,Event,EventPhase} from 'event-propagation'
    class DisplayObject extends EventTarget<{
        mousedown:{},

    }>{
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
    // 优先级更高，捕获阶段触发
     container.on('mousedown',e=>{
       // e.stopPropagation() // 当是获事件时，优先级更高，可以阻止向下传播

        console.log('capture-container mouseDown',e.eventPhase)
    },{
        capture:true, // 捕获阶段触发
    })
    child.on('mousedown',e=>{
     //   e.stopImmediatePropagation() // 阻止同级和父级事件的传播
       // e.stopPropagation() // 阻止父级事件的传播
        console.log('child mouseDown',e.eventPhase)
    })
  
     child.on('mousedown',e=>{
        console.log('child mouseDown2',e.eventPhase)
    })
    // log
    // capture-container mouseDown 3
    // child mouseDown 2
    // container mouseDown 1
  

```