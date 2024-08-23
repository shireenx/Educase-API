const dotenv=require('dotenv');
const mysql=require('mysql2/promise')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: process.env.db,
    password:process.env.password
    
});
db.query("SELECT 1")
.then(()=>{
    console.log("mysql db connected");
})
.catch((error)=>{
    console.log(error);
})
const addSchool=async(req,res)=>{
   
        //const {name,address,latitude,longitude}=req.body;
        const name=req.body.name;
        const address=req.body.address;
        const latitude=req.body.latitude;
        const longitude=req.body.longitude;
        if(!name || !address || !latitude || !longitude ){
            return res.status(500).send({
                success:false,
                message:'incorrect data'
            })
        } try {
        const data=await db.query(`INSERT INTO school (name,address,latitude,longitude) VALUES(?,?,?,?)`,[name,address,latitude,longitude])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'error in post request'
            })
        }
        res.status(201).send({
            success:true,
            message:'school added',
            payload:{
                name:name,
                address:address,
                latitude:latitude,
                longitude:longitude
            }
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            msg:'Error in post request'
        })
    }
}
const getSchool=async(req,res)=>{
    const lat=req.params.lat;
    const lng=req.params.lng;
    if(!lat|| !lng ){
        return res.status(500).send({
            success:false,
            message:'incorrect data'
        })
    } try {
    const data=await db.query(
    `SELECT 
    id,
    name,
    latitude,
    longitude,
    (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance
    FROM 
    school
    ORDER BY 
    distance;`,
        [lat,lng,lat])
    if(!data){
        return res.status(404).send({
            success:false,
            message:'error in get request'
        })
    }
    res.status(201).send({
        success:true,
        message:'List of Schools Nearest',
        payload:{
            data:data[0]
        }
    })
} catch (error) {
    res.status(500).send({
        success:false,
        msg:'Error in get request'
    })
}
}
module.exports={addSchool,getSchool}