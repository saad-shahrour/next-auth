import { FunctionComponent } from "react";

interface CreateUserProps {
    
}
 
const CreateUser: FunctionComponent<CreateUserProps> = () => {
    return ( 
        <div>
            <h1>
                Only Admins
            </h1>
        </div>
     );
}
 
export default CreateUser;