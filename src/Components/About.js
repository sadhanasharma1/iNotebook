import React from 'react'
import {Link} from 'react-router-dom'


export default function About() {

  return (
    <div>
      <div className="container flex-"></div>
       
<section className="py-3 py-md-5 py-xl-8">
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
        <h2 className="mb-4 display-5 text-center">About Us</h2>
        <p className="text-secondary mb-5 text-center lead fs-4">Welcome to SecureNotes, your personal haven for securely storing and managing your notes. Our platform empowers you to create an account and keep your notes safe, private, and easily accessible. Whether you're jotting down ideas, keeping track of important information, or maintaining a personal journal, SecureNotes ensures your data remains protected with state-of-the-art security measures.</p>
        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
       
        
      </div>
    </div>
  </div>
  
  <div className="container">
    <div className="row gy-4 gy-lg-0 align-items-lg-center">
      <div className="col-12 col-lg-6">
        <img className="w-75 h-100 img-fluid rounded border border-dark" loading="lazy" src="pic/about.jpg" alt="About Us"/>
      </div>
      <div className="col-12 col-lg-6 col-xxl-6">
        <div className="row justify-content-lg-end justify-content-xxl-around">
          <div className="col-12 col-lg-11 col-xxl-10">
           
          <p className="text-secondary mb-5 text-center fs-4">We prioritize your privacy and provide a seamless user experience, so you can focus on what matters most—your thoughts and tasks. Join us and experience the peace of mind that comes with knowing your notes are secure and exclusively yours.</p>
 

          <Link className="btn btn-primary mx-1" to="/login" role="button">
              Get Started &rarr;
          
              </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
