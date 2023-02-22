export default function handler(req, res) {
    // get all
    let results = ["TEST"];

    // reponse result
    if (!results) res
        .status(404)
        .send("Not found");
    else res
        .status(200)
        .json(results);
}