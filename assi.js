let express = require("express");
let fs = require("fs");
let app = express();
let bodyparser = require("body-parser");
const { response } = require("express");
app.use(bodyparser.urlencoded({ extended: true }));//to enable request body data from form with post method
app.get("/", (request, response) => {
    response.sendFile(__dirname + "\\main.html");
})
app.get("/storeprod",(request,response)=>{
    response.sendFile(__dirname+"\\add.html");
})

app.post("/createproductacc", (request, response) => {
    let product = request.body;
    
    let data = fs.readFileSync("com.json");
    
    let products = JSON.parse(data.toString());
    console.log(products);
    let re = products.find(c => c.pno == product.pno);
    if (re == undefined) {
        products.push(product);
        fs.writeFileSync("com.json", JSON.stringify(products));
        response.send("Product Data stored");
    }
    else {
        response.send("product id must be unique");
    }
})

app.get("/viewprod",(request,response)=>{
    let n= fs.readFileSync(__dirname+"\\com.json");
    let p =JSON.parse(n.toString());
response.send("Total number of products stored is "+p.length);
})
app.listen(3000, () => console.log("server running on port number 3000"));