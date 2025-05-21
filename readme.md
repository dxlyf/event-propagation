This is an event-like event capture and bubbling event triggering mechanism based on eventMitter3 using typescript implemented in HtmlElement

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
    // Higher priority, capture phase triggers
     container.on('mousedown',e=>{
       // e.stopPropagation()
        console.log('container mouseDown',e.eventPhase)
    },{
        capture:true, // Capture phase triggers
    })
    child.on('mousedown',e=>{
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