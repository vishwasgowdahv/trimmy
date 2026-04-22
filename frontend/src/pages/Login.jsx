import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div className="flex justify-center items-center h-full flex-col my-20">
      <div className="flex justify-left items-center mx-10 my-5">
        <img className="w-10 h-10" src="/src/assets/link.png" alt="" />
        <h1 className="text-3xl font-bold mx-2 my-5 ">Login</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signup" className="text-blue-500">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        {error && (
          <p className="text-red-500 text-sm text-center font-bold">{error}</p>
        )}
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleSubmit} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
