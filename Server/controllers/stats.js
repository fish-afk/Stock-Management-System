const { pool } = require("../models/_mysql");
const jwt = require("jsonwebtoken");

const getInventoryStats = async (req, res) => {
	try {
		const query = "SELECT * FROM Purchases";
		const [purchases] = await pool.query(query);
		const query2 = "SELECT * FROM Sales";
		const [sales] = await pool.query(query2);
		const query3 = "SELECT * FROM Products";
		const [products] = await pool.query(query3);
		const query4 = "SELECT * FROM categories";
		const [categories] = await pool.query(query4);
		const query5 = "SELECT * FROM Customers";
		const [customers] = await pool.query(query5);

		const obj = {
			purchases: purchases,
			sales: sales,
			products: products,
			categories: categories,
			customers: customers,
		};

		return res.send({
			status: "SUCCESS",
			message: "Stats Retrieved",
			data: obj,
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const getCategoryStats = async (req, res) => {
	const sqlQuery = `
  SELECT 
      Categories.category_name, Categories.category_id AS id,
      Products.quantity_in_stock AS product_count
  FROM 
      Categories
  LEFT JOIN 
      Products ON Categories.category_id = Products.category_id
  GROUP BY 
      Categories.category_id;
`;
	const [categories] = await pool.query(sqlQuery);
	return res.send({
		status: "SUCCESS",
		message: "Stats Retrieved",
		data: categories,
	});
};

const getWarehouseDistribution = async (req, res) => {
    const sqlQuery = `
 SELECT 
    p.product_id,
    p.product_name,
    p.quantity_in_stock,
    p.warehouse_id,
    w.warehouse_name,
    w.warehouse_id
FROM 
    Products p
JOIN 
    Warehouses w ON p.warehouse_id = w.warehouse_id;

`;
	const [warehouseDistribution] = await pool.query(sqlQuery);
	return res.send({
		status: "SUCCESS",
		message: "Stats Retrieved",
		data: warehouseDistribution,
	});
}

module.exports = {
	getInventoryStats,
    getCategoryStats,
    getWarehouseDistribution
};
