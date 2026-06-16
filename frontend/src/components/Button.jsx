function Button({ text, type = "submit", loading }) {

    return (

        <button
            type={type}
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Please Wait..." : text}
        </button>

    );

}

export default Button;