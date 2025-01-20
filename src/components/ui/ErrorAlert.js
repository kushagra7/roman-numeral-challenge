import { View, Text, Flex, useProvider } from "@adobe/react-spectrum";
import Alert from "@spectrum-icons/workflow/Alert";

const ErrorAlert = ({ message }) => {
  const { colorScheme } = useProvider(); // Get the current theme (light or dark)

  const borderColor = colorScheme === "dark" ? "neutral-50" : "red-600"; // White for dark mode, red for light mode
  const textColor = colorScheme === "dark" ? "neutral-50" : "neutral-900"; // Dynamic text color

  return (
    <View
      borderRadius="medium"
      padding="size-150"
      marginTop="size-150"
      borderColor={borderColor}
      borderWidth="thin"
      boxShadow="medium"
    >
      <Flex
        gap="size-100"
        alignItems="center"
        justifyContent="start"
        wrap="nowrap"
        height="size-400"
      >
        <Alert
          size="L"
          color={textColor}
          aria-label="Alert Icon"
        />

        <Text
          color={textColor}
          fontSize="M"
          fontWeight="medium"
        >
          {message}
        </Text>
      </Flex>
    </View>
  );
};

export default ErrorAlert;
