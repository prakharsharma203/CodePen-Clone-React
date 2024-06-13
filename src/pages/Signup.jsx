import { useState } from "react";
import Input from "../components/Input";
import { MdPassword, MdOutlineEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fadeInOut } from "../animation";
import logo from "../../public/assets/img/codepenlogo.webp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // const notify = (text) => {
  //   toast.success(text, {
  //     position: "top-center",
  //   });
  // };
  // const errorNotification = (text) => {
  //   toast.error(text, {
  //     position: "top-center",
  //   });
  // };

  const createNewUser = async () => {
    if (emailValidation) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        // notify("Account Created Successfully!");
        toast.success('Account Created Successfully!', {
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
        console.log(res);
      } catch (error) {
        // errorNotification("Enter valid Email or Passsword");
        toast.error('Enter valid Email or Passsword', {
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

        handleErrors(error);
      }
    }
  };

  const loginWithEmail = async () => {
    if (emailValidation) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        // notify("Account Created Successfully!");
        toast.success('Login Successfully!', {
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
        // console.log(res);
      } catch (error) {
        handleErrors(error);
        
      }
    }
  };

  const handleErrors = (error) => {
    console.log(error);
    if (error.code === "auth/invalid-email") {
      showAlertMessage("Invalid Email Address");
    } else if (error.code === "auth/invalid-credential") {
      showAlertMessage("Incorrect Password");
    } else {
      showAlertMessage("Login Failed");
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  // console.log(email , pass);
  return (
    <div className="w-full py-6">
      <img
        src={logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt=""
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join with Us! 🤩</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          <Input
            label="Email"
            placeholder="Email"
            isPass={false}
            Icon={MdOutlineEmail}
            setStatefunc={setEmail}
            setGetEmailValidation={setEmailValidation}
          />
          <Input
            label="Password"
            placeholder="Password"
            isPass={true}
            Icon={MdPassword}
            setStatefunc={setPass}
          />
          <AnimatePresence>
            {showAlert && (
              <motion.p
                key="AlertMessage"
                {...fadeInOut}
                className="text-red-500"
              >
                {alertMessage}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.div
            onClick={isLogin ? loginWithEmail : createNewUser}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 cursor-pointer"
          >
            <p className="text-xl text-white">
              {isLogin ? "Login" : "Sign Up"}
            </p>
          </motion.div>
          <p className="text-sm text-primaryText flex items-center justify-center gap-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-500 cursor-pointer"
            >
              {isLogin ? "Create Here" : "Login Here"}
            </span>
          </p>
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">Or</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">Or</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
