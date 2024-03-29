import fs from 'fs'
import path from 'path'


export function buildFeedBackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedBack(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data 
}

function handler(req, res) {
    if (req.method == 'POST') {
        const email = req.body.email 
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }
        
        // store that in a database or in a file 
        const filePath = buildFeedBackPath()
        const data = extractFeedBack(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({message: 'Success', feedback: newFeedback})

    }
    else{
        const filePath = buildFeedBackPath()
        const data = extractFeedBack(filePath)
        res.status(200).json({feedback: data})
    }
}

export default handler;