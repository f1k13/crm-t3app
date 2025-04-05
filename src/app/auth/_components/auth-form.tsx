"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const AuthForm = () => {
  const utils = api.useUtils();
  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const signIn = api.auth.signUp.useMutation({
    onSuccess: async (data) => {
      await utils.auth.invalidate();
      setLogin("");
      document.cookie = `token=${data.token}; path=/`;
      console.log("Current cookies:", document.cookie);
      setPassword("");
    },
  });
  console.log(signIn);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn.mutate({ login, password });
      }}
    >
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="LOGIN"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="PASS"
      />
      <button type={"submit"}>отправить</button>
    </form>
  );
};

export default AuthForm;
