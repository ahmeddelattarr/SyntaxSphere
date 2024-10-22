import { useNavigate } from "react-router-dom";
import { fetchWithToken } from "../../lib/utils";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const navigate = useNavigate();

    const homePageClickHandler = () => {
        navigate('/');
    };

    const handleLogout = () => {
        const refresh = localStorage.getItem("refresh");
        fetchWithToken(`signout/`, "POST", { refresh: refresh });
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 left-0 z-10 bg-black text-white py-4 px-6 flex justify-between items-center shadow-md ">
            <button onClick={homePageClickHandler} className="text-3xl font-bold">Syntax Sphere</button>
            <div className="flex space-x-4">
                <SearchBar />
                <button
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;