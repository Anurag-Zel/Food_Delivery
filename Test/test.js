// Dependancies
import { use, expect } from 'chai'
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import { describe, it } from 'mocha';

// Configure chai
const server = use(chaiHttp);
dotenv.config();

const deployedLink = process.env.PORT;

describe("Api Tests", () => {
    //Testing add new organisation
    it('Should add new organisation', (done) => {
        server.request(deployedLink)
            .post("/add/organisation")
            .send({
                "org_id" : "300",
                "org_name" : "Panda Food"
            })
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    // Testing add new item
    it('Should add new item', (done) => {
        server.request(deployedLink)
            .post("/add/item")
            .send({
                "item_id": "666",
                "item_type": "non-perishable",
                "item_description": "Cheese Grilled Sandwich"
             })
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    })

    // Testing add new pricing
    it('Should add new pricing', (done) => {
        server.request(deployedLink)
            .post("/add/pricing")
            .send({
                "org_id": "300",
                "item_id": "666",
                "zone": "Downtown",
                "base_distance": 6,
                "per_km_price": 1.30,
                "fix_price": 12.00
            })
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    // Test calculation
    it('Should calculate total price', (done) => {
        server.request(deployedLink)
            .post("/calculate_pricing")
            .send({
                "zone": "Central", 
                "organization_id" : "161",
                "total_distance": 5, 
                "item_type" : "perishable"
            })
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
})