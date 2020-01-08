var mysql = require("mysql");
var inquirer = require('inquirer');
var productId;
var productName;
var productPrice;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  readProducts();
});
function readProducts() {
  console.log("=======================================================================");
  console.log("Please see all the products available ONLINE\n");
  console.log("=======================================================================");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productId = res[i].item_id;
      productName = res[i].product_name;
      productPrice = res[i].price_$;
      productDisplay = productId + " || " + productName + " || " + productPrice;
      console.log(productDisplay);
      console.log("=======================================================================");
    };

    connection.end();
    purchase();
    productName;
  });
  function purchase(res) {
    inquirer
      .prompt({

        type: 'input',
        name: 'name',
        message: "Please enter the ID of the desired item",
      })
       .then(function(answer) { 
        for (var i = 0; i < res.length; i++) {
          console.log("You have picked -------->" + " " + `${answer['name']}` + res[i].product_name);
         
        }
      
        })
    }
};

