// src/app/api/convert/route.js

export async function GET(request) {
  console.log("KP-Route request => ", request);
  // Extract the query parameter
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  // Validate input
  const number = parseInt(query, 10);
  if (isNaN(number) || number < 1 || number > 3999) {
    return new Response("Invalid input. Please provide a number between 1 and 3999.", {
      status: 400,
    });
  }

  // Function to convert number to Roman numeral
  const toRoman = (num) => {
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

    console.log("KP-Result => ", result);
    return result;
  };

  // Convert the number to Roman numeral
  const romanNumeralResult = toRoman(number);

  // Return the JSON response
  return new Response(
    JSON.stringify({
      input: query,
      output: romanNumeralResult,
    }),
    {
      headers: {"Content-Type": "application/json"},
    }
  );
}
