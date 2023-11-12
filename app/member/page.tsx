import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

interface MemberProps {
    
}
 
const Member: FunctionComponent<MemberProps> = async () => {

    const session = await getServerSession(options)

    if (!session) {
        redirect("api/auth/signin?callbackUrl=/member")
    }

    return ( 
        <div>
            <h1>
                Member Session
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
 
export default Member;