import { createVolunteer } from "@/lib/controller";

/**
 * Post
 * Volunteer
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // Get data submitted in request's body.
    const body = req.body

    // Guard clause checks
    if (!body) res
        .status(400)
        .send("Bad request")

    // logic
    let results = await createVolunteer(body);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}