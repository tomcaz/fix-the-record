// currently using node json db for thirdpart data source
// imagine, this is in an another data center or cloud server which could not be tampered

import { JsonDB, Config } from 'node-json-db';
var db = new JsonDB(new Config("myDataBase", true, false, '/'));

export const save = async (data: any) => {
    return db.push("/data", data);
}

export const read = async () => {
    return db.getData("/data")
}