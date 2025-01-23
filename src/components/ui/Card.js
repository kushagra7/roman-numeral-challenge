import { View } from "@adobe/react-spectrum";

const Card = ({ children }) => {
  return (
    <View
      backgroundColor="gray-50"
      borderWidth="thin"
      borderColor="dark"
      padding="size-400"
      maxWidth="size-6000"
      margin="0 auto"
    >
      {children}
    </View>
  );
};

export default Card;
