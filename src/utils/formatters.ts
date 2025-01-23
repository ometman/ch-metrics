export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInHours < 48) return 'Yesterday';
  return formatDate(date);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
  }
  return phone;
}