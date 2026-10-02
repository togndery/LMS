import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
  const [name, setName] = useState("dan");
  const [email, setEmail] = useState("dan@gmail.com");
  const [password, setPassword] = useState("rrrr");
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    //console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      //console.log("REGISTER RESPONS", data);
      toast.success(`Welcome ${name} pleas login`);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      {" "}
      <div className="background-glow glow-one"></div>{" "}
      <div className="background-glow glow-two"></div>{" "}
      <div className="register-card">
        {" "}
        <div className="register-header">
          {" "}
          <div className="logo">
            {" "}
            <span>✦</span>{" "}
          </div>{" "}
          <h1>Create your account</h1>{" "}
          <p> Join us today and start building something amazing. </p>{" "}
        </div>{" "}
        <form onSubmit={handlesubmit} className="register-form">
          {" "}
          <div className="form-group">
            {" "}
            <label htmlFor="name">Full name</label>{" "}
            <div className="input-wrapper">
              {" "}
              <span className="input-icon">👤</span>{" "}
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="form-group">
            {" "}
            <label htmlFor="email">Email address</label>{" "}
            <div className="input-wrapper">
              {" "}
              <span className="input-icon">✉</span>{" "}
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="form-group">
            {" "}
            <label htmlFor="password">Password</label>{" "}
            <div className="input-wrapper">
              {" "}
              <span className="input-icon">🔒</span>{" "}
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="terms">
            {" "}
            <label>
              {" "}
              <input type="checkbox" required />{" "}
              <span>
                {" "}
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>{" "}
              </span>{" "}
            </label>{" "}
          </div>{" "}
          <button
            type="submit"
            className="register-button"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : ""}
            <span>Create account</span> <span className="arrow">→</span>{" "}
          </button>{" "}
        </form>{" "}
        <div className="divider">
          {" "}
          <span>or continue with</span>{" "}
        </div>{" "}
        <div className="social-buttons">
          {" "}
          <button type="button" className="social-button">
            {" "}
            <span>G</span> Google{" "}
          </button>{" "}
          <button type="button" className="social-button">
            {" "}
            <span>⌘</span> Apple{" "}
          </button>{" "}
        </div>{" "}
        <div className="login-link">
          {" "}
          Already have an account? <a href="/login"> Sign in</a>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
};

export default Register;
