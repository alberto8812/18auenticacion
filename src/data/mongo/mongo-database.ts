import mongoose, { Mongoose } from "mongoose"

interface ConectionOptions{
    mongoUrl:string,
    dbName:string
}

export class MongoDatabese {
    static async connect(options:ConectionOptions){
        const {mongoUrl,dbName}=options;

        try {
            await mongoose.connect(mongoUrl,{
                dbName:dbName,
            });
            return true;
        } catch (error) {
            console.log('mongo conection error')
            throw Error
        }

    }

    static async disconnect(){
        await mongoose.disconnect();
    }
}