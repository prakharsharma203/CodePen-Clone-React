import { useState} from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Routes, Route } from "react-router-dom";
import { Projects, Signup } from "../pages";
import logo from "../../public/assets/img/codepenlogo.webp";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { UserProfile } from "../components";
import { SET_SEARCH_TERM } from "../context/action/UserAction";

const Home = () => {

  const [isSlideMenu, setIsSlideMenu] = useState(false);
 
  // state => state.user?.user
  const user = useSelector((state) => state.home?.user?.user);
  const searchTerm = useSelector(
    (state) => state?.home?.user?.searchTerm || "");
  

  // Dispatch SET_SEARCH_TERM action when search term changes
  const dispatch = useDispatch();
  const handleSearchTermChange = (e) => {
    dispatch(SET_SEARCH_TERM(e.target.value));
  };
  console.log(user);
  return (
    <>
      <div
        className={`flex ${isSlideMenu ? "w-2" : "flex-[.3] xl:flex-[.2]"}
         min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out `}
        style={{ position: "relative" }}
      >
        {/* anchor section */}
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsSlideMenu(!isSlideMenu)}
          className="w-8 h-8 rounded-tr-lg rounded-br-lg absolute flex items-center justify-center cursor-pointer -right-8 top-2"
        >
          {!isSlideMenu ? (
            <HiChevronDoubleLeft className="text-xl text-white" />
          ) : (
            <HiOutlineChevronDoubleRight className="text-xl text-white" />
          )}
        </motion.div>
        {/* logo */}
        <div className="overflow-hidden w-full flex flex-col gap-4 ">
          <Link to={"/home"}>
            <img src={logo} alt="Logo" className="object-contain" />
          </Link>
          <Link to={"/newProjects"}>
            <div className="px-6 py-3 flex items-center justify-center  rounded-xl border-[3px]  cursor-pointer  mixingColor ">
              <p className="text-gray-400 hover:text-gray-200 capitalize xl:text-2xl">
                Start Coding
              </p>
            </div>
          </Link>
          {user && (
            <div>
              <Link
                to="/home/projects"
                className="flex items-center justify-center gap-6"
              >
                <FaHome className="text-primaryText text-xl" />
                <p className="text-lg text-primaryText"> Home </p>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Right Section */}
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        {/* top section */}
        <div className="w-full flex items-center justify-between gap-3">
          {/* search */}
          <div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center gap-3 justify-center">
            <CiSearch className="text-2xl text-primaryText " />
            <input
              type="text"
              value={searchTerm}
              className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gary-600"
              placeholder="Search here...."
              onChange={handleSearchTermChange}
            />
          </div>
          {/* profile */}
          {!user &&  (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center text-center gap-3" 
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-4 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700 w-32"
              >
                Sign Up
              </Link>
            </motion.div>
          )}
          {user && <UserProfile />}
        </div>
        {/* bottom section */}
        <div className="w-full">
          <Routes>
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/auth" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
