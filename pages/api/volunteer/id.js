import { getVolunteerById } from "@/lib/controller";

export default async function handler(req, res) {

    // dynamic route
    const { id } = req.query

    // get all
    let results = await getVolunteerById(id);

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .json(results);
}