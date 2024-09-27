import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import {Link, useNavigate} from 'react-router-dom'
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button.tsx";
import { useState } from "react";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate()

  // this is actually not the best way to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const username = (event.target as any).username.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const password = (event.target as any).password.value;

    try {
      const response = await fetch("http://localhost:8000/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to sign in.");
        return;
      }

      const data:any = await response.json();
      localStorage.setItem('access',data.access);
      localStorage.setItem('refresh',data.refresh);
      navigate('/')
    } catch (error) {
      setErrorMessage(
        "An error occurred while signing in. Please try again." + error
      );
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
