function Input({ label, type, name, placeholder, value, onChange, children }) {
  return (
    <div className="mb-5">
      <label className="block text-gray-300 mb-2">{label}</label>

      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 pr-12 py-3 rounded-xl bg-slate-700/70 text-white border border-slate-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
        />

        {children}
      </div>
    </div>
  );
}

export default Input;
