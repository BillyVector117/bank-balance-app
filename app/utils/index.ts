// Currency formatter
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const getMonths = (monthNumber: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Convertir el string a número entero
  const indexMonth = parseInt(monthNumber, 10);

  // Validar que el número esté entre 01 y 12
  if (indexMonth < 1 || indexMonth > 12) {
    throw new Error("El número del mes debe estar entre '01' y '12'.");
  }

  return months[indexMonth - 1]; // Restar 1 porque los arrays son base 0
} 