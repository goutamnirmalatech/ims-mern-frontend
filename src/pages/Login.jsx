import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white w-full py-2"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            Invalid credentials
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
