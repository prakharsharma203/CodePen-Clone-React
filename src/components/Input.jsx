import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Input = ({
  label,
  placeholder,
  isPass,
  Icon,
  setStatefunc,
  setGetEmailValidation,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  useEffect(() => {
    if (placeholder === "Email") {
      const isValid = validateEmail(value);
      setEmailIsValid(isValid);
      setGetEmailValidation(isValid);
    }
  }, [value, placeholder]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setStatefunc(val);
  };

  const inputClasses = `flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg ${
    isEmailInvalid() && "border-2 border-red-600"
  }`;

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${isEmailInvalid() && value.length > 0 && "border-2 border-red-600"}`}>
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          required
          onChange={handleTextChange}
        />
        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <FaEyeSlash className="text-text555 text-2xl " />
            ) : (
              <FaEye className="text-text555 text-2xl " />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );

  function validateEmail(email) {
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegexp.test(email);
  }

  function isEmailInvalid() {
    return placeholder === "Email" && !emailIsValid;
  }
};

export default Input;
