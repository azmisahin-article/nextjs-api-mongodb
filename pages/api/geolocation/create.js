import { createGeolocation } from "@/lib/controller";
import { runMiddleware } from "../cors";

export async function getIpAddress(req) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    return ip
}

/**
 * Post
 * geolocation
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
    body.ip = getIpAddress(req)

    // logic
    let results = await createGeolocation(body);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}