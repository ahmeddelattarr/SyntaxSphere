import { useState } from "react";
import { Button } from "./ui/common/Button.tsx";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import InputField from "./ui/common/InputField.tsx";
import { API_URL } from "../../config/apiConfig.ts";

interface errorResponse {
  username: string[];
}

const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (username.trim().length < 1) {
      setErrorMessage('Username must be at least 1 character long.');
      return;
    }

    if (firstName.trim().length < 4) {
      setErrorMessage('First Name must be at least 4 characters long.');
      return;
    }
    if (lastName.trim().length < 4) {
      setErrorMessage('Last Name must be at least 4 characters long.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        const errorData: errorResponse = await response.json();
        setErrorMessage(errorData.username[0] || "Failed to sign up.");
        return;
      }

      await response.json();
      setSuccessMessage("Sign-up successful! You can now log in.");
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error) {
      setErrorMessage("An error occurred while signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
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
              label="First Name"
              id="first_name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              id="last_name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Sign Up
            </Button>
          </div>
          {errorMessage && (
            <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-center text-sm text-green-600">{successMessage}</p>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">Log in</Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;