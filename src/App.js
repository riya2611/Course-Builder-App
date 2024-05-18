import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import DisplayCourse from './components/DisplayCourse'

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
    <div>
      <Header data={data} setData={setData} />
      <DisplayCourse data={data} setData={setData} />
    </div>
  )
}

export default App