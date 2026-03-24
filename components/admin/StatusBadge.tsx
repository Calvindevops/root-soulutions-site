export default function StatusBadge({ status }: { status: string }) {
  const mapping: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    new: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    contacted: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    converted: "bg-green-100 text-green-800",
    available: "bg-green-100 text-green-800",
    active: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-red-100 text-red-800",
    read: "bg-gray-100 text-gray-600",
  };
  
  const defaultClass = "bg-gray-100 text-gray-800";
  const statusLower = status.toLowerCase();
  
  let displayStatus = status;
  let colorClass = mapping[statusLower] || defaultClass;
  
  if (statusLower === 'available' || statusLower === 'active' || statusLower === 'true') {
    displayStatus = 'Active';
    colorClass = mapping['active'];
  } else if (statusLower === 'false' || statusLower === 'unavailable') {
    displayStatus = 'Inactive';
    colorClass = "bg-gray-100 text-gray-600";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${colorClass}`}>
      {displayStatus}
    </span>
  );
}
