import { useState } from "react";
import api from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
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

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/users/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success("Profile Updated");

        } catch (error) {

            toast.error(error.response.data.message);

        }

        setLoading(false);

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />

            <Button
                text="Update Profile"
                loading={loading}
            />

        </form>

    );

}

export default Profile; 