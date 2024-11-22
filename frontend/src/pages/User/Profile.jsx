import { useEffect, useState } from "react";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { data, isLoading } = useProfileQuery();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setEmail(data.email);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    if (username === data.username && email === data.email && !password) {
      return;
    }

    try {
      const data = await updateProfile({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...data }));
      toast.success("User Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="mt-8 max-sm:ml-10 flex items-center justify-center min-h-[80vh]">
      <div className=" max-md:w-[300px]  md:w-[400px] lg:w-1/3 mx-auto bg-darkLight px-8 py-6 rounded-sm">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="my-6 flex flex-col gap-4">
            <label htmlFor="username" className="font-semibold tracking-wide">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="py-1 px-2  rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
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
              placeholder="Enter Your Password"
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
              placeholder="Re-Enter your password"
              className="py-1 px-2 rounded text-darkLight focus:outline-none focus:ring focus:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button disabled={isUpdatingProfile} className="btn mt-4">
            {isUpdatingProfile ? "Updating" : "Update Profile"}
          </button>
        </form>
        {/* <div className="mt-6">
          <p>
            New Customer?{" "}
            <Link to={"/register"}>
              <span className="text-primary hover:underline cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Profile;
