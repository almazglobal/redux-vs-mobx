import React from "react";

type UserType = {
    name: string
    email: string
}
export const Users: React.FC<UserType> = ({name, email}) => {
    return (
       <div>
           {`Name: ${name} Email: ${email}`}
       </div>
    )
}