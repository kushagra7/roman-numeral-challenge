import { View, Flex, Text, Heading, Divider } from "@adobe/react-spectrum";

const ResultDisplay = ({ input, output }) => {
  return (
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
        {/* Left Column */}
        <View flex="1" padding="size-300" borderEndWidth="thin" borderEndColor="dark">
          <Flex direction="column" gap="size-100">
            <Text>Input number</Text>
            <Text>{input}</Text>
          </Flex>
        </View>

        {/* Right Column */}
        <View flex="1" padding="size-300">
          <Flex direction="column" gap="size-100">
            <Text>Roman numeral</Text>
            <Text>{output}</Text>
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export default ResultDisplay;
