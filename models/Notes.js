import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add the title'],
        unique: true,
        trim: true,
        maxlength: [40, "Title cannot be more than 40 characters"]
    },
    description: {
        type: String,
        required: true,
        maxlength: [2000, 'The description should not be more than 2000 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema)




