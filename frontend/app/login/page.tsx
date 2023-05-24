"use client";
import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeading from "../components/ui/PageHeading";
import { useSupabase } from "../supabase-provider";

export default function Login() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      alert(`Error logging in: ${error.message}`);
    } else if (data) {
      console.log("User logged in:", data);
      alert("Login successful!");
    }
  };

  return (
    <main>
      <section className="w-full outline-none pt-20 flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Login" subtitle="Welcome back"/>
        <Card className="w-1/2 flex justify-center items-center">
          <div className="text-center mt-2 p-6 max-w-sm w-full flex flex-col gap-5 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="text-center"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-center"
            />
            <div className="flex justify-center gap-3">
              <Button onClick={handleLogin}>Login</Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
