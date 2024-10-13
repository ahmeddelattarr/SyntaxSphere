import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { API_URL } from "../../../../config/apiConfig";
import { useState } from "react";

const GithubSignInIcon = () => {
    const [error, setError] = useState('');
    const logInWithGithub = async() => {
        window.location.href = `${API_URL}/accounts/github/login/`;

        // const response = await fetch(`${API_URL}/accounts/github/login/`);
        // console.log(response);
        // window.location.href = `${API_URL}/accounts/github/login/callback/`;
    };
return (
    <><button onClick={logInWithGithub} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-9 px-4 py-2 w-full">
        <GitHubLogoIcon className="mr-2 w-5 h-5" />
        Log in with GitHub
    </button>
        {error}
    </>
);
};

export default GithubSignInIcon;