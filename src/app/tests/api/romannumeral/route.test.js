import { GET } from '../../../api/romannumeral/route.js';
import { NextRequest } from 'next/server';

describe('Roman Numeral Converter', () => {
  const createRequest = (query) => {
    const url = new URL(`http://localhost:3000/api/roman?query=${query}`);
    return new NextRequest(url);
  };

  // Test valid conversions
  test('converts 1 to I', async () => {
    const request = createRequest('1');
    const response = await GET(request);
    const result = await response.json();

    expect(result).toEqual({
      input: '1',
      output: 'I',
    });
  });

  test('converts 2024 to MMXXIV', async () => {
    const request = createRequest('2024');
    const response = await GET(request);
    const result = await response.json();

    expect(result).toEqual({
      input: '2024',
      output: 'MMXXIV',
    });
  });

  // Test invalid inputs
  test('handles empty input', async () => {
    const request = createRequest('');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Missing or invalid query parameter'); // Updated message
  });

  test('handles non-numeric input', async () => {
    const request = createRequest('abc');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Input must be a valid positive number with no special characters');
  });

  test('handles out of range number', async () => {
    const request = createRequest('4600');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Number must be between 1 and 3999 (inclusive)');
  });

  test('handles 0 as input', async () => {
    const request = createRequest('0');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Number must be between 1 and 3999 (inclusive)');
  });

  test('handles negative input', async () => {
    const request = createRequest('-10');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Input must be a valid positive number with no special characters'); // Updated message
  });

  test('handles input with decimal values', async () => {
    const request = createRequest('10.5');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Input must be a valid positive number with no special characters');
  });

  test('handles invalid URL encoding in query', async () => {
    const request = createRequest('%E0%A4%A');
    const response = await GET(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Invalid URL encoding in query parameter');
  });
});
