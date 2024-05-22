import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getMarkets } from "../../services/MarketService";

function MarketDetailScreen({ navigation }) {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await getMarkets();
      const marketsData = response.data; // Accede al array de mercados
      setMarkets(marketsData);
      console.log("Markets: ", marketsData);
    } catch (error) {
      console.error("Error fetching markets: ", error);
    }
  };

  const MarketCard = ({ market }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Local", { marketId: market.id })}
    >
      <Text style={styles.name}>{market.nombre_mercado}</Text>
      <Text style={styles.address}>{market.direccion}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercados</Text>
      <FlatList
        data={markets}
        renderItem={({ item }) => <MarketCard market={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#5ccedf",
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#657",
  },
});

export default MarketDetailScreen;
