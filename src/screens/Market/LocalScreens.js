import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getMarketsByLocalidad } from "../../services/MarketService";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocalScreens = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { marketId } = route.params;

  const [locales, setLocales] = useState([]);

  useEffect(() => {
    fetchLocales();
  }, []);

  const fetchLocales = async () => {
    try {
      const response = await getMarketsByLocalidad(marketId);
      if (response.status === "ok") {
        setLocales(response.data);
      } else {
        console.error("Error in response status: ", response.message);
      }
    } catch (error) {
      console.error("Error fetching locales: ", error);
    }
  };

  const LocalCard = ({ local }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("LocalDetail", { local })}
    >
      <Text style={styles.name}>{local.nombre_local}</Text>
      <Text style={styles.owner}>Propietario: {local.propietario}</Text>
      <Text style={styles.type}>Tipo: {local.tipo_local}</Text>
      <Text style={styles.status}>Estado: {local.estado_local}</Text>
      <Text style={styles.address}>Dirección: {local.direccion}</Text>
      <Text style={styles.phone}>Teléfono: {local.telefono}</Text>
      <Text style={styles.amount}>Monto: {local.monto}</Text>
      <Text style={styles.creationDate}>
        Fecha de creación: {new Date(local.fecha_creacion).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locales del Mercado</Text>
      <FlatList
        data={locales}
        renderItem={({ item }) => <LocalCard local={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

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
  owner: {
    fontSize: 16,
  },
  type: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
  },
  address: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  creationDate: {
    fontSize: 16,
  },
});

export default LocalScreens;
