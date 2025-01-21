"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Heading,
  Text,
  Flex,
  ProgressCircle,
  Form,
  Provider,
  lightTheme,
  darkTheme,
} from "@adobe/react-spectrum";
import Light from "@spectrum-icons/workflow/Light";
import Moon from "@spectrum-icons/workflow/Moon";
import ErrorAlert from "../components/ui/ErrorAlert";
import Card from "../components/ui/Card";
import ResultDisplay from "../components/ui/ResultDisplay";

export default function RomanNumeralConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage theme state

  const handleConvert = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError("");
    setOutput("");

    const number = parseInt(input, 10);
    if (isNaN(number) || number < 1 || number > 3999) {
      setError("Please Enter A Valid Integer Between 1 and 3999");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/romannumeral?query=${number}`);
      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setError(data.error || "An error occurred during conversion");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle theme
  };

  return (
    <Provider theme={isDarkMode ? darkTheme : lightTheme} colorScheme={isDarkMode ? "dark" : "light"}>
      <div style={{ padding: "20px", minHeight: "100vh" }}>
        {/* Dark/Light Theme Switching Button */}
        <Flex justifyContent="end" marginBottom="size-200">
          <Button variant="secondary" onPress={toggleTheme}>
            <Flex alignItems="center" gap="size-100">
              {isDarkMode ? (
                <Light size="S" aria-label="Switch to Light Mode" />
              ) : (
                <Moon size="S" aria-label="Switch to Dark Mode" />
              )}
              <Text>{isDarkMode ? "Light Mode" : "Dark Mode"}</Text>
            </Flex>
          </Button>
        </Flex>

        <Card>
          <Heading level={1} marginBottom="size-200">
            Roman Numeral Converter
          </Heading>
          <Text marginBottom="size-100">
            Enter a number between 1 and 3999 to convert it to Roman numerals
          </Text>

          <Form onSubmit={handleConvert}>
            <Flex direction="column" gap="size-300">
              <TextField
                label="Number to convert"
                type="number"
                placeholder="e.g., 1234"
                value={input}
                onChange={(value) => {
                  setInput(value);
                  setOutput("");
                  setError("");
                }}
                width="100%"
                maxWidth="size-4600"
                isRequired
                min={1}
                max={3999}
              />

              <Button
                variant="cta"
                type="submit"
                isDisabled={!input.trim() || isLoading}
                width="size-3000"
                marginTop="size-100"
                justifyContent="center"
                alignItems="center"
              >
                {isLoading ? (
                  <ProgressCircle size="S" isIndeterminate aria-label="Converting..." />
                ) : (
                  "Convert To Roman Numeral"
                )}
              </Button>
            </Flex>
          </Form>

          {/* Results Section */}
          {output && <ResultDisplay input={input} output={output} />}
          {error && <ErrorAlert message={error} />}
        </Card>
      </div>
    </Provider>
  );
}
