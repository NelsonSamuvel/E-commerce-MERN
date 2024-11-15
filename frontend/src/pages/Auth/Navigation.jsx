import { useState } from "react";
import {
  HiChevronDown,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineUserPlus,
  HiUser,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";

const Navigation = () => {
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowdropdown] = useState(false);

  const handleDropdown = () => {
    setShowdropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      const data = await logoutUser().unwrap();
      dispatch(logout());
      toast.success(data.message);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="group bg-darkLight fixed h-[100vh] w-[4%] hover:w-[15%]   flex flex-col gap-4 justify-between hover:px-6  pt-32 pb-6 z-50 transition-all duration-150">
      <div className="flex flex-col gap-8">
        <Link
          to={"/"}
          className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineHome size={25} className="mx-auto group-hover:mx-0" />
          <span className="hidden group-hover:block">Home</span>
        </Link>
        <Link
          to={"/shop"}
          className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineShoppingBag
            size={25}
            className="mx-auto group-hover:mx-0"
          />
          <span className="hidden group-hover:block">Shop</span>
        </Link>
        <Link
          to={"/cart"}
          className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineShoppingCart
            size={25}
            className="mx-auto group-hover:mx-0"
          />
          <span className="hidden group-hover:block">Cart</span>
        </Link>
        <Link
          to={"/favorites"}
          className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineHeart size={25} className="mx-auto group-hover:mx-0" />
          <span className="hidden group-hover:block">Favorites</span>
        </Link>
      </div>
      {userInfo?.username ? (
        <div
          onClick={handleDropdown}
          className="relative group-hover:flex items-center gap-4"
        >
          <HiUser size={25} className="mx-auto group-hover:mx-0 text-primary" />
          <div className="flex gap-1 cursor-pointer items-center">
            <p className="text-center hidden group-hover:block">
              {userInfo?.username}
            </p>
            <HiChevronDown className="hidden group-hover:block" />
          </div>
          {showDropdown && (
            <ul className="absolute left-20 -top-20 group-hover:block hidden  bg-white text-darkLight px-4 py-2 rounded">
              <li className="mb-2 ">
                <Link className="hover:text-primary hover:font-semibold">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="hover:text-primary hover:font-semibold"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging Out" : "Logout"}
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
      {!userInfo ? (
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to={"/login"}
              className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
            >
              <HiOutlinePower size={25} className="mx-auto group-hover:mx-0" />
              <span className="hidden group-hover:block">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
            >
              <HiOutlineUserPlus
                size={25}
                className="mx-auto group-hover:mx-0"
              />
              <span className="hidden group-hover:block">Register</span>
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navigation;
