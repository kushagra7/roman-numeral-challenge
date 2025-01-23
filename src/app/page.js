"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Heading,
  Text,
  Flex,
  View,
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

const LIGHT_MODE_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
  "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3",
  "https://images.unsplash.com/photo-1499678329028-101435549a4e",
  "https://images.unsplash.com/photo-1655853059431-f214f52f0e02",
];

const DARK_MODE_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac",
  "https://images.unsplash.com/photo-1477346611705-65d1883cee1e",
  "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb",
  "https://images.unsplash.com/photo-1509023464722-18d996393ca8"
];

export default function RomanNumeralConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage theme state
  const [bgImage, setBgImage] = useState(LIGHT_MODE_BACKGROUNDS[0]);

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

    // Current wallpaper
    const availableBackgrounds = isDarkMode
      ? LIGHT_MODE_BACKGROUNDS.filter((bg) => bg !== bgImage)
      : DARK_MODE_BACKGROUNDS.filter((bg) => bg !== bgImage);

    const newBgImage =
      availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];

    setBgImage(newBgImage);
  };


  return (
    <Provider theme={isDarkMode ? darkTheme : lightTheme} colorScheme={isDarkMode ? "dark" : "light"}>
      {/* Background View */}
      <View
        backgroundColor="transparent"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        UNSAFE_style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

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
