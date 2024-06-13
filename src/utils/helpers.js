import {
  GoogleAuthProvider,
  signInWithRedirect,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCred) =>
    window.location.reload()
  );
};

export const signInWithGithub = async () => {
  await signInWithRedirect(auth, githubProvider).then((userCred) =>
    window.location.reload()
  );
};

export const Menus = [
  {
    id: uuidv4(),
    name: "Projects",
    uri: "/home/Projects",
  },
  {
    id: uuidv4(),
    name: "Collections",
    uri: "/home/Collections",
  },
  {
    id: uuidv4(),
    name: "Profile",
    uri: "/home/Profile",
  },
];
