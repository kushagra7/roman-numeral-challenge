import { View } from "@adobe/react-spectrum";

const Card = ({ children }) => {
  return (
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
      {children}
    </View>
  );
};

export default Card;
