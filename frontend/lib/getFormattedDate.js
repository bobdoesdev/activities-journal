export default function getFormattedDate(date) {
  // if no date, then date is today
  if (!date) {
    // todo check if this is today or another date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.toLocaleString('default', { month: 'long' });
    const yyyy = today.getFullYear();
    const formattedDate = `${mm} ${dd}, ${yyyy}`;
    return formattedDate;
  }
}
