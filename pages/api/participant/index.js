import { getParticipant } from "@/lib/controller";

export default async function handler(req, res) {

    // get all
    let results = await getParticipant();

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .json(results);
}