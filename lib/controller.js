/**
 * @file Controllers
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

// We set the time zone
process.env.TZ = "UTC"

// import required modules
import client from "./database.js";
import { ObjectId } from "mongodb";

// defination
var connection
var db;

// database Name
const databaseName = process.env.ARTICLE_CLUSTER_DATABASE || "";

/**
 * Global connection
 */
async function globalConfiguration() {
    if (!global.db) {
        connection = await client.connect();
        global.db = connection.db(databaseName)
    }
    db = global.db
}

/**
 * get document collection
 * @param {string} collactionName collaction name
 * @returns DB.collection<Document>
 */
async function getCollection(collactionName) {
    // Global confiuration
    await globalConfiguration()
    // get collection
    return await db.collection(collactionName);
}

/**
 * get all city
 * @returns [city]
 */
export async function getCity() {

    // get collection
    let collection = await getCollection("city");

    // find them
    let results = await collection.find({})
        // asc
        .sort({ cityName: 1 })
        //
        .toArray();

    // response
    return results;
}

/**
 * get all need
 * @returns [need]
 */
export async function getNeed() {
    // get collection
    let collection = await getCollection("need");

    // find them
    let results = await collection.find({})
        // asc
        .sort({ kind: 1 })
        //
        .toArray();

    // response
    return results;
}

/**
 * get all request
 * @returns [request]
 */
export async function getRequest() {
    // get collection
    let collection = await getCollection("request");

    // find them
    let results = await collection.find({})
        // last record
        .sort({ $natural: -1 })
        //
        .limit(50)
        //
        .toArray();

    // response
    return results;
}

/**
 * get all volunteer
 * @returns [volunteer]
 */
export async function getVolunteer() {
    // get collection
    let collection = await getCollection("volunteer");

    // find them
    let results = await collection.find({})
        // last record
        .sort({ $natural: -1 })
        //
        .limit(50)
        //
        .toArray();

    // response
    return results;
}

/**
 * get all volunteer by id
 * @param {ObjectId} id 
 * @returns volunteer
 */
export async function getVolunteerById(id) {
    // get collection
    let collection = await getCollection("volunteer");

    // find them
    let results = await collection.findOne({ _id: new ObjectId(id) })

    // response
    return results;
}

/**
 * get all participant
 * @returns [participant]
 */
export async function getParticipant() {
    // get collection
    let collection = await getCollection("participant");

    // find them
    let results = await collection.find({})
        // last record
        .sort({ $natural: -1 })
        //
        .limit(50)
        //
        .toArray();

    // response
    return results;
}


/**
 * create request
 * @param {request} document model
 * @returns Document<request>
 */
export async function createRequest(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("request");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * create volunteer
 * @param {request} document model
 * @returns Document<volunteer>
 */
export async function createVolunteer(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("volunteer");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * create participant
 * @param {participant} document model
 * @returns Document<participant>
 */
export async function createParticipant(document) {

    // pre logic
    document.calendar = new Date();
    // to combine we need to transform the object
    document.request_id = new ObjectId(document.request_id)
    document.volunteer_id = new ObjectId(document.volunteer_id)

    // get collection
    let collection = await getCollection("participant");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * Overview of requests and volunteer participation
 * @returns [rvp]
 */
export async function getRVP() {
    // get collection
    let collection = await getCollection("request");

    // find them
    let results = await collection
        // We collect collection data
        .aggregate([
            {
                $lookup: {
                    from: 'participant',
                    localField: '_id',
                    foreignField: 'request_id',
                    as: 'participants'
                }
            }
        ])
        // the array is exported
        .toArray();

    // response
    return results;
}

/**
 * get all geolocation
 * @returns [geolocation]
 */
export async function getGeolocation() {
    // get collection
    let collection = await getCollection("geolocation");

    // find them
    let results = await collection
        .find({
            "calendar": {
                $lt: new Date(),
                $gte: new Date(new Date().setDate(new Date().getDate() - 8))
            }
        })
        // last record
        .sort({ $natural: -1 })
        //
        //.limit(250)
        //
        .toArray();

    // response
    return results;
}

/**
 * create geolocation
 * @param {geolocation} document model
 * @returns Document<geolocation>
 */
export async function createGeolocation(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("geolocation");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * get all navigator
 * @returns [navigator]
 */
export async function getNavigator() {
    // get collection
    let collection = await getCollection("navigator");

    // find them
    let results = await collection
        .find({
            "calendar": {
                $lt: new Date(),
                // last 1 day
                $gte: new Date(new Date().setDate(new Date().getDate() - 24))
            }
        })
        // last record
        .sort({ $natural: -1 })
        //
        //.limit(250)
        //
        .toArray();

    // response
    return results;
}

/**
 * create navigator
 * @param {navigator} document model
 * @returns Document<navigator>
 */
export async function createNavigator(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("navigator");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * get navigator by ip
 * @param {string} ip 
 * @returns navigator
 */
export async function getNavigatorByIp(ip) {
    // get collection
    let collection = await getCollection("navigator");

    // find them
    let results = await collection.findOne({ ip: ip })

    // response
    return results;
}

/**
 * get all visitor
 * History
 * @returns [visitor]
 */
export async function getVisitor() {
    // get collection
    let collection = await getCollection("visitor");

    // find them
    let results = await collection
        .find({
            "calendar": {
                $lt: new Date(),
                // last 1 day
                $gte: new Date(new Date().setDate(new Date().getDate() - 24))
            }
        })
        // last record
        .sort({ $natural: -1 })
        //
        //.limit(250)
        //
        .toArray();

    // response
    return results;
}

/**
 * create visitor
 * History
 * @param {visitor} document model
 * @returns Document<visitor>
 */
export async function createVisitor(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("visitor");

    // add document
    let response = await collection.insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}