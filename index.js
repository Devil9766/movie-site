import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
const API_URL = "https://api.themoviedb.org/";
const config = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmQ2OWM5OThiN2Y5M2JjMDBkOWUwNjVlZDMwODAxYSIsInN1YiI6IjY1OWE1NDcwMGQxMWYyMDA5NWIzN2YzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-zF60M9R-Djye9nl-frD3L26wdZYqdd21UJGJ7ncjrM'
      }}

var moviePageNo = 1 ;
var tvShowPageNO = 1;
var searchedPages = 1;
var mediaName = "";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , async (req ,res) =>{
    moviePageNo = 1;
    tvShowPageNO = 1;
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc` , config);
        const tvShow = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc` , config);
        res.render("index.ejs" , { 
            data : result.data , 
            tvData : tvShow.data,
            image: imageBaseUrl,

        });
    } catch (error) {
        res.status(404).send(error.response.data);
        console.log(error.message);
    }
    
});

app.get("/nextPage-movie", async (req, res)=>{
    moviePageNo +=1;
    try{
    const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviePageNo}&sort_by=popularity.desc` , config);
    const tvShow = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${tvShowPageNO}&sort_by=popularity.desc` , config);
    res.render("index.ejs" , {
        data : result.data , 
        tvData : tvShow.data,
        image: imageBaseUrl,
        });
    }catch (error){
        res.status(405).send(error.response.data)
    }
})

app.get("/previousPage-movie", async (req, res)=>{
    moviePageNo -=1;
    try{
    const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviePageNo}&sort_by=popularity.desc` , config);
    const tvShow = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${tvShowPageNO}&sort_by=popularity.desc` , config);
    res.render("index.ejs" , {
        data : result.data , 
        tvData : tvShow.data,
        image: imageBaseUrl,
        });
    }catch (error){
        res.status(404).send(error.response.data);
    }
})

app.get("/nextPage-tvShow", async (req, res)=>{
    tvShowPageNO +=1;
    try{
    const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviePageNo}&sort_by=popularity.desc` , config);
    const tvShow = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${tvShowPageNO}&sort_by=popularity.desc` , config);
    res.render("index.ejs" , {
        data : result.data , 
        tvData : tvShow.data,
        image: imageBaseUrl,
        });
    }catch (error){
        res.status(404).send(error.response.data);
    }
})

app.get("/previousPage-tvShow", async (req, res)=>{
    tvShowPageNO -=1;
    try{
        const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviePageNo}&sort_by=popularity.desc` , config);
        const tvShow = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${tvShowPageNO}&sort_by=popularity.desc` , config);
        res.render("index.ejs" , {
            data : result.data , 
            tvData : tvShow.data,
            image: imageBaseUrl,
            });
    }catch (error){
        res.status(404).send(error.response.data);
    }
})

app.post("/searchedMedia" , async (req , res) =>{
    mediaName = req.body["mediaName"] ;
    
    try {
        const result  = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${mediaName}&include_adult=false&language=en-US&page=1` , config)
        res.render("search.ejs" , {
            data : result.data , 
            image: imageBaseUrl,
            });
    } catch (error) {
        res.status(404).send(error.response.data);
    }
})


app.get("/nextPage-Search" , async (req , res) =>{
    searchedPages += 1 ;
    try {
        const result  = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${mediaName}&include_adult=false&language=en-US&page=${searchedPages}` , config)
        res.render("search.ejs" , {
            data : result.data , 
            image: imageBaseUrl,
            });
    } catch (error) {
        res.status(404).send(error.response.data);
    }
})


app.get("/previousPage-Search" , async (req , res) =>{
    searchedPages -= 1 ;
    try {
        const result  = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${mediaName}&include_adult=false&language=en-US&page=${searchedPages}` , config)
        res.render("search.ejs" , {
            data : result.data , 
            image: imageBaseUrl,
            });
    } catch (error) {
        res.status(404).send(error.response.data);
    }
})



app.post("/movieId-name" , async (req , res) =>{
    let newId = req.body.id1;
    console.log(newId);
    let mediaImage = "https://image.tmdb.org/t/p/w780"
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${newId}?language=en-US` , config)
        console.log(result.data);
        res.render("movies-info.ejs" , {
            data : result.data,
            image : mediaImage
        } )
    } catch (error) {
        res.status(404).send(error.response.data);
    }
});

app.post("/tvShowId-name" , async (req , res) =>{
    let newId = req.body.id1;
    console.log(newId);
    let mediaImage = "https://image.tmdb.org/t/p/w780"
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/tv/${newId}?language=en-US` , config)
        console.log(result.data);
        res.render("movies-info.ejs" , {
            data : result.data,
            image : mediaImage
        } )
    } catch (error) {
        res.status(404).send(error.response.data);
    }
});

app.post("/searchedId-name/:type" , async (req , res) =>{
    let newId = req.body.id1;
    let type = req.params.type;
    let mediaImage = "https://image.tmdb.org/t/p/w780"
    let movieSearchUrl = `https://api.themoviedb.org/3/movie/${newId}?language=en-US`;
    let tvSearchUrl = `https://api.themoviedb.org/3/tv/${newId}?language=en-US`
    try {
        const result = await axios.get(type==="movie"?movieSearchUrl:tvSearchUrl, config)
        console.log(result.data);
        res.render("movies-info.ejs" , {
            data : result.data,
            image : mediaImage,
            
        }) 

    } catch (error) {
        res.status(404).send(error.message.data);
    }
});








app.listen(port , ()=>{
    console.log(`Server has successfully started on port ${port}`);
})

