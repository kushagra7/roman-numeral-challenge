"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  View,
  Heading,
  Text,
  Flex,
  Divider,
  Content,
  ProgressCircle,
  Form,
  Provider,
  defaultTheme
} from "@adobe/react-spectrum";
import ErrorAlert from "../components/ui/ErrorAlert";

export default function RomanNumeralConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError("");
    setOutput("");

    const number = parseInt(input, 10);
    if (isNaN(number) || number < 1 || number > 3999) {
      setError("Please enter a valid integer between 1 and 3999");
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

  return (
    <Provider theme={defaultTheme}>
      <View padding="size-1000" backgroundColor="gray-50" minHeight="100vh">
        <View
          backgroundColor="white"
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-500"
          maxWidth="size-6000"
          margin="0 auto"
          shadow="medium"
        >
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
                width="size-2000"
                marginTop="size-100"
              >
                {isLoading ? (
                  <ProgressCircle size="S" isIndeterminate aria-label="Converting..." />
                ) : (
                  "Convert to Roman"
                )}
              </Button>
            </Flex>
          </Form>

          {/* Results Section */}
          {output && (
            <View
              marginTop="size-400"
              borderRadius="medium"
              borderWidth="thin"
              borderColor="dark"
              overflow="hidden"
            >
              <Heading level={2} margin="size-300" marginBottom="size-200">
                Result
              </Heading>
              <Divider size="S" />

              <Flex direction="row">
                <View flex="1" padding="size-300" borderEndWidth="thin" borderEndColor="dark">
                  <Flex direction="column" gap="size-100">
                    <Text>Input number</Text>
                    <Text>{input}</Text>
                  </Flex>
                </View>

                <View flex="1" padding="size-300">
                  <Flex direction="column" gap="size-100">
                    <Text>Roman numeral</Text>
                    <Text>{output}</Text>
                  </Flex>
                </View>
              </Flex>
            </View>
          )}

          {error && <ErrorAlert message={error} />}
        </View>
      </View>
    </Provider>
  );
}
