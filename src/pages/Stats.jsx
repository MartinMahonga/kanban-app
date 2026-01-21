import { useEffect, useState } from "react";
import { Skeleton } from "../components/ui/Skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle2, ListTodo, TrendingUp, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { fetchProjects } from "../services/project";
import { fetchTasks } from "../services/task";
import { format, subDays, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={cn("p-2 rounded-lg", colorClass)}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    {change && (
      <div className="mt-4 flex items-center text-xs">
        <span
          className={cn(
            "font-medium",
            change.startsWith("+")
              ? "text-green-600"
              : change.startsWith("-")
                ? "text-red-600"
                : "text-slate-600",
          )}
        >
          {change}
        </span>
        <span className="text-slate-400 ml-1">vs semaine dernière</span>
      </div>
    )}
  </div>
);

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
    priorityDistribution: [],
    weeklyActivity: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const projectsData = await fetchProjects();
        const projects = Array.isArray(projectsData)
          ? projectsData
          : projectsData.data || [];

        let allTasks = [];

        // Fetch tasks for all projects
        // Note: In a real production app, you'd want a dedicated analytics endpoint
        // to avoid making N+1 requests.
        await Promise.all(
          projects.map(async (project) => {
            try {
              const tasksData = await fetchTasks(project.id);
              // Adjust depending on API response structure
              const projectTasks = Array.isArray(tasksData)
                ? tasksData
                : tasksData.data || [];
              allTasks = [...allTasks, ...projectTasks];
            } catch (e) {
              console.error(
                `Failed to load tasks for project ${project.id}`,
                e,
              );
            }
          }),
        );

        processStats(allTasks);
      } catch (error) {
        console.error("Failed to load stats data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const processStats = (tasks) => {
    // 1. Counts
    const completed = tasks.filter(
      (t) => t.status === "done" || t.status === "DONE",
    ).length;
    const inProgress = tasks.filter(
      (t) =>
        t.status === "doing" ||
        t.status === "DOING" ||
        t.status === "in_progress",
    ).length;
    const todo = tasks.filter(
      (t) => t.status === "todo" || t.status === "TODO",
    ).length;

    // 2. Priority Distribution
    const priorities = { Haute: 0, Moyenne: 0, Basse: 0 };
    tasks.forEach((task) => {
      // Normalize priority
      const p = (task.priorite || "medium").toLowerCase();
      if (p === "high" || p === "haute") priorities["Haute"]++;
      else if (p === "low" || p === "basse") priorities["Basse"]++;
      else priorities["Moyenne"]++;
    });

    const priorityData = [
      { name: "Haute", value: priorities["Haute"], color: "#ef4444" },
      { name: "Moyenne", value: priorities["Moyenne"], color: "#f59e0b" },
      { name: "Basse", value: priorities["Basse"], color: "#10b981" },
    ].filter((item) => item.value > 0); // Only show existing priorities

    // 3. Weekly Activity (Mocking "Completed" dates as we don't have them, using Created At for "Added")
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = subDays(new Date(), 6 - i);
      return format(d, "EEE", { locale: fr });
    });

    // Initialize counters for last 7 days
    const weeklyStats = last7Days.map((day) => ({
      name: day,
      added: 0,
      completed: 0,
    }));

    tasks.forEach((task) => {
      if (task.created_at) {
        const createdDate = parseISO(task.created_at);
        const dayName = format(createdDate, "EEE", { locale: fr });
        const dayStat = weeklyStats.find((d) => d.name === dayName);
        if (dayStat) dayStat.added++;
      }
      // Since we don't have completed_at, we can't accurately chart completion history.
      // For now we will leave 'completed' at 0 or mock it if needed, but better to show data we have.
      // Alternatively, if 'done', we could assume it was done recently for the visual, but that's misleading.
      // Let's stick to 'Added' tasks for the chart for accuracy.
    });

    setStats({
      totalTasks: tasks.length,
      completedTasks: completed,
      inProgressTasks: inProgress,
      todoTasks: todo,
      priorityDistribution: priorityData,
      weeklyActivity: weeklyStats,
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>

          {/* Side Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <Skeleton className="h-6 w-32" />
            <div className="flex justify-center py-4">
              <Skeleton className="h-48 w-48 rounded-full" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Rapport de Productivité
        </h1>
        <p className="text-slate-500">
          Analysez vos performances et l'avancement de vos projets.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tâches Complétées"
          value={stats.completedTasks}
          change={null} // Cannot calc change without history
          icon={CheckCircle2}
          colorClass="bg-green-100 text-green-600"
        />
        <StatCard
          title="Tâches en Cours"
          value={stats.inProgressTasks}
          change={null}
          icon={ListTodo}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Tâches à Faire"
          value={stats.todoTasks}
          change={null}
          icon={Clock}
          colorClass="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Total Tâches"
          value={stats.totalTasks}
          change={null}
          icon={TrendingUp}
          colorClass="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Nouvelles Tâches (7 derniers jours)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="added"
                  name="Créées"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Par Priorité
          </h3>

          {stats.priorityDistribution.length > 0 ? (
            <>
              <div className="h-64 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.priorityDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.priorityDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          strokeWidth={0}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-slate-900">
                    {stats.priorityDistribution.reduce(
                      (acc, curr) => acc + curr.value,
                      0,
                    )}
                  </span>
                  <span className="text-xs text-slate-400">Total</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {stats.priorityDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              Aucune donnée de priorité
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
