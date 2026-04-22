import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

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

const Signup = () => {
  const { register, loading, error, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      if (!error) {
        setSuccess("Signup successful! Check your email.");
      }
    } catch (err) {
      // handled in context
    }
  };
  return (
    <div className="flex justify-center items-center h-full flex-col my-20">
      <div className="flex justify-left items-center mx-10 my-5">
        <img className="w-10 h-10" src="/src/assets/link.png" alt="" />
        <h1 className="text-3xl font-bold mx-2 my-5 ">Signup</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email to create an account
          </CardDescription>
          <CardAction>
            <Link to="/login" className="text-blue-500">
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  alue={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        {/* Error */}
        {error ? (
          <p className="text-red-500 text-sm text-center font-bold">{error}</p>
        ) : (
          <p className="text-green-600 text-sm text-center font-bold">
            {success}
          </p>
        )}

        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleSubmit} className="w-full">
            {loading ? "Creating account..." : "Signup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
