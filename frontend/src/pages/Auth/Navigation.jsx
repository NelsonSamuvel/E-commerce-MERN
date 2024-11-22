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
    <div className="group bg-darkLight fixed h-[100vh] w-[50px]  md:hover:w-[200px] flex flex-col gap-4 justify-between md:hover:px-6   pt-32 pb-6 z-50 transition-all duration-150">
      <div className="flex flex-col gap-8">
        <Link
          to={"/"}
          className="md:group-hover:flex items-center gap-4 transform transition-all md:hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineHome className="icon mx-auto md:group-hover:mx-0" />
          <span className="hidden  md:group-hover:block">Home</span>
        </Link>
        <Link
          to={"/shop"}
          className="md:group-hover:flex items-center gap-4 transform transition-all md:hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineShoppingBag className="icon mx-auto md:group-hover:mx-0" />
          <span className="hidden md:group-hover:block">Shop</span>
        </Link>
        <Link
          to={"/cart"}
          className="md:group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineShoppingCart className="icon mx-auto md:group-hover:mx-0" />
          <span className="hidden md:group-hover:block">Cart</span>
        </Link>
        <Link
          to={"/favorites"}
          className="md:group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
        >
          <HiOutlineHeart className="icon mx-auto md:group-hover:mx-0" />
          <span className="hidden md:group-hover:block">Favorites</span>
        </Link>
      </div>
      {userInfo?.username ? (
        <div
          onClick={handleDropdown}
          className="relative md:group-hover:flex items-center gap-4"
        >
          <HiUser className="icon mx-auto md:group-hover:mx-0 text-primary" />
          <div className="flex gap-1 cursor-pointer items-center">
            <p className="text-center hidden md:group-hover:block">
              {userInfo?.username}
            </p>
            <HiChevronDown className="hidden md:group-hover:block" />
          </div>
          {showDropdown && (
            <ul
              className={`absolute  md:left-20 -top-20 ${
                userInfo?.isAdmin ? " md:-top-60 md:left-16" : ""
              } group-hover:block hidden text-sm bg-darkLight  md:bg-secondary px-5 py-3 rounded`}
            >
              {userInfo?.isAdmin && (
                <>
                  <li className="mb-3 ">
                    <Link
                      to={"/admin/dashboard"}
                      className="hover:text-primary hover:font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="mb-3 ">
                    <Link
                      to={"/admin/products"}
                      className="hover:text-primary hover:font-semibold"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="mb-3 ">
                    <Link
                      to={"/admin/categories"}
                      className="hover:text-primary hover:font-semibold"
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="mb-3 ">
                    <Link
                      to={"/admin/orders"}
                      className="hover:text-primary hover:font-semibold"
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="mb-3 ">
                    <Link
                      to={"/admin/usersList"}
                      className="hover:text-primary hover:font-semibold"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li className="mb-3 ">
                <Link
                  to={"profile"}
                  className="hover:text-primary hover:font-semibold"
                >
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
              className="md:group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
            >
              <HiOutlinePower className="icon mx-auto md:group-hover:mx-0" />
              <span className="hidden md:group-hover:block">Login</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="md:group-hover:flex items-center gap-4 transform transition-all hover:translate-x-2 hover:text-primary duration-500"
            >
              <HiOutlineUserPlus className="icon mx-auto md:group-hover:mx-0" />
              <span className="hidden md:group-hover:block">Register</span>
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
