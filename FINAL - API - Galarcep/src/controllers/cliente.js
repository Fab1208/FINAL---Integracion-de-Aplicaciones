import { getConnection } from "../database/database";

const getClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM cliente");
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCliente = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT * FROM cliente WHERE id = ${id}`
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    if (
      nombre === undefined ||
      email === undefined ||
      telefono === undefined ||
      direccion === undefined
    ) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO cliente (nombre,email,telefono,direccion) VALUES ("${nombre}","${email}",${telefono},"${direccion}")`
    );
    res.json({ success: true, message: "Cliente registrado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id, nombre, email, telefono, direccion } = req.body;
    if (
      id === undefined ||
      nombre === undefined ||
      email === undefined ||
      telefono === undefined ||
      direccion === undefined
    ) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `UPDATE cliente SET nombre = "${nombre}", email = "${email}",telefono = ${telefono},direccion = "${direccion}" WHERE id = ${id}`
    );
    res.json({ success: true, message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const delCliente = async (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `DELETE FROM cliente WHERE id = ${id}`
    );
    res.json({ success: true, message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const methods = {
  getClientes,
  getCliente,
  addCliente,
  updateCliente,
  delCliente,
};
