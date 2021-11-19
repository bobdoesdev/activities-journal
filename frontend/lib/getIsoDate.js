export default function getIsoDate(date) {
  // create a state object for inputs
  if (!date) {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    return today.toISOString();
  }
}
