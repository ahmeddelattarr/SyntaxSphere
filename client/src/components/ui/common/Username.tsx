import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UsernameProps {
    children: ReactNode;
    userId: number;
}

const Username: React.FC<UsernameProps> = ({ children, userId }) => {
    const navigate = useNavigate();
    const usernameClickHandler = () => {
        navigate(`/user/${userId}`);
    };
    return <h2 className="text-white font-semibold text-lg cursor-pointer hover:underline" onClick={usernameClickHandler}>
        {children}
    </h2>;
};

export default Username;