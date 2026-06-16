import Profile from "../pages/Profile";

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

      {children}

    </div>
  );
}

export default DashboardCard;
