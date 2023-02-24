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
        let navigator = {};
        let visitor = {}

        // check navigator [ like user ]
        let isNavigator = await getNavigatorByIp(body.ip)

        // no record
        if (!!isNavigator) {
            // logic
            navigator = await createNavigator(body);
        } else {
            // set
            navigator = isNavigator
        }

        // second logic
        // every time record visitor [ history ]
        visitor = await createVisitor(body)

        // finaly logic        
        let results = navigator

        // reponse result
        if (!results) res
            .status(404)
            .send("Not found");
        else res
            .status(200)
            .send(results);
    } catch (error) {
        console.log(error)
        res
            // 422 Unprocessable Entity
            .status(422)
            .send(error)
    }

}