import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "./ui/common/Button.tsx";
import { useState } from "react";
import { API_URL } from "../../config/apiConfig.ts";
import InputField from "./ui/common/InputField.tsx";

interface SignInResponse {
  access: string;
  refresh: string;
}

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().length < 1) {
      setErrorMessage('Username must be at least 1 character long.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to sign in.');
        return;
      }

      const data: SignInResponse = await response.json();
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/');
    } catch (error) {
      setErrorMessage('An error occurred while signing in. Please try again.');
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <InputField
              label="Username"
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="sign">
              Sign In
            </Button>
            {/* <GithubSignInIcon /> */}
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default SignIn;