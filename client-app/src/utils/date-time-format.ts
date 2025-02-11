function formatDateTime(date: string | Date): [string, string] {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
  const formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  return [formattedDate, formattedTime];
}

export default formatDateTime;
