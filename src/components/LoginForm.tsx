import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Simulate brief loading state
    await new Promise((resolve) => setTimeout(resolve, 300));

    toast.success("Login successful!");

    // Redirect to home page
    navigate("/home");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <span className="material-symbols-outlined text-primary text-xl">mail</span>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-charcoal placeholder:text-charcoal/50 focus:ring-primary h-12 w-full rounded-full border-none bg-white pr-4 pl-12 text-sm font-medium focus:ring-2"
          placeholder="Email Address"
          aria-label="Email Address"
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <span className="material-symbols-outlined text-primary text-xl">lock</span>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-charcoal placeholder:text-charcoal/50 focus:ring-primary h-12 w-full rounded-full border-none bg-white pr-4 pl-12 text-sm font-medium focus:ring-2"
          placeholder="Password"
          aria-label="Password"
        />
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <Link to="/forgot-password" className="text-primary text-xs font-semibold transition-opacity hover:opacity-80">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-charcoal h-12 w-full rounded-full bg-white text-lg font-bold shadow-lg transition-all hover:bg-gray-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
