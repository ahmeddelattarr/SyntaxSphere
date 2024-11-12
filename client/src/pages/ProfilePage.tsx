import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import InputField from "../components/ui/common/InputField";
import { Label } from "@radix-ui/react-label";
import TextArea from "../components/ui/common/TextArea";
import { Button } from "../components/ui/common/Button";
import { fetchWithToken } from "../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../types/user-interface";

const ProfilePage = () => {
    const username = useParams().username!;
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData>({ bio: "", git_hub_account: "", user_id: 0, is_my_own_profile:true });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentBio = async () => {
            const response = await fetchWithToken(`profiles/${username}/`, "GET");
            if (!response.ok) {
                navigate('/login');
                return;
            }
            const data: UserData = await response.json();
            setUser(data);
        };
        fetchCurrentBio();
    }, [navigate, username]);



    const handleSubmit = async (e: React.FormEvent) => {
        async function validateGitHubUsername(username:string) {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                return response.ok;
            } catch (error) {
                console.error("GitHub validation error:", error);
                return false;
            }
        }

        e.preventDefault();
        setError(null);

        if (user.bio.trim().length < 1) {
            setError("Bio is required and must be at least one character.");
            return;
        }

        if (user.git_hub_account) {
            const isValidGitHubUsername = await validateGitHubUsername(user.git_hub_account);
            if (!isValidGitHubUsername) {
                setError("Please enter a valid GitHub username.");
                return;
            }
        }

        try {
            const response = await fetchWithToken(`profiles/${username}/`, "PUT", {
                bio: user.bio,
                git_hub_account: user.git_hub_account,
                username: username
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Failed to update profile.");
                return;
            }
            console.log("Profile updated successfully.");
            navigate('/');
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen w-full text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-4">
                <div className="bg-gray-900 p-6 pt-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <Label className="block text-white mb-2">Bio</Label>
                        <TextArea
                            name="bio"
                            value={user.bio || ""}
                            onChange={(event) => {
                                setUser(prevState => {
                                    return { ...prevState, bio: event.target.value };
                                });
                            }}
                            placeholder="Enter your bio"
                            variant={"bio"}
                        />

                        <InputField
                            id="github"
                            label="GitHub Account"
                            value={user.git_hub_account || ""}
                            onChange={(event) => {
                                setUser(prevState => {
                                    return { ...prevState, git_hub_account:event.target.value };
                                });
                            }}
                            type="text"
                            placeholder="Enter your GitHub Account (optional)"
                            variant="github"
                        />

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <Button
                            variant="blue"
                            type="submit"
                            className="w-full bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
