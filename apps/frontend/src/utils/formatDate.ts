// utils/formatDate.ts
export const formatEventDateTime = (
  start: Date,
  end: Date
): string => {
  const pad = (n: number) => n.toString().padStart(2, "0")

  const year = start.getFullYear()
  const month = pad(start.getMonth() + 1)
  const day = pad(start.getDate())

  const startHour = pad(start.getHours())
  const startMin = pad(start.getMinutes())

  const endHour = pad(end.getHours())
  const endMin = pad(end.getMinutes())

  return `${year}/${month}/${day} ${startHour}:${startMin}〜${endHour}:${endMin}`
}
