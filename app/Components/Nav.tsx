import { FunctionComponent } from "react";
import Link from "next/link"
import { getServerSession } from "next-auth";
import {options} from "../api/auth/[...nextauth]/options"

interface NavProps {
    
}
 
const Nav: FunctionComponent<NavProps> = async () => {
    const session = await getServerSession(options)
    return ( 
        <nav className="bg-gray-600 text-green-100 flex justify-between items-center w-full px-10 py-4">
            <div>My Site</div>
            <div className="flex gap-10">
                <Link href="/">Home</Link>
                <Link href="/createuser">Create User</Link>
                <Link href="/clientmember">Client Member</Link>
                <Link href="/member">Member</Link>
                <Link href="/public">Public</Link>
                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                ) : (
                    <Link href="/api/auth/signin">Login</Link>
                )}
            </div>
        </nav>
    );
}
 
export default Nav;