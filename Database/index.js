import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

//Define database
const db = new pg.Pool({
    connectionString : process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

//Connect database
db.connect()
    .then(() => {
        console.log("Connected to database");

        // Define organisation table
        const createOrganisationTableQuery = `
            CREATE TABLE IF NOT EXISTS organisation (
                org_id VARCHAR(3) PRIMARY KEY,
                org_name VARCHAR(100) NOT NULL
            );
        `;
        
        // Create organisation table
        db.query(createOrganisationTableQuery)
            .then(() => console.log("Organisation table created"))
            .catch((error) => console.error("Error creating Organisation table:", error));

        // Define item table
        const createItemTableQuery = `
            CREATE TABLE IF NOT EXISTS item (
                item_id VARCHAR(3) PRIMARY KEY,
                item_type VARCHAR(20) NOT NULL,
                item_description VARCHAR(150)
            );
        `;

        // Create item table
        db.query(createItemTableQuery)
            .then(() => console.log("Item table created"))
            .catch((error) => console.error("Error creating Item table:", error));
        

        // Define pricing table
        const createPricingTableQuery = `
            CREATE TABLE IF NOT EXISTS pricing (
                org_id VARCHAR(3) REFERENCES organisation(org_id),
                item_id VARCHAR(3) REFERENCES item(item_id),
                zone VARCHAR(50),
                base_distance INTEGER,
                per_km_price NUMERIC(8,2),
                fix_price NUMERIC(8,2),
                CONSTRAINT pricing_pk PRIMARY KEY (org_id, item_id, zone)
            );
        `;

        // Create pricing table
        db.query(createPricingTableQuery)
            .then(() => console.log("Pricing table created"))
            .catch((error) => console.error("Error creating Pricing table:", error));


    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

export default db;