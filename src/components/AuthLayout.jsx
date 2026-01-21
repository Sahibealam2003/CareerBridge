import React from 'react';
import jobimg from '../assets/Images/Job.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-gray-900 flex items-center justify-center to-gray-600">
      
      {/* Left side: Form */}
      <div className="w-1/2 flex items-center justify-center ">
        {children} {/* Login or Signup form rendered here */}
      </div>

      {/* Right side: Image */}
      <div className="w-1/2 md:flex justify-end hidden">
        <img
          src={jobimg}
          alt="Job"
          className="max-w-full h-screen  object-contain"
        />
      </div>
      
    </div>
  );
};

export default AuthLayout;
