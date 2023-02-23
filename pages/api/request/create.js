import { createRequest } from "@/lib/controller";
import { runMiddleware } from "../cors";

/**
 * Post
 * Request
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
 
    // 
    await runMiddleware(req, res)

    // Get data submitted in request's body.
    const body = req.body

    // Guard clause checks
    if (!body) res
        .status(400)
        .send("Bad request")

    // logic
    let results = await createRequest(body);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}