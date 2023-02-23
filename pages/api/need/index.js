import { getNeed } from "@/lib/controller";
import { runMiddleware } from "../cors";

/**
 * Get
 * Need
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // 
    await runMiddleware(req, res)

    // logic
    let results = await getNeed();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}