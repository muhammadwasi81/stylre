import React from 'react'
import { FaGoogle, FaApple } from 'react-icons/fa'

const SocialSignUpButtons = ({ activeTab }) => {
  return (
    <div className="space-y-4 w-full max-w-[454px]">
      <button
        onClick={() => {}}
        className="w-full h-16 border border-black-100 rounded-full text-gray-700 px-6 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
      >
        <FaGoogle className="mr-4 h-6 w-6" />
        <span className="text-lg font-semibold">
          Sign {activeTab === 'signup' ? 'up' : 'in'} with Google
        </span>
      </button>
      <button
        onClick={() => {}}
        className="w-full h-16 border border-gray-300 rounded-full text-gray-700 px-6 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
      >
        <FaApple className="mr-4 h-6 w-6" />
        <span className="text-lg font-semibold">
          Sign {activeTab === 'signup' ? 'up' : 'in'} with Apple
        </span>
      </button>
    </div>
  )
}

export default SocialSignUpButtons
