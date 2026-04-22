import mongoose from "mongoose"

async function connectDb(mongoUri){
try{
    const connect = await mongoose.connect(mongoUri)
    console.log("MongoDb connected !")
}catch(er){
    console.error(er)
}
}
export default connectDb