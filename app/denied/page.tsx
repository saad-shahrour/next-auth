import { FunctionComponent } from "react";

interface DeniedProps {
    
}
 
const Denied: FunctionComponent<DeniedProps> = () => {
    return ( 
        <div>
            <h1 className="text-red-400">  
                Denied
            </h1>
        </div>
     );
}
 
export default Denied;