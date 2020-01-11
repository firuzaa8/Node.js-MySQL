var mysql = require("mysql");
var inquirer = require('inquirer');


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
      var productId = res[i].item_id;
      var productName = res[i].product_name;
      var productPrice = res[i].price_$;
      var productDisplay = productId + " || " + productName + " || " + productPrice;
      console.log(productDisplay);
      console.log("=======================================================================");
    };

    
    purchase();
  });
  function purchase() {

    inquirer
      .prompt({

        type: 'input',
        name: 'userInput',
        message: "Please enter the ID of the desired item",
      })
      .then(function (answer) {
        connection.query("SELECT item_id, product_name FROM products WHERE item_id = '" + answer.userInput + "'", function (err, res) {
          if (err) throw err;
          if (res.length > 0) {
            console.log("You have entered ---> " + res[0].item_id + " | " + res[0].product_name);
            purchase2(res[0].item_id);

          } else {
            console.log("You have entered the wrong ID. Please try again");
            purchase();

          }
        });

      });
  }

  function updateStock(item_id, remainingStock) {
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: remainingStock,
        },
        {
          item_id: item_id
        }
      ],
      function (err, res) {
        if (err) throw err
      }
    );

  }
  function purchase2(item_id) {
    inquirer
      .prompt({

        type: 'input',
        name: 'userInput',
        message: "How many units of the item would you like to buy?",
      })
      .then(function (answer) {
        connection.query("SELECT item_id, product_name, price_$, stock_quantity FROM products WHERE item_id = '" + item_id + "'", function (err, res) {
          if (err) throw err;
          if (res[0].stock_quantity >= answer.userInput) {
            var totalPrice = answer.userInput * res[0].price_$;
            console.log("You have ordered: ---> " + answer.userInput + " of " + res[0].product_name);
            console.log("===========================================================================");
            console.log("===========================================================================");
            console.log("Your account has been charged  $" + totalPrice);
            var remainingStock = res[0].stock_quantity - answer.userInput;
            updateStock(res[0].item_id, remainingStock);
          } else {
            console.log("We have " + res[0].stock_quantity + " of " + res[0].product_name + " left in stock. Please modify your order.");
            purchase2(item_id);
          }
      connection.end();
        });

      });
  }
};


