import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="bg-cream flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-charcoal mb-4 text-4xl font-bold">Sign Up</h1>
      <p className="text-charcoal/70 mb-8">This page is coming soon.</p>
      <Link to="/login" className="bg-primary rounded-full px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
        Back to Login
      </Link>
    </div>
  );
}
