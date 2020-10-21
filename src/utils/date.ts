export const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US')}`;
};
