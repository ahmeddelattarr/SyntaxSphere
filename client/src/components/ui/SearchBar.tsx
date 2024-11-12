import { MagnifyingGlassIcon } from '@radix-ui/react-icons'; // Assuming you're using Radix icons, replace with your icon library
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './common/Input';

const SearchBar: React.FC = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${searchText.trim()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500">
            <Input
                variant='search'
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={"Search..."}
            />
            <button type="submit" className="p-1">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            </button>
        </form>
    );
};

export default SearchBar;
