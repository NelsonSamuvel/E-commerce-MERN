import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRedirect } from "../../hooks/useRedirect";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  useRedirect(userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Confirm Password should match the password");
      return;
    }
    try {
      const data = await register({ username, email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success("Registered successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data || err);
    }
  };

  return (
    <section>
      <div className="margin-l pt-16">
        <h1 className="text-2xl font-semibold">Create a new account</h1>
        <form className="w-1/2 mt-12" onSubmit={handleSubmit}>
          <div className="my-6 flex flex-col gap-4">
            <label htmlFor="username" className="font-semibold tracking-wide">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="py-1 px-2 rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-6 flex flex-col gap-4">
            <label htmlFor="email" className="font-semibold tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="py-1 px-2 rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-6 flex flex-col gap-4">
            <label htmlFor="password" className="font-semibold tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="py-1 px-2 rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-6 flex flex-col gap-4">
            <label
              htmlFor="confirmPassword"
              className="font-semibold tracking-wide"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter your password"
              className="py-1 px-2 rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button disabled={isLoading} className="btn mt-4">
            {isLoading ? "Signing Up" : " Sign Up"}
          </button>
        </form>
        <div className="mt-6">
          <p>
            Already have an account?{" "}
            <Link to={"/Login"}>
              <span className="text-primary hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
