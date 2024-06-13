import { useEffect, useState } from "react";
import "./App.css";
import { auth, db } from "./config/firebase.config";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home, NewProjects } from "./pages";
import { Spinner } from "./components";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { SET_USER, SET_PROJECTS } from "./context/action/UserAction";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          });
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const unsub = onSnapshot(projectQuery, (querySnaps) => {
      const projectList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectList));
    });
    return unsub;
  }, []);

  return (
    <>
      {isloading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-screen flex items-start justify-start ">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProjects" element={<NewProjects />} />
            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
