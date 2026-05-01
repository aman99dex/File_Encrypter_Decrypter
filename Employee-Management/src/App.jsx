const quickStats = [
    { label: 'Total employees', value: '128' },
    { label: 'Active today', value: '96' },
    { label: 'Open requests', value: '14' },
]

const employees = [
    { name: 'Ava Johnson', role: 'HR Manager', status: 'Online' },
    { name: 'Noah Patel', role: 'Frontend Developer', status: 'In meeting' },
    { name: 'Mia Chen', role: 'Operations Lead', status: 'On leave' },
]

const App = () => {
    return (
        <main className="min-h-screen text-slate-100">
            <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-10">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur">
                    <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
                        <div className="space-y-8">
                            <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-200">
                                Made by Aman & Claude
                            </span>

                            <div className="space-y-4">
                                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                    Employee management dashboard starter
                                </h1>
                                <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                                    A clean React + Tailwind foundation for building HR workflows, employee
                                    records, attendance views, and admin screens.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">
                                    Create employee
                                </button>
                                <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                                    View reports
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {quickStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                                    >
                                        <p className="text-sm text-slate-400">{stat.label}</p>
                                        <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-slate-400">Team overview</p>
                                    <h2 className="mt-1 text-xl font-semibold text-white">Current activity</h2>
                                </div>
                                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                                    Live
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {employees.map((employee) => (
                                    <div
                                        key={employee.name}
                                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                                    >
                                        <div>
                                            <p className="font-medium text-white">{employee.name}</p>
                                            <p className="text-sm text-slate-400">{employee.role}</p>
                                        </div>
                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                                            {employee.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default App