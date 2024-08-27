export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(date);
};
