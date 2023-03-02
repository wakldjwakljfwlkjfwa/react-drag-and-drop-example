import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function Container() {
  const [link, setLink] = useState('')

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'draggable',
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
      drop: (item, monitor) => {
        return { setLink }
      }
    })
  )

  return (
    <div ref={drop} style={{
      'background': 'green',
      width: '200px',
      height: '200px'
    }}>
      <img
        src={link}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} />
    </div>
  )
}

function Box({ link }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'draggable',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const { setLink } = monitor.getDropResult()
        setLink(link)
      }
    }
  }))

  return (
    <div ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      width: '100px', height: '100px',
      background: 'red',
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
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '400px',
            height: '400px',
            display: 'grid',
            gridTemplateColumns: 'auto auto'
          }}>
            <Container />
            <Container />
            <Container />
            <Container />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box link={'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg'}></Box>
            <Box link={'https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg'}></Box>
            <Box link={'https://upload.wikimedia.org/wikipedia/commons/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg'}></Box>
            <Box link={'https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg'}></Box>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
