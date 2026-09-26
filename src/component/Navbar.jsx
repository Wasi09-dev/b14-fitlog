'use client';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { EllipsisVertical } from 'lucide-react';
import { PlanContext } from '@/context/PlanContext';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
    const pathname = usePathname();
    const { plan, saved } = useContext(PlanContext);

    return (
        <nav className='bg-base-100 shadow-sm'>
        <div className="navbar container mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div className='flex gap-2 items-center'>
     <Image src={logo} alt='logo'/>
   FITLOG
    </div>
  </div>
<div className="navbar-center hidden gap-2 lg:flex">
    <Link
        href="/"
        className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition ${
            pathname === '/' ? 'bg-lime-400 text-black' : 'text-gray-400 hover:text-white'
        }`}
    >
        Workouts
    </Link>
    <Link
        href="/my-plan"
        className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition ${
            pathname === '/my-plan' ? 'bg-lime-400 text-black' : 'text-gray-400 hover:text-white'
        }`}
    >
        My Plan
    </Link>
</div>
  <div className="navbar-end flex items-center gap-5 text-xs text-gray-400">
    <span className="flex items-center gap-1.5">
        Plan
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
            {plan.length}
        </span>
    </span>
    <span className="flex items-center gap-1.5">
        Saved
        <span className="text-white">{saved.length}</span>
    </span>
    <EllipsisVertical size={18} />
</div>
</div>
</nav>
    );
};

export default Navbar;