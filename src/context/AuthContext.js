import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from "../firebase";

/////////////////////////////////////////////////////import///////////

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googlesignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signInEmail = (email, password) => {
    console.log(password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        //alert(error);
        console.log(error);
      });
  };

  const createUserWithEmail = async (email, password, fname, sname, smnumber, ssection, sbranch, syear, sgender, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("User created:", userCredential);
  
      const userWithEmailQuery = query(collection(db, 'users'), where('email', '==', email));
      const userWithEmailSnapshot = await getDocs(userWithEmailQuery);
  
      if (userWithEmailSnapshot.empty) {
        const usercollectionref = collection(db, 'users');
        await addDoc(usercollectionref, {
          FirstName: fname,
          SurName: sname,
          email: email,
          Phnumber: smnumber,
          year: syear,
          branch: sbranch,
          section: ssection,
          username: username,
          Gender: sgender,
          address: '',
          role: 'student',
        });
        console.log("User data added to Firestore successfully");
      } else {
        console.log("User with email already exists in Firestore");
      }
    } catch (error) {
      // Handle any errors that occur during user creation or data insertion
      console.error("Error during user creation:", error);
    }
  };
  
  

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser);
      if (currentUser) {
        const userWithEmailQuery = query(collection(db, 'users'), where('email', '==', currentUser.email));
        const userWithEmailSnapshot = await getDocs(userWithEmailQuery);
        if (userWithEmailSnapshot.empty) {
          const usercollectionref = collection(db, 'users');
          await addDoc(usercollectionref, {
            FirstName: '',
            SurName: '',
            email: currentUser.email,
            Phnumber: '',
            year: '',
            branch: '',
            section: '',
            username: '',
            Gender: '',
            address: '',
            role: 'student',
          });
        }
      }

    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googlesignIn, user, logout, signInEmail, createUserWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
