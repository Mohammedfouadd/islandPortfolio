import React from 'react'
import { Link } from 'react-router-dom'
import { socialLinks } from '../constants'
const CTA = () => {
  return (
    <section className=''>

      <div className='cta'>
      <p className='cta-text'>Have a project in mind? <br className='sm:block hidden' />
      Let's bulid something together! </p>
        <Link to="/contact" className='btn'>
            Contact
        </Link>
      </div>
     
          
        
   
    </section>
    
  )
}

export default CTA
