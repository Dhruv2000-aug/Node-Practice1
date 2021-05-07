const express=require('express');
const hbs=require('hbs');
const app=express();
const fs=require('fs');


// hbs partial file register
hbs.registerPartials(__dirname+'/views/partials');

// set the template engine
app.set('view engine','hbs');

// set the global variable for hbs tamplete whenever use
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

//user middelware
app.use((req,res,next)=>{
    const now=new Date().toString();
    const log=`${now}:${req.method},${req.url}`;
    fs.appendFileSync('server.log',log+'\n')
    next();
});

// maintaine the auth
app.use((req,res,next)=>{
   res.render('maintanance.hbs');
});

// static file add
app.use(express.static(__dirname+'/public'));

// home page render
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:"Home Page"
    });
});

//about page render
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:"About Page",
        cuurentDate:new Date().getFullYear()
    });
});


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`)); 