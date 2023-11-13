import { FunctionComponent } from "react";
import UserForm from "../Components/UserForm";

interface CreateUserProps {
    
}
 
const CreateUser: FunctionComponent<CreateUserProps> = () => {
    return ( 
        <div>
            <UserForm/>
        </div>
     );
}
 
export default CreateUser;