import { getCity } from "@/lib/controller";

/**
 * Get
 * City
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // logic
    let results = await getCity();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}