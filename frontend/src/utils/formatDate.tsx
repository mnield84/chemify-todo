export function formatDateIntl(dateString: string): string {
  const date = new Date(dateString);

  // Define options for date formatting with specific types
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Define options for time formatting with specific types
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Using 'en-GB' locale for demonstration; adjust as needed
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
    date
  );

  return `${formattedDate}: ${formattedTime.toLowerCase()}`;
}
