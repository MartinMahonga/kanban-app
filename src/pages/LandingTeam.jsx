import LandingNav from "../components/layout/LandingNav";

const teamMembers = [
  {
    name: "Alexandre",
    role: "Frontend Developer",
    color: "bg-red-200 text-red-800",
  },
  {
    name: "Béatrice",
    role: "Backend Developer",
    color: "bg-orange-200 text-orange-800",
  },
  {
    name: "Charles",
    role: "Product Manager",
    color: "bg-amber-200 text-amber-800",
  },
  {
    name: "David",
    role: "UX Designer",
    color: "bg-yellow-200 text-yellow-800",
  },
  { name: "Élise", role: "QA Engineer", color: "bg-lime-200 text-lime-800" },
  { name: "François", role: "DevOps", color: "bg-green-200 text-green-800" },
  {
    name: "Gabrielle",
    role: "Fullstack",
    color: "bg-emerald-200 text-emerald-800",
  },
  { name: "Henri", role: "Security", color: "bg-teal-200 text-teal-800" },
  {
    name: "Isabelle",
    role: "Data Scientist",
    color: "bg-cyan-200 text-cyan-800",
  },
  { name: "Julien", role: "Mobile Dev", color: "bg-sky-200 text-sky-800" },
  { name: "Karine", role: "Marketing", color: "bg-blue-200 text-blue-800" },
];

export default function LandingTeam() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      <LandingNav />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Meet the Team
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            The 11 passionate individuals behind KanbanFlow, dedicated to
            simplifying your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div
                className={`h-32 w-32 rounded-full ${member.color} flex items-center justify-center text-3xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {member.name}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                {member.role}
              </p>
            </div>
          ))}
          {/* Filler to make grid nice if needed, or just let it flow */}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-slate-900">KanbanFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-900">
              Home
            </a>
            <a href="#" className="hover:text-slate-900">
              Team
            </a>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 KanbanFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
