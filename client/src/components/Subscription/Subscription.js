import React, { useState, useEffect } from "react";
import "./Subscription.scss";
const Subscription = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!token) {
      fetch(`http://localhost:9000/token/generate`)
        .then((res) => res.text())
        .then((response) => setToken(response))
        .catch((err) => console.log(err));
    }
  });

  return (
    <div className="subscription">
      <h3>Subscription Information</h3>
      <p>membership type:</p>
      <p className="membership">Free</p>
      <p>Customer ID:</p>
      <p className="customerId">23121edkem21kd21132</p>
      <p>Key:</p>
      <p>{token}</p>
    </div>
  );
};

export default Subscription;
