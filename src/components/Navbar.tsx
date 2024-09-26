'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = (): React.JSX.Element => {
    const pathname = usePathname();
    const router = useRouter();

    const logoutHandler = () => {
        const logout = window.confirm('Are you sure, you want to logout?');
        if (logout) {
            localStorage.clear();
            router.push('/login');
        }
    };

    return (
        <>
            <div className="navbar-container w-full flex justify-between sticky top-0 font-bold">
                <div className="flex items-center ml-4">
                    <div className="text-base font-bold cursor-default">
                        do<span className="logo-text-second text-2xl">Blogging</span>
                    </div>
                </div>
                {!['/signup', '/login'].includes(pathname) ? (
                    <div className="h-full flex items-center mr-8">
                        <div className={pathname === '/' ? 'active' : 'inactive'}>
                            <Link href="/">
                                <div className="mr-8"> Home </div>
                            </Link>
                        </div>
                        <div className={pathname === '/about' ? 'active' : 'inactive'}>
                            <Link href="/about">
                                <div className="mr-8"> About </div>
                            </Link>
                        </div>
                        <div
                            className="logout text-white py-1 px-4 rounded-md cursor-pointer"
                            onClick={logoutHandler}
                        >
                            {' '}
                            Logout{' '}
                        </div>
                    </div>
                ) : null}
            </div>
            <style jsx>{`
                .navbar-container {
                    height: 46px;
                    z-index: 99;
                    background-color: var(--bg-color);
                    box-shadow: 0px 2px 5px var(--grey-xl-light);
                    font-size: 13px;
                }
                .logo-text-second {
                    color: var(--button-color);
                }
                .active {
                    color: var(--button-color) !important;
                }
                .inactive {
                    color: black;
                }
                .logout {
                    background-color: var(--button-color);
                }
            `}</style>
        </>
    );
};

export default Navbar;
