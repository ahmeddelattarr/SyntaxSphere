import { Button } from './ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card.tsx'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { signInViaEmailAndPassword } from '../db/auth.service.ts'

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = (event.target as any).email.value
    const password = (event.target as any).password.value

    await signInViaEmailAndPassword(email, password)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#"
                   className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password"
                     type="password"
                     required />
            </div>
            <Button type="submit"
                    className="w-full">
              Login
            </Button>
            <Button variant="outline"
                    className="w-full">
              Login with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#"
               className="underline">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}