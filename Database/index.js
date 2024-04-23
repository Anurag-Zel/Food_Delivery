import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

//Define database
const db = new pg.Client({
    user : process.env.POSTGRES_USERNAME,
    host : "localhost",
    database : process.env.POSTGRES_DATABASE,
    password : process.env.POSTGRES_PASSWORD,
    port : 5432,
});

//Connect database
try{
    db.connect();
    console.log("Connected to database");
}catch(error){
    console.log("Cann't connect to database");
}

export default db;