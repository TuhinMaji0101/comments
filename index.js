// require express....
const express=require("express");
const app=express();

// create a port to connect server and client...
const port=8000;

// require a uuid for unique id...

const {v4 : uuidv4}=require("uuid");

// use methodoverride beacuse change the post method to patch using method override....

const methodoverride=require("method-override")
app.use(methodoverride("_method"));

// to understand the url data ....

app.use(express.urlencoded({extended:true}));
// app.use(express.json());

// use static file in node.....

app.use(express.static("public"));

// creating for template...

app.set("view engine","ejs");

//  create an array obj to store  posts data ....   

let posts=[
    {
        id:uuidv4(),
        username:"Tuhin",
        content:"dream company is microsoft"
    },
    {
        id:uuidv4(),
        username:"Aman",
        content:"nothing is impossible to achive your goal"
    },
    {   id:uuidv4(),
        username:"Amit",
        content:"i love coding"
    }
]

// use to listen a request..
app.listen(port,()=>{
    console.log("hey bro your code is work....");
})

// this  rout show all the posts...

app.get("/posts",(req,res)=>{
     res.render("posts.ejs",{posts});
})

// this rout  use to create a new post....

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let id =uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

//this is use to show individual post....

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

// edit  post....

app.patch("/posts/:id",(req,res)=>{
    const {id}=req.params;  
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
    
})
app.get("/posts/:id/edit",(req,res)=>{
   const {id}=req.params;
   let post=posts.find((p)=>id===p.id);
   res.render("edit.ejs",{post})
})

// delete post...

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
     posts=posts.filter((p)=>id != p.id);
    res.redirect("/posts");
})