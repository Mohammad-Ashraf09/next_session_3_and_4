'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <div className="logo-text-first">
                    do<span className="logo-text-second">Blogging</span>
                </div>
            </div>
            <div className="navbar-right">
                <Link href="/" className={pathname === '/' ? 'active' : 'inactive'}>
                    <div className="nav"> Home </div>
                </Link>
                <Link href="/about" className={pathname.includes('/about') ? 'active' : 'inactive'}>
                    <div className="nav"> About </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
