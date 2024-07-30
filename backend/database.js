import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('sensor_data.db',(err)=>{
    if(err){
        console.log("Error al abrir la base de datos:",err.message)
    }
    else{
        console.log("Conexion exitosa a la base de datos")
    }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    valor_luminosidad REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

export default db;
