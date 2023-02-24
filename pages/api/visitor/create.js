import { createVisitor } from "@/lib/controller";
import { runMiddleware } from "../cors";
import requestIp from "request-ip"

export async function getIpAddress(req) {
    return await requestIp.getClientIp(req);
}

/**
 * Post
 * navigator
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

    // add ip
    body.ip = await getIpAddress(req)

    // logic
    let results = await createVisitor(body);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}