import React, { useState } from 'react'
import Header from './components/Header'
import DisplayCourse from './components/DisplayCourse'

const App = () => {
  const [data, setData] = useState({
    modules: [],
    resources: [],
    links: []
  })


  return (
    <div>
      <Header data={data} setData={setData} />
      <DisplayCourse data={data} setData={setData} />
    </div>
  )
}

export default App