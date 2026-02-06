import mongoose from "mongoose";

//class schema
const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    days: {
      type: [String],//this will be an array
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    venue: {
        type:String,
        required:true
    },
    reminderMinutes: {
    type: Number,
    default: 10,
  },
    notes: String,
  materials: String,
  lastNotifiedDate: Date,
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
