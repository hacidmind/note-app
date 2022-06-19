import dbConnect from '../../../utils/dbConnect';

import Note from '../../../models/Notes';

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method
} = req


    switch (method) {
        case 'GET': try {
            const notes = await Note.findById(id);
            if (!notes) {
                res.status(400).json({success:false})
            }
            res.status(200).json({
                success: true, data: notes
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
            break;
        
        case 'PUT': try {
            const note = await Note.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });
            if (!note) {
                res.status(400).json({ success: false })
            }
            res.status(200).json({
                success: true, data: note
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
            break;

        case 'DELETE': try {
            const deleteNote = await Note.deleteOne({ _id: id });
            if (!deleteNote) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({
                success: true, data: deleteNote
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
            break;
        default:
            res.status(400).json({ success: false })
            break;
        

    }
}