import React, { createContext, useState, useEffect, useContext } from "react";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from "react-native-bluetooth-escpos-printer";
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BluetoothContext = createContext();

export const BluetoothProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para el usuario logueado
  const [invoiceCount, setInvoiceCount] = useState(0); // Contador de facturas por mes
  const [user, setUser] = useState("");

  useEffect(() => {
    requestPermissions();
    getUserInfo();
    // Obtener el contador de facturas para el mes actual al cargar el contexto
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const lastInvoiceCount = AsyncStorage.getItem(
      `invoiceCount_${year}_${month}`
    );
    if (lastInvoiceCount) {
      setInvoiceCount(parseInt(lastInvoiceCount));
    }
  }, []);

  const getUserInfo = async () => {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");
    setUser(loggedInUser);
  };

  const requestPermissions = async () => {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      ]);
      if (
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
          RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED
      ) {
        console.log("Permissions granted");
      } else {
        console.log("Permissions denied");
      }
    } catch (error) {
      console.error("Permission error:", error);
    }
  };

  const showBluetoothAlert = () => {
    Alert.alert(
      "Bluetooth",
      "Por favor, habilite el Bluetooth para escanear dispositivos.",
      [{ text: "OK" }]
    );
  };

  const startScan = async () => {
    if (!scanning) {
      setDevices([]);
      setScanning(true);
      try {
        const scanResult = await BluetoothManager.scanDevices();
        const foundDevices = JSON.parse(scanResult);
        const paired = foundDevices.paired;
        const found = foundDevices.found;
        setDevices([...paired, ...found]);
      } catch (error) {
        setScanning(false);
        throw new Error("NOT_STARTED");
      } finally {
        setScanning(false);
      }
    }
  };

  const connectDevice = (device) => {
    BluetoothManager.connect(device.address).then(
      (s) => {
        console.log("Connected to", device.name);
        setConnectedDevice(device);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const isBluetoothConnected = () => {
    return connectedDevice !== null;
  };

  const requestBluetoothPermission = async () => {
    await requestPermissions();
  };

  const printInvoice = async (invoiceDetails) => {
    if (connectedDevice) {
      await BluetoothEscposPrinter.printerAlign(
        await BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText("AMDC-FACTURA\n", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 2,
        heigthtimes: 2,
        fonttype: 1,
        aling: "center",
      });

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      // Incrementar el contador de facturas para el mes actual
      setInvoiceCount((prevCount) => prevCount + 1);
      AsyncStorage.setItem(
        `invoiceCount_${year}_${month}`,
        invoiceCount.toString()
      );

      // Formatear el número de factura
      const formattedInvoiceCount = invoiceCount.toString().padStart(3, "0");

      // Generar el número de factura con la estructura deseada
      const invoiceNumber = `AMDC-${year}-${month}-${formattedInvoiceCount}`;
      await BluetoothEscposPrinter.printText(`Factura: ${invoiceNumber}\n`, {});

      // usuario logueado
      await BluetoothEscposPrinter.printText(`Usuario: ${user}\n`, {});

      await BluetoothEscposPrinter.printText(
        `Factura del mes: ${invoiceDetails.mes}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText(
        `Mercado: ${invoiceDetails.mercado}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText(
        `Propietario: ${invoiceDetails.propietario}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText(
        `Fecha: ${invoiceDetails.fechaFactura}\n`,
        {}
      );

      await BluetoothEscposPrinter.printText(
        `numero_local: ${invoiceDetails.numero_local}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText(
        `Concepto: ${invoiceDetails.concepto}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText(
        `Monto a pagar: ${invoiceDetails.monto}\n`,
        {}
      );
      await BluetoothEscposPrinter.printText("\r\n", {});
    } else {
      console.log("No device connected");
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        devices,
        connectedDevice,
        scanning,
        startScan,
        connectDevice,
        printInvoice,
        loggedInUser,
        setLoggedInUser,
        isBluetoothConnected,
        requestBluetoothPermission,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => useContext(BluetoothContext);
