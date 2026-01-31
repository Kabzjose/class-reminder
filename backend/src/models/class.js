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
    reminderMinutes: Number
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
