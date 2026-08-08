export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCategoryEmoji = (categoryName: string): string => {
  switch (categoryName.toLowerCase()) {
    case 'errands': return '📦';
    case 'delivery': return '🚚';
    case 'moving': return '🪑';
    case 'pet care': return '🐕';
    case 'tutoring': return '📚';
    case 'tech help': return '💻';
    case 'events': return '🎪';
    case 'household': return '🧹';
    default: return '✨';
  }
};

export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'negotiating':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'accepted':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'in_progress':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'completed':
      return 'bg-[#8CE600]/10 text-[#8CE600] border-[#8CE600]/40';
    case 'reviewed':
      return 'bg-green-500/10 text-green-300 border-green-500/30';
    case 'cancelled':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};
