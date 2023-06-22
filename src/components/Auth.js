import { db, auth, provider } from "../firebase.js";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import "../styles/Auth.css";
import Cookies from "universal-cookie";
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const cookies = new Cookies();

export const Auth = ({ setIsAuth, obj }) => {
  const signInWithGoogle = async (e) => {
    // e.preventDefault();
    try {

      const user = obj; // Replace `obj` with the user object you want to store
      const messagesRef = collection(db, "users");

      const queryMessages2 = query(
        messagesRef,
        where('email', '==', user.email),
      );
      let flag = false;
      await getDocs(queryMessages2)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (user.email == doc.data().email) {
              flag = true;
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      console.log("flag")
      console.log(flag)
      console.log("111111111111111111111111111111111111111111111111111111");

      //Todo
      if (!flag) {
        console.log("111111111111111111111111111111111111111111111111111111");
        const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
        var xUser = user;
        var idUserr = res.user.uid;

        var refreshTokken;
        refreshTokken = res.user.stsTokenManager.refreshToken;
        await updateProfile(res.user, {
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        console.log("222222222222222222222222222222");

        await setDoc(doc(db, "users", idUserr), {
          uid: idUserr,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
        console.log("333333333333333333");

        await setDoc(doc(db, "userChats", idUserr), {})
        setIsAuth(true);
      } else {
        await signInWithEmailAndPassword(auth, user.email, user.password);
      }
    } catch (err) {
      console.error(err);
    }
  };
  signInWithGoogle(); // Call the function

  // return (
  //   // <div className="auth">
  //   //   {/* <p> Sign In With Google To Continue </p>
  //   //   <button onClick={signInWithGoogle}> Sign In With Google </button> */}
  //   // </div>

  // );
};
