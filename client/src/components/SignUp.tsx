import { useState } from "react";
import { Button } from "./ui/button.tsx";
import {useNavigate,Link} from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // this is actually not the best way to handle form submission any
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const username = (event.target as any).username.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const email = (event.target as any).email.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const password = (event.target as any).password.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstName = (event.target as any).first_name.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastName = (event.target as any).last_name.value;

    try {
      const response = await fetch("http://localhost:8000/signup/", {
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
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to sign up.");
        return;
      }

      await response.json();
      setSuccessMessage("Sign-up successful! You can now log in.");
      navigate('/login')
    } catch (error) {
      setErrorMessage(
        "An error occurred while signing up. Please try again." + error
      );
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          {errorMessage && (
            <p className="mt-4 text-center text-sm text-red-600">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-4 text-center text-sm text-green-600">
              {successMessage}
            </p>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
