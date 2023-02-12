import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  username: {
    typeof: String,
  }
});

export default mongoose.model("Hotel", HotelSchema)