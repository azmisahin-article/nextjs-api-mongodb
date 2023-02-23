import { getRVP } from "@/lib/controller";

/**
 * Get
 * Overview of requests and volunteer participation [RVP]
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // logic
    let results = await getRVP();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}