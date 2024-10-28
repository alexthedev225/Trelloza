  import mongoose, { Schema, Document } from "mongoose";

  interface IEvent extends Document {
    userId: string;
    day: string;
    title: string;
    color: string;
  }

  const EventSchema = new Schema<IEvent>({
    userId: { type: String, required: true },
    day: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
  });

  const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

  export default Event;
