import { getConnection } from "../database/database";

const getProductos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM producto");
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProducto = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT * FROM producto WHERE id = ${id}`
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    if (
      nombre === undefined ||
      descripcion === undefined ||
      precio === undefined ||
      stock === undefined ||
      categoria_id === undefined
    ) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO producto (nombre,descripcion,precio,stock,categoria_id) VALUES ("${nombre}","${descripcion}",${precio},${stock},${categoria_id})`
    );
    res.json({ success: true, message: "Producto registrado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id, nombre, descripcion, precio, stock, categoria_id } = req.body;
    if (
      id === undefined ||
      nombre === undefined ||
      descripcion === undefined ||
      precio === undefined ||
      stock === undefined ||
      categoria_id === undefined
    ) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `UPDATE producto SET nombre = "${nombre}", descripcion = "${descripcion}", precio = ${precio},stock = ${stock}, categoria_id = ${categoria_id} WHERE id = ${id}`
    );
    res.json({ success: true, message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const delProducto = async (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `DELETE FROM producto WHERE id = ${id}`
    );
    res.json({ success: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const methods = {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  delProducto,
};
