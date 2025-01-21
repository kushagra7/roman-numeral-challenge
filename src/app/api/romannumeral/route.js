
export async function GET(request) {
  console.log("Requested Route => ", request);
  // Extract The Query Parameter
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  // Validate input
  const validatedNumber = validateInput(query);
  if (!validatedNumber.isValid) {
    return new Response(
      JSON.stringify({
        error: validatedNumber.error,
      }),
      {
        status: 400,
        headers: {"Content-Type": "application/json"}
      }
    );
  }

  const romanNumeral = convertInputToRomanNumeral(validatedNumber.number);

  // Return the JSON response
  return new Response(
    JSON.stringify({
      input: query,
      output: romanNumeral,
    }),
    {
      headers: {"Content-Type": "application/json"},
    }
  );
}

// Function to validate query received thru url
const validateInput = (query) => {
  if (!query || typeof query !== "string") {
    return { isValid: false, error: "Missing or invalid query parameter" };
  }

  try {
    const trimmedQuery = decodeURIComponent(query).trim();
    if (!trimmedQuery) return { isValid: false, error: "Query parameter cannot be empty" };

    const number = Number(trimmedQuery);
    if (!/^\d+$/.test(trimmedQuery) || !Number.isSafeInteger(number)) {
      return { isValid: false, error: "Input must be a valid positive number with no special characters" };
    }

    if (number < 1 || number > 3999) {
      return { isValid: false, error: "Number must be between 1 and 3999 (inclusive)" };
    }

    return { isValid: true, number };
  } catch {
    return { isValid: false, error: "Invalid URL encoding in query parameter" };
  }
};

// Function to convert number to Roman Numeral
const convertInputToRomanNumeral = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  romanNumerals.forEach(([letter, value]) => {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  });

  console.log("Converted Roman Numeral => ", result);
  return result;
};