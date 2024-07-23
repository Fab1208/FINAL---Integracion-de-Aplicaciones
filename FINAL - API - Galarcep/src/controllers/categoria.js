import { getConnection } from "../database/database";

const getCategorias = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM categoria");
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (nombre === undefined || descripcion === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO categoria (nombre,descripcion) VALUES ("${nombre}","${descripcion}")`
    );
    res.json({ success: true, message: "Categoria registrada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id, nombre, descripcion } = req.body;
    if (id === undefined || nombre === undefined || descripcion === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `UPDATE categoria SET nombre = "${nombre}", descripcion = "${descripcion}" WHERE id = ${id}`
    );
    res.json({ success: true, message: "Categoria actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const delCategoria = async (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      `DELETE FROM categoria WHERE id = ${id}`
    );
    res.json({ success: true, message: "Categoria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const methods = {
  getCategorias,
  addCategoria,
  updateCategoria,
  delCategoria,
};
