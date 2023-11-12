"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";



interface clientMemberProps {
    
}
 
const clientMember: FunctionComponent<clientMemberProps> = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("api/auth/signin?callbackUrl=/clientmember")
        }
    })
    return ( 
        <div>
            <h1>
                Client Member Session
            </h1>
            <p>
                {session?.user?.email}
            </p>
            <p>
                {session?.user?.role}
            </p>
        </div>
     );
}
 
export default clientMember;