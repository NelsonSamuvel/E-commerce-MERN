import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navigation = () => {
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
            <HiOutlineUserPlus size={25} className="mx-auto group-hover:mx-0" />
            <span className="hidden group-hover:block">Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
