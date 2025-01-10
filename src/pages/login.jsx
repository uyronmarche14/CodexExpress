import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import rus from "../assets/images/save.jpg";
import logo from "../assets/images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sign Up state
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [activeTab, setActiveTab] = useState("signin");

  // Handle the Sign In form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for admin credentials
    if (email === "admin@codexexpress.com" && password === "admin123") {
      navigate("/admin/calendar"); // Redirect to calendar page for admin
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data?.user) {
        navigate("/"); // Redirect to home page after successful login
      }
    } catch {
      setErrorMessage("An error occurred during sign in");
    }
  };

  // Handle the Sign Up form
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (signupPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            first_name: fname,
            last_name: lname,
            phone: phone,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data?.user) {
        alert("Check your email for the confirmation link!");
        setActiveTab("signin");
      }
    } catch {
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0b0f] font-roboto animate-fadeIn">
      {/* LEFT SIDE: Login / Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 py-12 bg-[#121217] animate-slideUp">
        <div className="w-full max-w-sm animate-scaleIn">
          {/* Brand/logo */}
          <div className="flex items-center justify-center mb-8">
            <img
              src={logo}
              alt="SmartSave"
              className="h-10 mr-2 object-contain hover:scale-110 transition-transform duration-300"
            />
            <span className="font-bold text-xl tracking-wide text-white hover:text-[#ffb347] transition-colors duration-300">
              Codex Express
            </span>
          </div>

          {/* Welcome */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white hover:scale-105 transition-transform duration-300">
              Welcome Back
            </h1>
            <p className="text-[#a7a9be] mt-1 hover:text-[#ffb347] transition-colors duration-300">
              Please enter your details
            </p>
          </div>

          {/* Sign In / Sign Up Tabs */}
          <div className="flex justify-center items-center bg-[#1f1f1f] rounded-md mb-6 text-sm">
            <button
              onClick={() => setActiveTab("signin")}
              className={`w-1/2 p-2 font-semibold transition-colors duration-300 hover:scale-[1.02] ${
                activeTab === "signin"
                  ? "bg-[#121217] text-white rounded-md shadow"
                  : "text-[#a7a9be]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 p-2 font-semibold transition-colors duration-300 hover:scale-[1.02] ${
                activeTab === "signup"
                  ? "bg-[#121217] text-white rounded-md shadow"
                  : "text-[#a7a9be]"
              }`}
            >
              Signup
            </button>
          </div>

          {/* SIGN IN FORM */}
          {activeTab === "signin" && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                               focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                               hover:shadow-md transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                  />
                  {email === "user@example.com" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                      &#10003;
                    </span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember */}
              <div className="flex justify-between items-center text-sm text-white">
                <label className="inline-flex items-center cursor-pointer hover:text-[#ffb347] transition-colors duration-300">
                  <input
                    type="checkbox"
                    className="rounded mr-2 focus:ring-0"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-[#ffb347] hover:text-orange-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-[#ff8906] text-white py-3 rounded-md font-semibold
                           hover:bg-[#e07b05] transform hover:scale-[1.02] transition
                           focus:outline-none focus:ring-2 focus:ring-[#ffb347]"
              >
                Continue
              </button>

              {/* Error */}
              {errorMessage && (
                <p className="text-red-500 text-center mt-2 animate-fadeIn">
                  {errorMessage}
                </p>
              )}
            </form>
          )}

          {/* SIGN UP FORM */}
          {activeTab === "signup" && (
            <form
              onSubmit={handleSignUp}
              className="space-y-5 mt-5 animate-fadeIn"
            >
              {/* Last Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="Doe"
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  First Name
                </label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="John"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="09xx-xxx-xxxx"
                />
              </div>

              {/* Email Contact */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Password
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="••••••••"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-white hover:text-[#ffb347] transition-colors duration-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white
                             focus:outline-none focus:ring-2 focus:ring-[#ffb347] placeholder-gray-400
                             hover:shadow-md transition duration-150 ease-in-out"
                  placeholder="••••••••"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-[#ff8906] text-white py-3 rounded-md font-semibold
                           hover:bg-[#e07b05] transform hover:scale-[1.02] transition
                           focus:outline-none focus:ring-2 focus:ring-[#ffb347]"
              >
                Register
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="text-center mt-5 text-xs text-[#a7a9be] leading-tight px-4 hover:text-[#ffb347] transition-colors duration-300">
            Join us at Codex Express to create systems that save time and money
            and make your life easier. We are here to help you.
            <br />
            <br />
            &copy; {new Date().getFullYear()} Codex Express. All rights
            reserved.
            <br />
            <br />
            <a href="#" className="text-[#ffb347] hover:text-orange-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Big illustration / background image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center animate-fadeIn"
        style={{
          backgroundImage: `url(${rus})`,
        }}
      >
        {/* Optionally place any overlay or text here if needed */}
      </div>
    </div>
  );
}
