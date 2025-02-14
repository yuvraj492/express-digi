import express from 'express'
const app=express()
const port=3000
app.get("/",(req,res)=>{
    res.send("hellow....!!!")
})
app.get("/ice-tea",(req,res)=>{
    res.send("hellow from the tea!!!")
})
app.get("/twitter",(req,res)=>{
    res.send("ysrdotcom")
})

app.use(express.json())
let ourData=[]
let nextId=1

//add a new tea
app.post('/teas',(req,res)=>{
    const {name,price}=req.body
    const newData={id:nextId++,name,price}
    ourData.push(newData)
    res.status(201).send(ourData)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(ourData)
})

//get tea with id
app.get('teas/:id',(req,res)=>{
    const tea=ourData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    return res.status(200).send(tea)
})

//update tea
app.put('/teas/:id',(req,res)=>{
    const tea=ourData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
})

//delete Tea
app.delete('teas/:id',(req,res)=>{
    const index=ourData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send('tea not found')
    } 
    ourData.splice(index,1)
    return res.status(204).send('deleted')
})

app.listen(port,()=>{
    console.log(`server is running at port: ${port}...`)
})