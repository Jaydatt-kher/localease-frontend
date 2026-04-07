import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation, useGoogleAuthMutation } from "../api/authApi";
import { setCredentials } from "../redux/authSlice";
import { toggleTheme, selectIsDark } from "../redux/themeSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdDarkMode, MdOutlineLightMode, MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { RiArrowRightLine } from "react-icons/ri";
import { TbGift } from "react-icons/tb";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const res = await googleAuth({
        fullName: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL
      }).unwrap();
      if (res?.user) dispatch(setCredentials(res.user));
      toast.success(res.message || "Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Google sign-up failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6 || formData.password.length > 16) { toast.error("Password must be 6–16 characters."); return; }
    try {
      const payload = { ...formData };
      if (referralCode.trim()) payload.referredBy = referralCode.trim();
      await signUp(payload).unwrap();
      toast.success("Account created! Please verify your email.");
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-body transition-colors duration-300">

      {}
      <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-display font-extrabold no-underline">
              <img
                src="/logo.png"
                alt="LocalEase"
                className="h-20 w-auto object-contain"
                style={{ maxWidth: "200px" }}
              />
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-lg text-muted dark:text-muted-dark hover:bg-border dark:hover:bg-border-dark transition-colors">
                {isDark ? <MdOutlineLightMode size={20} className="text-yellow-400" /> : <MdDarkMode size={20} />}
              </button>
              <Link to="/signin" className="text-sm font-semibold px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary-light dark:hover:bg-border-dark transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[520px] animate-fade-in-up">
          <div className="auth-card overflow-hidden">

            {}
            <div className="px-8 pt-8 pb-5 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light dark:bg-border-dark mb-4">
                <IoIosRocket size={24} className="text-primary" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark tracking-tight">Create Your Account</h1>
              <p className="text-sm text-muted dark:text-muted-dark mt-1.5">Join thousands of professionals on LocalEase.</p>
            </div>

            {}
            <div className="px-8">
              <button type="button" onClick={handleGoogleAuth} className="btn-google" disabled={isGoogleLoading}>
                {isGoogleLoading ? <ClipLoader size={18} color="#1A5EA8" /> : <><FcGoogle size={22} /><span>Continue with Google</span></>}
              </button>
              <div className="divider-text my-6">or continue with email</div>
            </div>

            {}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Full Name</label>
                  <div className="relative">
                    <IoPersonOutline size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="Jaydatt Kher" className="form-input form-input-icon" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Email Address</label>
                  <div className="relative">
                    <MdOutlineEmail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="name@company.com" className="form-input form-input-icon" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Password</label>
                <div className="relative">
                  <MdOutlineLock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••" className="form-input form-input-icon pr-11" required />
                  <button type="button" onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors">
                    {showPassword ? <MdOutlineVisibilityOff size={19} /> : <MdOutlineVisibility size={19} />}
                  </button>
                </div>
                <p className="text-xs text-muted dark:text-muted-dark mt-1">6–16 characters</p>
              </div>

              {}
              <div>
                <button type="button" onClick={() => setShowReferral((p) => !p)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
                  <TbGift size={16} />
                  {showReferral ? "Remove referral code" : "Have a referral code?"}
                </button>
                {showReferral && (
                  <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code" className="form-input font-mono tracking-widest uppercase mt-2" maxLength={10} />
                )}
              </div>

              <button type="submit" className="btn-primary mt-2" disabled={isSignUpLoading}>
                {isSignUpLoading ? <ClipLoader size={20} color="white" /> : <><span>Create Account</span><RiArrowRightLine size={18} /></>}
              </button>

              <p className="text-center text-sm text-muted dark:text-muted-dark mt-2">
                Already have an account?{" "}
                <Link to="/signin" className="font-bold text-primary hover:text-primary-hover transition-colors hover:underline underline-offset-4">Sign In</Link>
              </p>
            </form>

            <div className="px-8 py-4 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
              <p className="text-[10px] text-center text-muted dark:text-muted-dark uppercase tracking-widest">
                By creating an account, you agree to our <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Terms</Link> & <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}