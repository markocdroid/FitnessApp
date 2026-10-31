const DAILY_QUOTE_URL = 'https://zenquotes.io/api/today';

// Fetches ZenQuotes' quote of the day: the API returns [{ q: quote, a: author }].
export async function fetchQuotes() {
  const response = await fetch(DAILY_QUOTE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  const data = await response.json();
  if (!Array.isArray(data) || !data[0]?.q) {
    // The free tier answers rate-limited requests with a 200 and a non-quote payload.
    throw new Error('Unexpected quotes response');
  }
  return data.map(({ q, a }) => ({ text: q, author: a }));
}
