import { getNavigator } from "@/lib/controller";
import { runMiddleware } from "../cors";

/**
 * Get
 * geolocation
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
   
    // 
    await runMiddleware(req, res)

    // logic
    let results = await getNavigator();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .json(results);
}