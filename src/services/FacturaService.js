const API = "http://192.168.1.55:3001/invoice";
// const API = "https://backendfactamdc.onrender.com/invoice";

// guardar factura en la base de datos
export const saveInvoice = async (invoiceDetails) => {
  try {
    const response = await fetch(`${API}/facturasMercado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceDetails),
    });
    const result = await response.json();
    // console.log("Invoice saved successfully", result);
    return result;
  } catch (error) {
    console.error("Error saving invoice", error);
  }
};

// obtener todas las facturas
export const getInvoices = async () => {
  try {
    const response = await fetch(`${API}/facturasMercado`);
    // console.log("Response", response);
    // Verificar si la respuesta no es satisfactoria (status diferente a 200)
    if (!response.ok) {
      throw new Error("Error al obtener las facturas");
    }
    const invoices = await response.json();
    // console.log("Invoices", invoices);
    return invoices;
  } catch (error) {
    console.error("Error fetching invoices", error);
    // Si ocurre un error, devolver un array vacío para evitar que la aplicación se bloquee
    return [];
  }
};
