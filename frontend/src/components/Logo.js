import React from 'react'
import clipfart from '../assest/swiftcart-high-resolution-logo-transparent (1).png';

const Logo = ({w,h}) => {
  return (
    <div>
      <img src={clipfart} width={w} height={h} alt='logo'/>
    </div>
  )
}

export default Logo
