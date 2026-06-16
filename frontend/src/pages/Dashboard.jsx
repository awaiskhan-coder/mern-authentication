import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome, {user?.name} 👋
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard title="Profile">
            <Profile />
          </DashboardCard>

          <DashboardCard title="Account">
            <p className="text-green-400">Active User ✅</p>
          </DashboardCard>

          <DashboardCard title="Change Password">
            <ChangePassword />
          </DashboardCard>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
