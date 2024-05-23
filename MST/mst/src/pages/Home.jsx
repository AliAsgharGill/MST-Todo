import { observer } from 'mobx-react-lite'
import userStore from '../models/userStore'
import { useState } from 'react'
const Home = () => {

  const [marks, setMarks] = useState(0)
  const [pyMarks, setPyMarks] = useState(0)

  const handleMathMarks = () => {
    userStore.setMathMarks(parseInt(marks))
  }
  const handlePhysicsMarks = () => {
    userStore.setPhysicsMarks(parseInt(pyMarks))
  }

  const handleMarksWithApi = () => {
    userStore.getMarksWithApi()
  }
  return (
    <>
      <h1>Home Page</h1>
      <div className='min-h-screen flex flex-col justify-evenly items-center  ' >
        <div>

          <h2>User Name: {userStore.userName}</h2>
          <h2>Math Marks: {userStore.math}</h2>
          <h2>Physics Marks: {userStore.physics}</h2>
          <h2>Total Marks: {userStore.totalMarks}</h2>
          <h2>Percentage: {userStore.percentage}%</h2>
        </div>
        <div className='flex space-x-5'>
          <input value={marks} placeholder='Math Marks' onChange={(e) => setMarks(e.target.value)} className='text-black p-3  ' />
          <button onClick={handleMathMarks} >Update Math Marks</button>

          <input value={pyMarks} placeholder='Physics Marks' onChange={(e) => setPyMarks(e.target.value)} className='text-black p-3  ' />
          <button onClick={handlePhysicsMarks} >Update Physics Marks</button>
          <button onClick={handleMarksWithApi} >Marks With API</button>
        </div>
      </div>
    </>
  )
}

export default observer(Home)
