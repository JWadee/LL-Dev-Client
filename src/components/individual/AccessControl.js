// src/components/NavBar.js

import React, {useState, useEffect} from "react";

const AccessControl = (props) => {
    const [permitted, setPermitted]  = useState(false);

    /*Runs only on initial render
      Will send token to API and fetch user permissions  
      userPermissions will be updated
    */
    useEffect(() => {
      let perm = false;
      for(let i = 0; i < props.permissions.length; i++){
          if(props.allowedPermissions.includes(props.permissions[i])){
             perm = true;
          };
      }
      setPermitted(perm)
    },[])
    
    return (
        <span>
            {permitted && props.protectedResource}
            {!permitted && null}
        </span>
    );
};

export default AccessControl;