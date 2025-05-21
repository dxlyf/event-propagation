这是一个基于eventMitter3 用typescript实现的类似HtmlElement的事件捕获和冒泡的事件触发机制


```typescript
    import {EventEmitter4,Event,EventPhase} from 'eventemitter4'
    class DisplayObject extends EventEmitter4<{
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