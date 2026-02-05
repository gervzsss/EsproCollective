import { Link } from "react-router-dom";
import { TopographicalPattern, BrandHeader } from "@/components/ui";
import { LoginForm } from "../components";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Top Section - Cream Background with Brand */}
      <div className="bg-cream relative flex flex-1 flex-col items-center justify-center overflow-hidden p-8">
        <TopographicalPattern />
        <BrandHeader />
      </div>

      {/* Bottom Sheet - Charcoal with Form */}
      <div className="bg-charcoal relative flex min-h-[55vh] flex-col rounded-t-3xl px-8 pt-12 pb-10 shadow-2xl">
        {/* Handle Bar */}
        <div className="absolute top-4 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/20" />

        {/* Form Content */}
        <div className="mx-auto flex h-full w-full max-w-sm flex-col">
          <h2 className="text-primary mb-8 text-left text-3xl font-bold">Login</h2>

          <LoginForm />

          {/* Footer */}
          <div className="mt-auto pt-8 text-center text-xs">
            <p className="text-white/80">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
