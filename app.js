const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    click: {type: Number, default: 0}
})

const Post = mongoose.model('Post', postSchema)

let post = new Post({
    title: 'Teste',
    description: 'Descrição teste'
})

post.save().then(doc=>{
    console.log(doc)
}).catch(error=>{
    console.log(error)
})

mongoose.connect('mongodb://localhost/blog', (error, db)=>{
    console.log(error)
    console.log(db)
})

app.get('/:title', async (req, res)=>{
    let title = req.params.title

    try{
        let doc = await Post.findOne({title: title})
        console.log(doc)
        res.redirect(doc.url)
    
    } catch(error){
        res.send(error)
    }
})

app.listen(PORT, ()=>{
    console.log('Server Running On Port:', PORT)
})