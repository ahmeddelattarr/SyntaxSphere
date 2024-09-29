import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    //TODO
    const handleLogout = () => {
        localStorage.removeItem("access");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 left-0 w-full z-10 bg-black text-white py-4 px-6 flex justify-between items-center shadow-md">
            <h1 className="text-3xl font-bold">Syntax Sphere</h1>
            <div className="flex space-x-4">
                <button
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar;