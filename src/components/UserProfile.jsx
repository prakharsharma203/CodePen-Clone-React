import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Menus } from "../utils/helpers";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase.config";
import { SET_USER_NULL } from "../context/action/UserAction";

const UserProfile = () => {
  const user = useSelector((state) => state.home?.user?.user);
  const [isMenu, setIsMenu] = useState(false);

  const signOutAction = async () => {
    try {
      await auth.signOut();
      SET_USER_NULL()
      window.location.reload(); // Reload the window after signing out
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out error
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>
      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="px-4 py-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>
      {isMenu && (
        <motion.div className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]">
          {Menus &&
            Menus.map((e) => (
              <Link
                to={e.url}
                key={e.id}
                className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
              >
                <motion.p whileTap={{ scale: 0.9 }}>{e.name}</motion.p>
              </Link>
            ))}
          <motion.p
            onClick={signOutAction}
            whileTap={{ scale: 0.9 }}
            className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
          >
            Sign Out
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
