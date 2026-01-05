import { useProjects } from "../hooks/useProject";
import Layout from "@/layout";
import { useQueries } from "@tanstack/react-query";
import { getTasks } from "@/api/tasks.api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Layout as LayoutIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";


const Stats = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const allProjects = projects?.data || [];

  // liste de requêtes pour CHAQUE projet
  const taskQueries = useQueries({
    queries: allProjects.map((project) => ({
      queryKey: ["tasks", project.id],
      queryFn: () => getTasks(project.id),
      enabled: !!project.id,
    })),
  });

  // vérifie si l'une des requêtes est encore en cours
  const isTasksLoading = taskQueries.some((query) => query.isLoading);

  // aplatit tous les résultats dans un seul tableau "allTasks"
  const allTasks = taskQueries
    .filter((query) => query.data) // ne garde que les requêtes réussies
    .flatMap((query) => query.data.data); // fusionne les tableaux de tâches

  if (projectsLoading || isTasksLoading) {
    return <Layout><div className="p-8">Chargement des statistiques globales...</div></Layout>;
  }

  const todo = allTasks.filter((t) => t.status === "todo");
  const doing = allTasks.filter((t) => t.status === "doing");
  const done = allTasks.filter((t) => t.status === "done");

  const status = [
    { name: 'À faire', value: todo.length, color: '#9ca3af' },
    { name: 'En cours', value: doing.length, color: '#fbbf24' },
    { name: 'Terminé', value: done.length, color: '#10b981' },
  ];

  const tasksByProject = allProjects.map((project, index) => ({
    name: project.nom,
    count: taskQueries[index]?.data?.data?.length || 0,
  }));

  return (
      <Layout>
      <div className="p-4 bg-gray-50/50 min-h-screen">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        </header>

        {/* RANGÉE DES CHIFFRES CLÉS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<LayoutIcon size={20} className="text-[#633BBC]" />}
            label="Total Projets"
            value={allProjects.length}
          />
          <StatCard
            icon={<CheckCircle2 size={20} className="text-emerald-500" />}
            label="Tâches Terminées"
            value={done.length}
            color="bg-emerald-50"
          />
          <StatCard
            icon={<Clock size={20} className="text-amber-500" />}
            label="En cours"
            value={doing.length}
            color="bg-amber-50"
          />
          <StatCard
            icon={<AlertCircle size={20} className="text-gray-400" />}
            label="À faire"
            value={todo.length}
            color="bg-gray-100"
          />
        </div>

        {/* GRAPHIQUES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Graphique de répartition des tâches (Donut) */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-8 text-lg">État global des tâches</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={status}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {status.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          {/* Graphique de charge par projet (Barres) */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-8 text-lg">Volume de tâches par projet</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByProject} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={12} 
                    tick={{ fill: "#9ca3af" }}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#633BBC" 
                    radius={[8, 8, 0, 0]} 
                    barSize={32} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

// Composant StatCard
const StatCard = ({ icon, label, value, color = "bg-gray-50" }) => (
  <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1">
    <div className={`p-4 ${color} rounded-2xl flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default Stats;