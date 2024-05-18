import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import DisplayCourse from './components/DisplayCourse'
import './App.css';

const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("dataKey")) || {
    modules: [],
    resources: [],
    links: []
  })

  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(data));
  }, [data]);

  return (
    <div className='main'>
      <Header data={data} setData={setData} />
      <DisplayCourse data={data} setData={setData} />
    </div>
  )
}

export default App