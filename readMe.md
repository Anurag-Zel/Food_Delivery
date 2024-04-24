# Delivery Pricing System

This is a delivery pricing system built with Node.js, Express.js, and PostgreSQL. It provides APIs to manage organisations, items, pricing, and calculate delivery prices based on distance, item type, and delivery zone.

***Github Link :*** https://github.com/Anurag-Zel/Food_Delivery.git

***Deployed link on render :*** https://food-delivery-3-hd5d.onrender.com

## Installation

1. Clone the repository:
```
git clone https://github.com/Anurag-Zel/Food_Delivery.git
```
2. Install dependencies:
```
npm i
```
3. Set up a local PostgreSQL database:
```
import pg from "pg"

const db = new pg.client({
    user : "your-username",
    host : "localhost",
    database : "your-database-name",
    password : "your-postgres-password",
    port : 5432
})

db.connect();
```
4. Set up four tables :
    1. organisation table:
    ```
    CREATE TABLE IF NOT EXISTS organisation
    (
    org_id VARCHAR(3) PRIMARY KEY,
    org_name VARCHAR(100) NOT NULL
    )
    ```

    2. item table:
    ```
    CREATE TABLE IF NOT EXISTS item 
    (
    item_id VARCHAR(3) PRIMARY KEY,
    item_type VARCHAR(20) CHECK (item_type IN ('perishable', 'non-perishable')),
    item_description VARCHAR(150)
    )
    ```

    3. pricing table:
    ```
    CREATE TABLE IF NOT EXISTS pricing 
    (
    org_id VARCHAR(3) REFERENCES organisation(org_id),
    item_id VARCHAR(3) REFERENCES item(item_id),
    zone VARCHAR(50),
    base_distance INTEGER,
    per_km_price NUMERIC(8,2),
    fix_price NUMERIC(8,2),
    CONSTRAINT pricing_pk PRIMARY KEY (org_id, item_id, zone),
    )
    ```

    ***Note :*** Create item and organisation table before pricing. And then insert entries into table.

## API Endpoints

- **Add Organisation**:
  - Endpoint: `POST /add/organisation`
  - Body: `{ "org_id": "<org_id>", "org_name": "<org_name>" }`

  - resquest format eg: 
  ```
  {
    "org_id" : "200",
    "org_name" : "PandaExpress"
  }
  ```

  ***Note :*** the org_id should be unique as it is a primary key.

- **View Organisations**:
  - Endpoint: `GET /view/organisation`

- **Add Item**:
  - Endpoint: `POST /add/item`
  - Body: `{ "item_id": "<item_id>", "item_type": "<item_type>", "item_description": "<item_description>" }`
  - request format eg:
  ```
  {
    "item_id": "999",
    "item_type": "perishable",
    "item_description": "Pâté"
  }
  ```

  ***Note :*** item_id should be unique as it is a primary key.

- **View Items**:
  - Endpoint: `GET /view/item`

- **Add Pricing**:
  - Endpoint: `POST /add/pricing`
  - Body: `{ "org_id": "<org_id>", "item_id": "<item_id>", "zone": "<zone>", "base_distance": <base_distance>, "per_km_price": <per_km_price>, "fix_price": <fix_price> }`
  - response format eg:
  ```
  {
    "org_id": "161",
    "item_id": "827",
    "zone": "Downtown",
    "base_distance": 6,
    "per_km_price": 1.30,
    "fix_price": 12.00
  }
  ```

  ***Note :*** the pair of (org_id, item_id, zone) should be unique.

  ***Note :*** the org_id should be present in organisation table as its an foreign key refrenced from organisation table.

  ***Note :*** the item_id should be present in organisation table as its an foreign key refrenced from item table.

- **View Pricing**:
  - Endpoint: `GET /view/pricing`

- **Calculate Pricing**:
  - Endpoint: `POST /calculate_pricing`
  - Body: `{ "zone": "<zone>", "organization_id": "<organization_id>", "total_distance": <total_distance>, "item_type": "<item_type>" }`
  - Response : `{ total_price : <totalPrice> }`
  - request format eg:
  ```
  {
    "zone": "Central", 
    "organization_id" : "161",
    "total_distance": 5, 
    "item_type" : "perishable"
  }
  ```
  ***Note :*** the response of calculate_pricing gives price in cents.

## Test case
All the test case are written in Test folder.  
