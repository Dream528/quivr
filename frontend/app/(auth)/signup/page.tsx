/* eslint-disable */
"use client";
import Link from "next/link";
import { useState } from "react";

import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import Field from "@/lib/components/ui/Field";
import PageHeading from "@/lib/components/ui/PageHeading";
import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useToast } from "@/lib/hooks/useToast";

export default function SignUp() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();
  const handleSignUp = async () => {
    setIsPending(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      publish({
        variant: "danger",
        text: `Error signing up: ${error.message}`,
      });
    } else if (data) {
      publish({
        variant: "success",
        text: "Confirmation Email sent, please check your email",
      });
    }
    setIsPending(false);
  };

  return (
    <main>
      <section className="min-h-[80vh] w-full h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Sign Up" subtitle="Create your account" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            className="flex flex-col gap-2"
          >
            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <Button isLoading={isPending}>Sign Up</Button>
              <Link href="/login">Already registered? Sign in</Link>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
