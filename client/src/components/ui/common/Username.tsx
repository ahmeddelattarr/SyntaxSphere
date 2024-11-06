import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UsernameProps {
    children: ReactNode;
    username: string;
    disable:boolean|undefined
}

const Username: React.FC<UsernameProps> = ({ children, username,disable=false }) => {
    const navigate = useNavigate();
    const usernameClickHandler = () => {
        if(disable)
            return;
        navigate(`/user/${username}`);
    };
    return <h2 className="text-white font-semibold text-lg cursor-pointer hover:underline" onClick={usernameClickHandler}>
        {children}
    </h2>;
};

export default Username;