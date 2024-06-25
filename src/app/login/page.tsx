'use client'
// import { supabase } from "@/src/lib/supabase"
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
      // const { data, error } = await supabase
      //   .auth
      //   .signUp({
      //     email: email,
      //     password: password
      //   })

      // if (error) {
      //   console.log("error in login", error);
      // }

      // if (data) {
      //   console.log("data", data);
      //   router.refresh()
      // }
    } catch (error) {
      console.log("error in login", error);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center gap-2 mx-auto mb-4 max-w-md text-foreground">
      <form
        className="flex flex-col flex-1 justify-center gap-2 mb-4 w-full text-foreground animate-in"
        onSubmit={login}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="bg-inherit mb-6 px-4 py-2 border rounded-md"
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
          className="bg-inherit mb-6 px-4 py-2 border rounded-md"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          onChange={(e) => { setData({ ...data, password: e.target.value }) }}
          value={data.password}
        />
        <button type="submit" className="bg-indigo-700 mb-2 px-4 py-2 rounded-md text-foreground">
          Login
        </button>
      </form>
    </div>
  )
}