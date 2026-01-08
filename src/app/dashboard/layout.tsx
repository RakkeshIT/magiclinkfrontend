import React from 'react'

const layout = ({children}: {children:  React.ReactNode}) => {

  return (
    <div className='bg-black'>
        {children}
    </div>
  )
}

export default layout