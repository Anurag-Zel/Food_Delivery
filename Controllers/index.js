import db from "../Database/index.js";

const addOrganisation = async(req,res) => {
    const {org_id, org_name} = req.body;

    try{
        await db.query("INSERT INTO organisation (org_id, org_name) values($1, $2)",[org_id,org_name]);

        res.status(200).send("Successfully added Organisation");
    }catch(error){
        res.status(500).send(error);
    }
}

const viewOrganisation = async(req,res) => {
    try{
        const response =  await db.query("SELECT * FROM organisation");
        const resultArray = response.rows;

        res.json(resultArray);
    }catch(error){
        res.status(500).send(error);
    }
}

const addItem = async(req,res) => {
    const {item_id, item_type, item_description} = req.body;

    try{
        await db.query("INSERT INTO item (item_id, item_type, item_description) values ($1, $2, $3)", [item_id,item_type,item_description]);

        res.status(200).send("Successfully added Item");
    }catch(error){
        res.status(500).send(error);
    }
}

const viewItem = async(req,res) => {
    try{
        const response = await db.query("SELECT * FROM item");
        const resultArray = response.rows;

        res.json(resultArray);
    }catch(error){
        res.status(500).send(error);
    }
}

const addPricing = async(req,res) => {
    const {org_id, item_id, zone, base_distance, per_km_price, fix_price} = req.body;

    try{
        await db.query("INSERT INTO pricing (org_id, item_id, zone, base_distance, per_km_price, fix_price) values ($1, $2, $3, $4, $5, $6)",[org_id, item_id, zone, base_distance, per_km_price, fix_price]);
    
        res.status(200).send("Successfully added Pricing");
    }catch(error){
        res.status(500).send(error);
    }
}

const viewPricing = async(req,res) => {
    try{
        const response = await db.query("SELECT * FROM pricing");
        const resultArray = response.rows;

        res.json(resultArray);
    }catch(error){
        res.status(500).send(error);
    }
}

const calculatePrice = async(req,res) => {
    const {zone, organization_id, total_distance, item_type} = req.body;
    const capitalizedZone = zone.charAt(0).toUpperCase() + zone.slice(1);
    let totalPrice = 0;

    try{
        const response = await db.query("SELECT p.org_id, p.item_id, p.zone, i.item_type, p.base_distance, p.per_km_price, p.fix_price FROM pricing p JOIN item i ON p.item_id = i.item_id WHERE p.zone = $1 AND p.org_id = $2 AND i.item_type = $3", [`${capitalizedZone}`,`${organization_id}`,`${item_type}`]);
        const resultArray = response.rows;


        for(let i=0; i<resultArray.length; i++){
            if(total_distance <= resultArray[i].base_distance){
                totalPrice += parseFloat(resultArray[i].fix_price);
            }else{
                totalPrice += parseFloat(resultArray[i].fix_price) + ((total_distance - resultArray[i].base_distance) * parseFloat(resultArray[i].per_km_price)) ;
            }
        }

        const totalPriceInCents = Math.round(totalPrice * 100);

        res.json({total_price : totalPriceInCents});
    }catch(error){
        res.status(500).send(error);
    }
}

export {addOrganisation, viewOrganisation, addItem, viewItem, addPricing, viewPricing, calculatePrice} 