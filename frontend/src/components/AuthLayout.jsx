function AuthLayout({ title, subtitle, children }) {

    return (

        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 hover:scale-[1.02] transition-all duration-300">

                <h1 className="text-4xl font-extrabold text-white text-center">
                    {title}
                </h1>

                <p className="text-gray-300 text-center mt-3">
                    {subtitle}
                </p>

                <div className="mt-8">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AuthLayout;