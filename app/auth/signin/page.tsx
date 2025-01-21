"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      router.push("/master");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let responseClone; // 1
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      responseClone = response.clone(); // 2
      const data = await response.json();

      if (response.ok) {
        router.push("/master");
      } else {
        setError(data.message);
      }
    } catch (rejectionReason) {
      console.log(
        "Error parsing JSON from response:",
        rejectionReason,
        responseClone
      ); // 4
      if (responseClone) {
        const bodyText = await responseClone.text(); // 5
        console.log("Received the following instead of valid JSON:", bodyText); // 6
        setError("An error occurred while processing your request.");
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <main className="mt-0 transition-all duration-200 ease-soft-in-out">
      <section>
        <div className="flex justify-center items-center min-h-screen mt-0 transition-all duration-200 ease-soft-in-out">
          <div className="container z-10">
            <div className="flex flex-wrap mt-0 -mx-3">
              <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Enter your Username and password to sign in
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form role="form" onSubmit={handleSubmit}>
                      <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                        Username
                      </label>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                        Password
                      </label>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Remember Me
                          </span>
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                        >
                          Sign in
                        </button>
                      </div>
                      {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
