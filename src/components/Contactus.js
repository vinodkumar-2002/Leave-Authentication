import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userWithEmailQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userWithEmailSnapshot = await getDocs(userWithEmailQuery);

      if (userWithEmailSnapshot.empty) {
        const usercollectionref = collection(db, "feedback");
        await addDoc(usercollectionref, {
          Name: name,
          Email: email,
          Message: message,
          Date : new Date(),
        });
        console.log("User data added to Firestore successfully");
        alert("Our team will contact you shortly")
      } else {
        console.log("User with email already exists in Firestore");
      }
    } catch (error) {
      // Handle any errors that occur during user creation or data insertion
      console.error("Error during user creation:", error);
    }
  };

  return (
    <div className="container">
      <div className="container rounded bg-white mt-1 mb-1 shadow-lg p-3  bg-body rounded ">
        <h1 className="text-center">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mx-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 mx-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 mx-2">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
