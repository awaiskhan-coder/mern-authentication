import { useState } from "react";
import api from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";

function ChangePassword() {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/users/change-password",
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message);

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {

            toast.error(error.response.data.message);

        }

        setLoading(false);

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
            />

            <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
            />

            <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <Button
                text="Change Password"
                loading={loading}
            />

        </form>

    );

}

export default ChangePassword;