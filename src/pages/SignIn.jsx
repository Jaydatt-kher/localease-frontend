import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation, useGoogleAuthMutation } from "../api/authApi";
import { setCredentials } from "../redux/authSlice";
import { toggleTheme, selectIsDark } from "../redux/themeSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdDarkMode, MdOutlineLightMode, MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { RiArrowRightLine } from "react-icons/ri";

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDark = useSelector(selectIsDark);
    const [signIn, { isLoading }] = useSignInMutation();
    const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) { toast.error("Please enter email and password."); return; }
        try {
            const res = await signIn(formData).unwrap();
            dispatch(setCredentials(res.userResponse));
            toast.success(res.message || "Signed in successfully!");
            navigate("/");
        } catch (err) {
            if (err?.status === 403) {
                toast.info("Please verify your email first.");
                navigate("/verify-email", { state: { email: formData.email } });
            } else {
                                toast.error(err?.data?.message || err?.error || "Failed to sign in.");
            }
        }
    };

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
                        toast.error(err?.data?.message || err?.error || "Google sign-in failed.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-body transition-colors duration-300">

            {}
            <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 no-underline">
                            <img
                                src="/logo.png"
                                alt="LocalEase"
                                className="h-20 w-auto object-contain"
                                style={{ maxWidth: "200px" }}
                            />
                        </Link>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => dispatch(toggleTheme())}
                                className="p-2 rounded-lg text-muted dark:text-muted-dark hover:bg-border dark:hover:bg-border-dark transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <MdOutlineLightMode size={20} className="text-yellow-400" /> : <MdDarkMode size={20} />}
                            </button>
                            <Link to="/signup" className="text-sm font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="auth-card p-8">

                        {}
                        <div className="text-center mb-7">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light dark:bg-border-dark mb-4">
                                <MdOutlineLock size={22} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-foreground dark:text-foreground-dark mb-1">Welcome Back</h1>
                            <p className="text-sm text-muted dark:text-muted-dark">Sign in to continue to LocalEase</p>
                        </div>

                        {}
                        <button type="button" onClick={handleGoogleAuth} className="btn-google mb-5" disabled={isGoogleLoading}>
                            {isGoogleLoading ? <ClipLoader size={18} color="#1A5EA8" /> : <><FcGoogle size={22} /><span>Continue with Google</span></>}
                        </button>

                        <div className="divider-text mb-5">or continue with email</div>

                        {}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Email Address</label>
                                <div className="relative">
                                    <MdOutlineEmail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                                        placeholder="name@company.com" className="form-input form-input-icon" required />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label htmlFor="password" className="text-sm font-semibold text-foreground dark:text-foreground-dark">Password</label>
                                    <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <MdOutlineLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password}
                                        onChange={handleChange} placeholder="••••••••" className="form-input form-input-icon pr-11" required />
                                    <button type="button" onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors">
                                        {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineVisibility size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary mt-2" disabled={isLoading}>
                                {isLoading ? <ClipLoader size={20} color="white" /> : <><span>Sign In</span><RiArrowRightLine size={18} /></>}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-bold text-primary hover:text-primary-hover transition-colors hover:underline underline-offset-4">Create Account</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}