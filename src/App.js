import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function Container({ link }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'draggable',
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
      drop: (item, monitor) => {
        console.log(item);
      }
    })
  )

  return (
    <div ref={drop} style={{
      'background': 'green',
      width: '400px',
      height: '400px'
    }}>
      <img src={link} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} />
    </div>
  )
}

function Box({ link, f }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'draggable',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        f(link)
      }
    }
  }))

  return (
    <div ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      width: '100px', height: '100px',
      background: 'red',
      right: '0px'
    }}>
      <img src={link} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} />
    </div>
  )
}

function App() {
  const [text, setText] = useState('')

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex' }}>
          <div>
            <Container link={text} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box f={setText} link={'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg'}></Box>
            <Box f={setText} link={'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg'}></Box>
            <Box f={setText} link={'https://upload.wikimedia.org/wikipedia/commons/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg'}></Box>
            <Box f={setText} link={'https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg'}></Box>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
