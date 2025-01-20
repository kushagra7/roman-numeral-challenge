import { View, Text, Flex } from "@adobe/react-spectrum";

const ErrorAlert = ({ message }) => {
  return (
    <View
      backgroundColor="white"
      borderRadius="medium"
      padding="size-100"
      marginTop="size-100"
      UNSAFE_style={{
        border: "1px solid rgb(210, 45, 58)", // Red border for the error box
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
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
            color: "rgb(210, 45, 58)",
            fontSize: "0.925rem",
            fontWeight: 500,
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
