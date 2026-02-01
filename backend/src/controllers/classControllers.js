import Class from "../models/class.js";



//create class
const createClass= async(req,res)=>{
    try {
   const {name,days,startTime,endTime,venue,reminderMinutes}=req.body;

   if(!name || !days || !startTime|| !endTime || !venue || !reminderMinutes){
    return res.status(400).json({message:"All fields are required"})
   }
   const unitClass=await Class.create({name,days,startTime,endTime,venue,reminderMinutes,user:req.user.id});
   return res.status(201).json({
    message:"Class created successfully",
    unitClass
   });
    }catch (error) {
        console.error("Error creating class:", error);
         res.status(500).json({message:"internal server error",
             
            });
    }
}

//get all classes
const getClass=async(req,res)=>{
    try{
        const getClass=await Class.find({user:req.user.id});//only get users classes
        res.status(200).json({
            message:"classes fetched successfully",
            getClass
        });

    }catch(error){
        console.error("Error fetching classes:", error);
  res.status(500).json({message:"internal server error"
    }
)}
}

//update classes
const updateClass=async(req,res)=>{
    try{
      
      const unitClass= await Class.findByIdAndUpdate(
        req.params.id,req.body,{new:true});
       if(!unitClass){
        return res.status(404).json({message:"class not found"});
 }
    res.status(200).json({
        message:"class updated successfully",
        unitClass
    });
    }catch(error){
       res.status(500).json({message:"internal server error",
        error
    })
}
}

//delete classes
const deleteClass=async (req,res)=>{
    try{
        const deleted= await Class.findByIdAndDelete
        (req.params.id);
        if(!deleted){
            return res.status(404).json({message:"class not found"});
        }
        res.status(200).json({
            message:"class deleted successfully",
            deleted
        });
    }catch(error){

    }
}

export {createClass, getClass, updateClass, deleteClass};