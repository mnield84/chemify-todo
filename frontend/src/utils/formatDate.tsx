export function formatDateIntl(dateString: string): string {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
    date
  );

  return `${formattedDate}: ${formattedTime.toLowerCase()}`;
}
