import { getVolunteerById } from "@/lib/controller";

/**
 * Get
 * Volunter by id
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    // dynamic route
    const { id } = req.query

    // logic
    let results = await getVolunteerById(id);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .send(results);
}