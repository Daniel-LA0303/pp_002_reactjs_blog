import { Avatar, Tooltip } from "@mui/material"
import { UserSimpleInfoI } from "../types/user"
import { Link } from "react-router-dom"


const CircularButton: React.FC<UserSimpleInfoI> = ({userId, username, profilePicture}) => {    
    
  return (
    <div className="mr-1 my-2">
        <Tooltip title={username} arrow>
            <Link to={`/profile/${userId}`} style={{ textDecoration: 'none' }}>
                <Avatar
                    src={`${profilePicture}`}
                    alt="User"
                    sx={{
                        width: 45,  
                        height: 45, 
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.01)",
                        },
                    }}
                />
            </Link>
        </Tooltip>
    </div>
  )
}

export default CircularButton