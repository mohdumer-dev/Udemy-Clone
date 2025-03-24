import { ProfileModel } from "../models/Profile";
import { UserModel } from "../models/User";

// Update userProfile
export const UpdateProfile = async (req, res) => {
  try {
    // get userId from md
    const user = req.id;

    // get the data
    const { dateofbirth, gender, about } = req.body;
    // validation
    if (!dateofbirth || !gender || !about) {
      return res
        .status(400)
        .json({ success: false, msg: "Field can't be left empty" });
    }
    // get the userObject
    const UserObject = await UserModel.findOne({ _id: user });
    // update the UserProfile
    await ProfileModel.findOneAndUpdate(
      { _id: UserObject.additionalDetails },
      { dateofbirth, gender }
    );
    return res.status(200).json({success:true,msg:"Profile has been updated Sucessfully"})
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Error while updating Profile" });
  }
};

// Delete UserProfile
//__// Add  //  use schedule for wait for the request

export const DeleteUser=async (req,res) => {
    try{
        // get user from md
        const user_id=req.id
        const User=await UserModel.findOne({_id:user_id})
        if(!User){
            return res.status(400).json({success:false,msg:"No User Found"})
        }
        // get UserModel
        const UserObject=await UserModel.findOne({_id:user_id})
        // delete the userProfile
        await ProfileModel.findOneAndDelete({_id:UserObject.additionalDetails})
        // TODO : Delte the sttudnet enrolled in all course
        // delete  the UserModel
        await UserObject.deleteOne({_id:user_id})

    }catch(err){
        return res.status(500).json({success:false,msg:"Server Down while  Deleting UserProfile"})
    }
}

//  allProfileData
export const ProfileData=async (req,res) => {
    try{
        // get the userId
        const user_id=req.id
        // fetch Model
        const UserDetails=await UserModel.findById(user_id).populate("additionalDetails").exec()
        // return
        return res.status(200).json({success:true,msg:"User all details",UserDetails})
    }catch(err){
        return  res.status(500).json({success:false,msg:"Server Down while Fetch UserDetaails"})
    }
}