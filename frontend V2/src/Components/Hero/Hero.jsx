import React from 'react'
import './Hero.css'
import model from '../Assets/Pursuit Model 1.png'

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>PERFORMANCE APPAREL</h2>
        <p>Discover high-performance gear</p>
        <p>designed for your active lifestyle</p>
        <div className="hero-latest-btn">
          <div>Latest</div>
        </div>
      </div>
      <div className="hero-right">
        <img src={model} alt="" />
      </div>
    </div>
  )
}


export default Hero;