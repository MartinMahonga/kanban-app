export const MemberSelect = ({ members, selectedMember, onSelect }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-semibold text-gray-700 ml-1">Assigner à</label>
    <select 
      value={selectedMember}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#633BBC] bg-white shadow-sm appearance-none cursor-pointer"
    >
      <option value="">Sélectionner un membre</option>
      {members.map(member => (
        <option key={member.id} value={member.id}>{member.name}</option>
      ))}
    </select>
  </div>
);