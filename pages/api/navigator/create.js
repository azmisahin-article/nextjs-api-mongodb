import { createNavigator, createVisitor, getNavigatorByIp } from "@/lib/controller";
import { runMiddleware } from "../cors";

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

    try {

        // 
        await runMiddleware(req, res)

        // Get data submitted in request's body.
        let body = req.body

        // Guard clause checks
        if (!body) res
            .status(400)
            .send("Bad request")

        // add ip
        body.ip = req.clientIp

        // Main Logic
        let navigator;
        let visitor;

        // check navigator [ like user ]
        navigator = await getNavigatorByIp(body.ip)

        // no record
        if (!navigator) {
            // logic
            navigator = await createNavigator(body);
        }

        // second logic
        // every time record visitor [ history ]
        visitor = await createVisitor(body)

        // finaly logic        
        let results = await navigator

        // reponse result
        if (!results) res
            .status(404)
            .send("Not found");
        else res
            .status(200)
            .send(results);
    } catch (error) {
        res
            // 422 Unprocessable Entity
            .status(422)
            .send(error)
    }
}