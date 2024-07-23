import { getConnection } from "../database/database";

export const addOrden = async (req, res) => {
  try {
    const { cliente_id, productos, estado } = req.body;
    if (
      cliente_id === undefined ||
      productos === undefined ||
      estado === undefined
    ) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }

    const connection = await getConnection();

    let total = 0;
    for (const producto of productos) {
      const { producto_id, cantidad } = producto;
      const productoResult = await connection.query(
        `SELECT precio FROM producto WHERE id = ${producto_id}`
      );
      const precio = productoResult[0].precio;
      total += precio * cantidad;
    }

    const result = await connection.query(
      `INSERT INTO orden (cliente_id, total, estado) VALUES (${cliente_id}, ${total}, "${estado}")`
    );

    const ordenId = result.insertId;

    for (const producto of productos) {
      const { producto_id, cantidad } = producto;
      await connection.query(
        `INSERT INTO detallesOrden (orden_id, producto_id, cantidad) VALUES (${ordenId}, ${producto_id}, ${cantidad})`
      );
    }

    res.json({ success: true, message: "Orden registrada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrden = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT * FROM orden WHERE id = ${id}`
    );
    const orden = result[0];
    const detallesOrden = await connection.query(
      `SELECT producto_id, cantidad FROM detallesOrden WHERE orden_id = ${id}`
    );

    orden.productos = detallesOrden;
    res.json(orden);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateEstadoOrden = async (req, res) => {
  try {
    const { id, estado } = req.body;
    if (id === undefined || estado === undefined) {
      res.status(400).json({ message: "Por favor rellene todos los campos" });
    }
    const connection = await getConnection();
    await connection.query(
      `UPDATE orden SET estado = "${estado}" WHERE id = ${id}`
    );
    res.json({ success: true, message: "Orden actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const delOrden = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    await connection.query(`DELETE FROM detallesOrden WHERE orden_id = ${id}`);
    await connection.query(`DELETE FROM orden WHERE id = ${id}`);
    res.json({ success: true, message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const methods = {
  addOrden,
  getOrden,
  updateEstadoOrden,
  delOrden,
};
