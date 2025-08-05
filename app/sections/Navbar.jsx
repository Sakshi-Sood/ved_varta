import React from 'react'
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className='sticky top-0 border-b border-amber-200 px-10 py-1 flex justify-between items-center bg-white/90'>
      <div className='text-2xl font-bold flex items-center space-x-2'>
      <Image src="/logo2.jpg" alt="Logo" width={70} height={70} />
      <span>VedVarta</span>
      </div>
      <ul className='flex space-x-4'>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar