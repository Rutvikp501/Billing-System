const mongoose = require('mongoose')
require('dotenv').config()

// const DB_URL= process.env.DBURL;
const DB_URL= 'mongodb://0.0.0.0:27017';
const DB_name='smallproject'
const Connect_DB =async()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('Database Connected...');
    } catch (error) {
        console.error("Error While connecting DB:", error);
    }
};
const ConnectDB_Name =async()=>{
    try {
        await mongoose.createConnection(DB_URL + DB_name);
        console.log(`Database Connected ${DB_name}`);
    } catch (error) {
        console.error("Error While connecting DB:", error);
    }
}

// const ConnectDB_Name = mongoose.createConnection(DB_URL + DB_name,{ } )

// async function closeConnections(){
//     try {
//         await mongoose.connection.close();
//         console.log("MongoDB connections closed.");
//     } catch (error) {
//         console.error("Error closing MongoDB connections:", error);

//     }
// }

// closeConnections();
module.exports={Connect_DB,ConnectDB_Name}