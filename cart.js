const { MongoClient } = require('mongodb');
const fs = require('fs');
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";
{/* <link rel = "stylsheet" type = "text/css" href = "css/style.css"></link> */}
const express = require('express');
const app = express();

var port = process.env.PORT || 3000;
// var port = 8080;

app.use(express.static('public'));
// app.use('/css', express.static(__dirname + '/public/css'));

app.get('', (req, res) => {
    fs.readFile('cart.html', function (err, txt) {
        if (err) throw (err);
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.write(txt);
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if(err) { return console.log(err); }

            var dbo = db.db('reveauchocolat');
            var user = dbo.collection('users');
            var currUser = dbo.collection('current');
			currUser.findOne({current: "current"}, function (err, currUser) {
			var query = {
				email : currUser.email
            }
            if (currUser.email == "FAILURE")
            {
                res.write("<div id = 'cart' style = \"font-size:30px; font-family: 'Josefin Sans', sans-serif;\">")
                res.write("User is not Logged in");
                res.write("</div>")
		db.close();
		res.end();
            } else {
                user.findOne(query, function (err, result ){
				res.write("<title>Cart</title><link rel = 'stylesheet' type = 'text/css' href = 'style.css'>");
				res.write("<div id = 'cart'>")
				res.write("<table>");
				res.write("<thead>");
				res.write("<th style = 'width: 50%;'>Item</th>");
				res.write("<th style = 'width: 15%;'>Quantity</th>");
				res.write("<th style = 'width: 15%;'>Price</th>");
				res.write("<th style = 'width: 20%;'>Total</th>");
				res.write("</thead>");
				res.write("<tr>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("</tr>");
				var cart = result.cart;
			    	var overallTotal = 0;
				for (i = 1; i < cart.length; i++)
				{
					var item = cart[i].cart_item;
					var quantity = cart[i].cart_quantity;
					var price = cart[i].cart_price;
					var total = quantity * price;
					res.write("<tr>");
					res.write("<td style = 'width: 20%;'>" + item + "</td>");
					res.write("<td style = 'width: 15%;'>" + quantity + "</td>");
					res.write("<td style = 'width: 15%;'> $" + price + "</td>");
					res.write("<td style = 'width: 20%;'> $" + total + "</td>");
					res.write("</tr>")
					overallTotal += total;
				}
				res.write("</table>");
			    	res.write("Total: " + overallTotal)
				res.write("<form method = 'POST' action = '/checkout'>")
			    	res.write("<br>")
				res.write("<input type = 'submit' value = 'Checkout' class = 'button'></input>")
				res.write("</form>")
			    	res.write("<br>")
			    	res.write("<br>")
				res.write("</div>")
			});
            }
		    

		}); 
    })
    })
})


app.post('/checkout', (req, res) => {
	res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
	res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

	res.write("<title>Cart</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");
	res.write("<link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style_haijun.css'>")
    res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
    res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
    res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
    res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
    res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
    res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

    res.write("<header><div class='a' style='text-align:center; position: relative;'><div class='loginburger' style='position:absolute;'>");
    res.write("<img src='https://ajmiller00.github.io/Midterm/acc_icon.png' width='30px'><a class = 'burger' href='https://reveauchocolat-myaccount.herokuapp.com/'>Profile</a>");
    res.write("<a class = 'burger' href='https://reveauchocolat-login.herokuapp.com/'>Log In</a></div>");
	res.write("<div class='logo' style='display: inline-block;'><a href='https://ajmiller00.github.io/Midterm/index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a></div></div>");
	res.write("<nav><ul><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
    res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
    res.write("<li><a href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
    res.write("<li><a href='https://reveauchocolat-cart.herokuapp.com/' style='text-decoration: underline; text-underline-position: under; box-sizing: border-box;padding:10px 20px; background-color: #ff9933; color: #003267;border: none;margin-top:  10px;cursor:pointer;-webkit-border-radius: 5px;border-radius: 4px;'>My Cart</a> </li>");
    res.write("</ul></nav>");

    res.write("<div class='burger' id = 'bur'><img src='https://ajmiller00.github.io/Midterm/burger.png' class='burger' onclick='show()'></div>");
	res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'>");
	res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
    res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
    res.write("<li><a class = 'burger' href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
    res.write("<li></li><li></li><li><a class = 'burger' style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='https://reveauchocolat-cart.herokuapp.com/'>My Cart</a></li></ul></div></header>");
	res.write("<script language='javascript'>");
        res.write("function show() { if (document.getElementById('burger').style.display =='none') { document.getElementById('burger').style.display = 'block'; } else {");
        res.write("document.getElementById('burger').style.display = 'none'; } } </script> ");
	res.write("<body>");
    res.write("<div id = 'add' style='text-align: center;' ><br><br><br><br><h2>Your order has been processed.</h2><br><br><br><br></div>");
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { return console.log(err); }

        var dbo = db.db('reveauchocolat');
        var user = dbo.collection('users');
        var currUser = dbo.collection('current');
		currUser.findOne({current: "current"}, function (err, currUser) {
		var query = {
			email : currUser.email
        }
        user.findOne(
            query,
            { $set: {cart: {
                car_item: "hello",
                cart_quantity: 10,
                cart_price: 0
            }}}
        )
        })
    })
})

app.listen(port);
