'use client'
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [data, setData] = useState<{ email: string; password: string }>({ email: '', password: '' })
  const router = useRouter()
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = data.email
    const password = data.password
    try {
      console.log(email, password);
      const { data, error } = await supabase
        .auth
        .signUp({
          email: email,
          password: password
        })

      if (error) {
        console.log("error in login", error);
      }

      if (data) {
        console.log("data", data);
        router.refresh()
      }
    } catch (error) {
      console.log("error in login", error);
    }
  }

  return (
    <div className="max-w-md mx-auto flex-1 flex flex-col justify-center gap-2 text-foreground mb-4">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
        onSubmit={login}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => { setData({ ...data, email: e.target.value }) }}
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          onChange={(e) => { setData({ ...data, password: e.target.value }) }}
          value={data.password}
        />
        <button type="submit" className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
          Login
        </button>
      </form>
    </div>
  )
}