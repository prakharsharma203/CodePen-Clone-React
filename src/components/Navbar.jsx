import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/assets/img/codepenlogo.webp";
import { MdCheck } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { UserProfile } from "./index";
import { useSelector } from "react-redux";
import { setDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
const Navbar = ({ setAlert , html , js, css  ,output}) => {
  const [title, setTitle] = useState("Untitled");
  const [isTitle, setISTitle] = useState(false);
  const user = useSelector((state) =>state.home?.user?.user)
  //  state.user?.user);
  // const errorNotification = (text) => {
  //   toast.error(text, {
  //     position: "top-center",
  //   });
  // };

  // const notify = (text) => {

  //   toast.success(text, {
  //     position: "top-center"
  //   });

  // }
  const saveProgarm = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };
    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => {
        // notify("Project Saved")
        toast.success('Project Saved!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
          });
        setAlert(true);
      })
      .catch((err) =>   toast.error("Project Not Saved", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        }));
  };
  setInterval(() => {
    setAlert(false);
  }, 2000);
  console.log("Navbar");
  
  return (
    <header className="w-full flex items-start justify-between px-12 py-4">
      <div className="flex items-center justify-center gap-6">
      <ToastContainer />
        <Link to={"/home/projects"}>
          <img className="w-32 h-auto object-contain" src={logo} alt="" />
        </Link>
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center justify-center gap-3">
            <AnimatePresence>
              {isTitle ? (
                <>
                  <motion.input
                    // key={"TitleInput"}
                    type="text"
                    placeholder="Your Title"
                    className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base border-none outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    //  type="text" placeholder="Enter Title.." value={istitle} onChange={(e)=> setistitle(e.target.value)} 
                  />
                </>
              ) : (
                <>
                  <motion.p
                    key={"titleLabel"}
                    className="px-3 py-2 text-white text-lg"
                  >
                    {title}
                  </motion.p>
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isTitle ? (
                <>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    key={"MdCheck"}
                    onClick={() => setISTitle(false)}
                  >
                    <MdCheck className="text-2xl text-emerald-500" />
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    key={"MdEdit"}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() => setISTitle(true)}
                  >
                    <MdEdit className="text-2xl text-primaryText" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center px-3 -mt-2 gap-2 ">
            <p className="text-primaryText text-sm">
              {user?.displayName
                ? user?.displayName
                : `${user?.email.split("@"[0])}`}
            </p>
            <motion.p
              className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer"
              whileTap={{
                scale: 0.9,
              }}
            >
              Follow+
            </motion.p>
          </div>
        </div>
      </div>

      {user && (
        <motion.div
          whileTap={{
            scale: 0.9,
          }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            className="px-6 py-2 bg-emerald-500 cursor-pointer text-base text-white font-semibold rounded-md"
            onClick={saveProgarm}
          >
            Save
          </motion.button>
          <UserProfile />
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
