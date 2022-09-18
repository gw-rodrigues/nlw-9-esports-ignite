//recebe 1500
// -> [15,00]
//convert ["15", "00"]
//return "15:00"
export function convertMinutesToHours(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
