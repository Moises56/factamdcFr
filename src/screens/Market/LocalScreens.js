// local
// import { MarketContext } from "../../context/MarketProvider";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LocalScreens = () => {
  // const { marketState } = useContext(MarketContext);
  // const { products } = marketState;
  const { navigate } = useNavigation();

  return (
    <View>
      <Text>LocalScreens!</Text>
      <Button
        title="Ir a detalle"
        // onPress={() => navigate("MarketDetailScreen")}
      />
    </View>
  );
};

export default LocalScreens;
