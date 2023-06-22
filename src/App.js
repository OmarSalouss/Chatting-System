import React, { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { Link, useLocation } from "react-router-dom";
import { connectToDb, connectToDb2, getSupabase } from "./DataBase/DBConnection";

const cookies = new Cookies();

function App() {
  const { currentUser } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [CurrentUserState, setCurrentUser] = useState('');
  const [Person_ID, setPerson_ID] = useState();
  const [Password, setPassword] = useState();
  const [logo, setlogo] = useState();
  const [user, setUser] = useState(null);
  const [logoFlagg, setlogoFlagg] = useState(0);
  const [logoFlagg22, setlogoFlagg22] = useState(0);
  const [logoFlagg33, setlogoFlagg33] = useState(0);

  async function PersonDataIsFilled(userEmail) {
    const EMAIL = userEmail;
    console.log("**** EMAIL")
    console.log(EMAIL)
    const { data, error } = await getSupabase()
      .from("Person")
      .select()
      .ilike('Email', `%${EMAIL}%`)

    if (error) {
      console.log(error)
    } else if (data.length == 0) {
      console.log({ error: "There is no user registered with this email" });
    } else {
      console.log(data)
      setCurrentUser(data[0].First_Name + " " + data[0].Last_Name);
      setPerson_ID(data[0].Person_ID);
      setPassword(data[0].Password);
      setlogo(data[0].logo)
    }
  }
  async function searchUser(username, currentNowUser) {
    console.log("1 &&&&&&&&&&&&&& =" + username + "*")
    console.log("currentNowUser")
    console.log(currentNowUser)
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    console.log("2 &&&&&&&&&&&&&&")
    console.log(q)
    try {
      const querySnapshot = await getDocs(q);
      console.log("3 &&&&&&&&&&&&&&")
      let xUser;
      await querySnapshot.forEach((doc) => {
        console.log("Yessssssss &&&&&&&&&&&&&&")
        console.log(doc.data());
        xUser = doc.data();
        console.log("Yessssssss 22222222")
      });
      console.log("4 &&&&&&&&&&&&&&")
      console.log("user")
      console.log(xUser)
      console.log("currentUser *------------*")
      console.log(currentNowUser)

      const combinedId =
        currentNowUser.uid > xUser.uid
          ? currentNowUser.uid + xUser.uid
          : xUser.uid + currentNowUser.uid;
      console.log("5 &&&&&&&&&&&&&&")

      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("6 &&&&&&&&&&&&&&")

      if (!res.exists()) {
        if (!logoFlagg33) {
          console.log("not Found *****************************")
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: xUser.uid,
              displayName: xUser.displayName,
              photoURL: xUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", xUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          setlogoFlagg33(2);
        }
      } else {
        console.log("Found &&&&&&&&&&&&&&")

      }

    } catch (err) {
      console.log("error ^^^")
      // setErr(true);
    }


  }
  
  const ProtectedRoute = ({ children }) => {
    const search = useLocation().search;
    const userEmail = new URLSearchParams(search).get("email");
    const userNamee = new URLSearchParams(search).get("BOName");
    console.log(" 2currentUser userNamee")
    console.log(currentUser)
    console.log("currentUser *------------*")
    console.log(user)
    
    if (userNamee !== "A*1*A") {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      if (Object.keys(currentUser).length === 0) {
        console.log("t is an empty object");
      } else {
        let v = currentUser;
        setUser(v)
        console.log("t is not an empty object")
        console.log(v);
        console.log("t is not an empty object user");
        console.log(user);
        if (!logoFlagg22 && userNamee != "A*1*A") {
          searchUser(userNamee, currentUser);
          setlogoFlagg22(2);
        }
      }
    }
    // const userEmail = new URLSearchParams(search).get("userEmail");
    if (!logoFlagg) {
      console.log(" 1 userEmail")
      console.log(userEmail)
      console.log(" 2 userNamee")
      console.log(userNamee)
      setlogoFlagg(2);
      connectToDb2();
      PersonDataIsFilled(userEmail);
    }
    if (!currentUser) {
      console.log(" 1 Person_ID")
      console.log(Person_ID)
      console.log(" 1 CurrentUser")
      console.log(CurrentUserState)
      console.log(" 1 userEmail")
      console.log(userEmail)
      console.log(" 1 Password")
      console.log(Password)
      console.log(" 1 logo")
      console.log(logo)
      // return <Auth setIsAuth={setIsAuth} />;
      // var obj = {
      //   uid: 6559,
      //   displayName: "Obada Tareq",
      //   email: "Obada@gmail.com",
      //   password: 123321,
      //   photoURL: "https://res.cloudinary.com/djzsyzfre/image/upload/v1682753575/samples/people/smiling-man.jpg"
      // }
      // var obj = {
      //   uid: 6559,
      //   displayName: "Maher",
      //   email: "Maher@gmail.com",
      //   password: 123321,
      //   photoURL: "https://res.cloudinary.com/djzsyzfre/image/upload/v1682753576/samples/people/boy-snow-hoodie.jpg",
      // }
      // var obj = {
      //   uid: 6559,
      //   displayName: "Nihad 4S",
      //   email: "Nihad@gmail.com",
      //   password: 123321,
      //   photoURL: "https://res.cloudinary.com/djzsyzfre/image/upload/v1682753573/samples/people/kitchen-bar.jpg"
      // }

      console.log("userEmail")
      console.log(userEmail)
      var obj = {
        uid: Person_ID,
        displayName: CurrentUserState,
        email: userEmail,
        password: Password,
        photoURL: logo
      }
      return (
        <AppWrapper
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsInChat={setIsInChat}
        >
          <Auth setIsAuth={setIsAuth} obj={obj} />
        </AppWrapper>
      );
    }
    return children
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
