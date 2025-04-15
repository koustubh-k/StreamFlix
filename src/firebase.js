import {addDoc, collection, getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,signOut} from "@firebase/auth";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAR9MjL4zGUJClEgFG8t1GLBAZcVRMwsus",
  authDomain: "streamflix-a0fdd.firebaseapp.com",
  projectId: "streamflix-a0fdd",
  storageBucket: "streamflix-a0fdd.firebasestorage.app",
  messagingSenderId: "741073308517",
  appId: "1:741073308517:web:c875b1791e3d8902392f8c",
  measurementId: "G-0R0PG06JQE"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{
      try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
      } catch(error){
        console.log(error);
        toast.error(error.code);
      }
}

const login =async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const logout =  ()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout}