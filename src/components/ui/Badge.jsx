export const Badge = ({ children, color = "purple" }) => {
  const colors = {
    purple: "bg-[#633BBC]/10 text-[#633BBC]",
    blue: "bg-blue-50 text-blue-600",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};