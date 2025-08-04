const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'sure1234',
  server: 'localhost',      // Hostname only
  port: 1433,               // Port separately
  database: 'CustOrders',
  options: {
    encrypt: false,         // Use true for Azure
    trustServerCertificate: true,
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ DB Connection Failed:', err);
  });

module.exports = {
  sql, poolPromise
};
