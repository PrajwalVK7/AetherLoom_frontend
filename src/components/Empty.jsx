import React from 'react'
import animation from '../assets/animations/Animation - 1709045845611.json'
import Lottie from 'lottie-react'

function Empty() {
  return (
    <div>
        <Lottie animationData={animation} />
    </div>
  )
}

export default Empty