//packages
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//utils
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRedirect } from "../../hooks/useRedirect";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useRedirect(userInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Logged in successfully");
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      if (error) {
        toast.error(error?.data || error.message);
      }
    }
  };

  return (
    <section>
      <div className="margin-l padding-t">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <form className="w-1/2 mt-12" onSubmit={handleSubmit}>
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
          <button disabled={isLoading} className="btn mt-4">
            {isLoading ? "Signing In" : "Sign In"}
          </button>
        </form>
        <div className="mt-6">
          <p>
            New Customer?{" "}
            <Link to={"/register"}>
              <span className="text-primary hover:underline cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
