import React from 'react'

const Dashboard = ({children}: {children:  React.ReactNode}) => {

  return (
    <div className='bg-black'>
      <h1 className='bg-red-300'>Header</h1>
        {children}
    </div>
  )
}

export default Dashboard