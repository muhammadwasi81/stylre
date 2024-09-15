import React from 'react'
import { Button } from '@mui/material'
import Layout from './Layout'

// Import SVGs as React components
import { ReactComponent as ApparealIcon } from '../assets/svg/appearel.svg'
import { ReactComponent as BeautyIcon } from '../assets/svg/beauty.svg'
import { ReactComponent as FormalIcon } from '../assets/svg/formal.svg'
import { ReactComponent as AthleticIcon } from '../assets/svg/athletic.svg'
import { ReactComponent as FragranceIcon } from '../assets/svg/fragnance.svg'
import { ReactComponent as KidsIcon } from '../assets/svg/kids.svg'
import { ReactComponent as ShoesIcon } from '../assets/svg/shoes.svg'

import { ReactComponent as Zara } from '../assets/svg/zara.svg'
import { ReactComponent as Nordstrom } from '../assets/svg/nordstorm.svg'
import { ReactComponent as OldNavy } from '../assets/svg/oldnavy.svg'
import { ReactComponent as FootLocker } from '../assets/svg/footlocker.svg'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

import { ReactComponent as FooterLeave } from '../assets/svg/footerleave.svg'

const CategoryButton = ({ icon: Icon, label }) => (
  <button className="cursor-pointer flex flex-col sm:flex-row items-center justify-center p-2 gap-2 bg-gray-100 rounded-lg w-full">
    <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-0" />
    <span className="text-xs font-semibold text-black">{label}</span>
  </button>
)

const RetailerCard = ({ icon: Icon, name }) => (
  <div className="relative overflow-hidden rounded-lg w-full p-2">
    <div className="relative pb-[75%]">
      {' '}
      {/* 4:3 aspect ratio */}
      <Icon className="absolute top-0 left-0 w-full h-full object-cover" />
      <button className="absolute rounded-lg bottom-0 left-0 right-0 bg-orange-500 text-white font-semibold p-2 text-center text-xs sm:text-sm">
        {name}
      </button>
    </div>
  </div>
)

const NewDashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="container mx-auto px-4 mt-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden mb-8">
          <div className="w-full md:w-1/2 bg-[#0C1E33] text-white p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-orange-500">Your Style</span> DELIVERED
            </h2>
            <ul className="mb-6 text-center">
              <li>
                <strong>SKIP</strong> the lines
              </li>
              <li>
                <strong>Track</strong> your order pickup
              </li>
              <li>
                <strong>WORRY FREE</strong> secure delivery
              </li>
            </ul>
            <Button
              variant="contained"
              sx={{
                background: '#FF7009',
                borderRadius: 20,
                width: '100%',
                '&:hover': {
                  background: '#FF7009',
                  opacity: 0.8,
                },
              }}
              size="large"
            >
              Schedule a Pickup
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://stylre-landing-page.vercel.app/assets/hero@3x-D_XkeF0m.png"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <CategoryButton icon={ApparealIcon} label="Apparel" />
          <CategoryButton icon={BeautyIcon} label="Beauty" />
          <CategoryButton icon={AthleticIcon} label="Athletics" />
          <CategoryButton icon={ShoesIcon} label="Shoes" />
          <CategoryButton icon={KidsIcon} label="For Kids" />
          <CategoryButton icon={FormalIcon} label="Formal" />
          <CategoryButton icon={FragranceIcon} label="Fragrances" />
        </div>

        {/* Retailers Section */}
        <h3 className="text-xl font-bold mb-4">
          ORDER PICKUPS FROM YOUR FAVORITE RETAILERS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <RetailerCard icon={Nordstrom} name="NORDSTROM" />
          <RetailerCard icon={Zara} name="ZARA" />
          <RetailerCard icon={FootLocker} name="FOOT LOCKER" />
          <RetailerCard icon={OldNavy} name="OLD NAVY" />
        </div>

        {/* Tester Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#FFEFEC] rounded-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col mb-4 md:mb-0 md:mr-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Become a Style.Re Tester
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              We're launching something amazing, request to join our test group
              and get free pickups.
            </p>
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="w-full md:w-[350px] h-12 bg-white rounded-full pl-4 pr-24 border-none focus:outline-none"
            />
            <button className="absolute right-1 top-1 bg-[#FF7009] text-white rounded-full font-semibold px-4 py-2 h-10">
              Submit
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#FFEFEC] px-4 md:px-8 text-sm">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start py-8">
              <div className="mb-6 md:mb-0">
                <img
                  src={'/Logo.png'}
                  alt="Style.re"
                  className="h-6 w-[100px] mb-4"
                />
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook">
                    <FaFacebookF className="text-gray-600" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <FaTwitter className="text-gray-600" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-gray-600" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Company</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Partner with Us</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Style.Re Account
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#">Login/Sign up</a>
                    </li>
                    <li>
                      <a href="#">Order Pickups</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between py-4 border-t border-[#FF6600]">
              <p className="text-[10px] text-black flex items-center mb-4 md:mb-0">
                <span className="mr-2">
                  <FooterLeave className="h-4 w-4" />
                </span>
                © 2024 Style.Re Unlimited & Co. All rights reserved. Style.Re
                and its services are not affiliated or endorsed by the retailers
                on this site. Style.Re does not operate in Alaska.
              </p>
              <div className="flex space-x-4 text-xs text-gray-600">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}

export default NewDashboard
