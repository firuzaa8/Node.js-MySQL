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
    managerOptions();
});

function managerOptions() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Please select from following options',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', "Exit the System"],
            },
        ])
        .then(answer => {
            console.info("You have chosen to " + answer.options);

            if (answer.options === 'View Products for Sale') {
                viewProduct();
            } else
                if (answer.options === 'View Low Inventory') {
                    lowInventory();
                } else
                    if (answer.options === 'Add to Inventory') {
                        addInventory();
                    } else
                    if (answer.options === "Add New Product") {
                        addProduct();
                    } else {
                        connection.end();
                    }
                    

        });
};
function viewProduct() {
    console.log("=====================================================================================================");
    console.log("Store Inventory\n");
    console.log("=====================================================================================================");
    connection.query("SELECT item_id, product_name, department_name, price_$, stock_quantity  FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var id = res[i].item_id;
            var name = res[i].product_name;
            var department = res[i].department_name;
            var price = res[i].price_$;
            var stock = res[i].stock_quantity;
            console.log("=====================================================================================================");
            console.log(id + " || " + name + " || " + department + " || " + price + " || " + stock);
            console.log("=====================================================================================================");


        };
        console.log("=====================================================================================================");
        console.log("=====================================================================================================");
        console.log("Enter The Next Command");
        console.log("=====================================================================================================");
        console.log("=====================================================================================================");
        managerOptions();
    }

    )
};

function lowInventory() {
    console.log("=====================================================================================================");
    console.log("Low Inventory Items\n");
    console.log("=====================================================================================================");
    connection.query("SELECT item_id, product_name, department_name, price_$, stock_quantity  FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var id = res[i].item_id;
            var name = res[i].product_name;
            var department = res[i].department_name;
            var price = res[i].price_$;
            var stock = res[i].stock_quantity;
            console.log("=====================================================================================================");
            console.log(id + " || " + name + " || " + department + " || " + price + " || " + stock);
            console.log("=====================================================================================================")

        };
        console.log("=====================================================================================================");
        console.log("=====================================================================================================");
        console.log("Enter The Next Command");
        console.log("=====================================================================================================");
        console.log("=====================================================================================================");
        managerOptions();
    }
    )
};
function addInventory() {
    console.log("=====================================================================================================");
    console.log("Add Inventory\n");
    console.log("=====================================================================================================");
    connection.query("SELECT item_id, product_name, department_name, price_$, stock_quantity  FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var id = res[i].item_id;
            var name = res[i].product_name;
            var department = res[i].department_name;
            var price = res[i].price_$;
            var stock = res[i].stock_quantity;
            console.log("=====================================================================================================");
            console.log(id + " || " + name + " || " + department + " || " + price + " || " + stock);
            console.log("=====================================================================================================")

        };
        inquirer
            .prompt({

                type: 'input',
                name: 'userInput',
                message: "Enter ID of the ITEM that needs to be updated",
            })
            .then(function (answer) {
                connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE item_id = '" + answer.userInput + "'", function (err, res) {
                    if (err) throw err;
                    if (res.length > 0) {
                        console.log("You have entered ---> " + res[0].item_id + " | " + res[0].product_name + " | " + res[0].stock_quantity);
                    } else {
                        console.log("You have entered the wrong ID. Try again.");
                        addInventory();
                    }
                    inquirer
                        .prompt({
                            // Changed this from 'input' to 'number'
                            type: 'number',
                            name: 'userInput',
                            message: "Add the quantity.",
                        })

                        .then(function (answer) {
                            var newQuantity = res[0].stock_quantity + answer.userInput
                            var query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: newQuantity,
                                    },
                                    {
                                        item_id: res[0].item_id
                                    }
                                ],
                                // Removed ", res" from here
                                function (err) {
                                    if (err) throw err

                                    console.log("The Inventory has been updated. Now you have " + newQuantity + " of " + res[0].product_name);
                                    console.log("=====================================================================================================");
                                    console.log("=====================================================================================================");
                                    console.log("Enter The Next Command");
                                    console.log("=====================================================================================================");
                                    console.log("=====================================================================================================");
                                    managerOptions();
                                });

                        });

                });
            });
    });
}
function addProduct() {
    console.log("=====================================================================================================");
    console.log("Add New Product\n");
    console.log("=====================================================================================================");

    inquirer
        .prompt([
            {
                type: 'number',
                name: 'id',
                message: "Enter 5 digit id",
                validate: function (x) {
                    if (x >= 10000 && x <= 99999)
                        return true;
                    else
                        return "Invalid ID"
                }
            }, {
                type: 'input',
                name: 'name',
                message: "Enter description of the item"

            }, {
                type: 'input',
                name: 'department',
                message: "Enter department name"


            }, {
                type: 'number',
                name: 'price',
                message: "Enter price (format as X.XX)",
                filter: function (x) {
                    return x.toFixed(2)
                },
                validate: function (x) {
                    if (isNaN(x))
                        return "You must enter a number"
                    else
                        return true;
                }
            }, {
                type: 'number',
                name: 'quantity',
                message: "Enter quantity",
                validate: function (x) {
                    if (isNaN(x))
                        return "You must enter a number"
                    else
                        return true;
                }
            }

        ]).then(function (answer) {
            var id = answer.id;
            var name = answer.name;
            var department = answer.department;
            var price = answer.price;
            var quantity = answer.quantity;
            console.log("You have entered: " + id + " ||" + name + " || " + department + " || " + price + " || " + quantity);
            connection.query("INSERT INTO products(item_id, product_name, department_name, price_$, stock_quantity) VALUES (?, ?, ?, ?, ?)", [id, name, department, price, quantity], function (err, res) {
                if (err) throw err
                viewProduct();
            });
        });

}