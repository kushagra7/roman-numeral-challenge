import { View, Text, Flex, useProvider } from "@adobe/react-spectrum";

const ErrorAlert = ({ message }) => {
  const { colorScheme } = useProvider(); // Get the current theme (light or dark)

  const backgroundColor = colorScheme === "dark" ? "gray-900" : "white";
  const borderColor = "red-600"; // Use a consistent red for both themes
  const textColor = colorScheme === "dark" ? "red-400" : "red-600";

  return (
    <View
      backgroundColor={backgroundColor}
      borderRadius="medium"
      padding="size-100"
      marginTop="size-100"
      UNSAFE_style={{
        border: `1px solid var(--spectrum-global-color-${borderColor})`,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for the box
      }}
    >
      <Flex
        gap="size-100"
        alignItems="center"
        justifyContent="start"
        wrap="nowrap"
        UNSAFE_style={{
          opacity: 0.9,
          minHeight: "40px", // Consistent height
        }}
      >
        {/* Icon */}
        <Text
          UNSAFE_style={{
            fontSize: "1.2rem",
            lineHeight: "1",
            display: "flex",
            alignItems: "center",
          }}
        >
          ⚠️
        </Text>

        {/* Message */}
        <Text
          UNSAFE_style={{
            color: `var(--spectrum-global-color-${textColor})`,
            fontSize: "1rem",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          {message}
        </Text>
      </Flex>
    </View>
  );
};

export default ErrorAlert;
