//recebe "15:00"
// -> ["15","00"]
//convert [15, 00]
//return 1500
export function convertHoursToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = hours * 60 + minutes;
  return minutesAmount;
}
