import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Fuel your performance with Pursuit Athletics, the ultimate online destination for premium athletic gear, apparel, and accessories. Whether you're training, competing, or recovering, we offer top-tier products from leading brands to help you push limits and achieve your goals.</p>
            <p>Built for athletes of all levels, [Your Brand Name] combines cutting-edge technology, expert curation, and unbeatable value to support every step of your fitness journey. Shop with confidence and train with purpose—your next personal best starts here. </p>
        </div>
    </div>
  )
}

export default DescriptionBox;