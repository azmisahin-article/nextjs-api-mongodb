import { getRequest } from "@/lib/controller";

/**
 * Get
 * Request
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // logic
    let results = await getRequest();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .json(results);
}