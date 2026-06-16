import { useEffect } from "react";
import React from "react";
import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/users/register", formData);

      console.log(response.data);

      toast.success("Registration Successful! Please Login.");

      navigate("/login");
      setLoading(false);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);

      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Backend Server Not Running");
      }
    }
  };
  return (
    <AuthLayout title="Create Account" subtitle="Join our community">
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button text="Create Account" loading={loading} />

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
