const mongoose = require('mongoose');
const WhiteboardSchema = mongoose.Schema(
    {
        title: 
        {
            type:String,
            required: true
        },
        img:
        {
            data: Buffer,
            contentType: String
        },
        date: 
        {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('WhiteBoards', WhiteboardSchema);