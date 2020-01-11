# Node.js-MySQL

## Challange 1. Customer View.

#### At this point the application uses the mySQL database (bamazonCustomer) that was created prior running the code.

![](/images/database.png)

1. Once we run the app with **node**, we **as customers** are given a list with item IDs, item descriptions, and item prices. This is our **bamazon store**. 

1. After the **store** is displayed, the customer is prompted to make a choice and *select an id of the desired item*. 
If the customer selects an ID that is not available, the app prompts the customer to retype the selection.

![](/images/store.png)

1. Once the correct ID is entered, the app displays the following message.:

You have entered ---> item ID | Item name

![](/images/prompt1.png)

.... and right away prompts the customer to enter the quantity of the desired item. If the quantity is outnumbers the stock, the user gets a chance to correct the information.

![](/images/prompt2.png)
![](/images/wronginput.png)

1. At last, the customer is given the followig information:
the ordered item
the quantity
the description

In addition, the customer is given the total price that he is going to be charged.

*Example: Your account has been charged  $129.99*

![](/images/finalprice.png)


## The overall app flow:

![](/images/challange1.gif)

## Challange 2. Manager View.

#### We are still using bamazon_db database, but this time we are accessing it via the app that represents the managers side of the store.

1. Once we run the app, we get prompted to make the following selection (inquirer.prompt). These are the **options that are provided to the manager**

![](/images/initialselection.png)
 
![](/images/firstfunction.png)


1. If the manager chooses **View Products for Sale**, he is given the list of the current inventory from the database. And right away, after the list displays, he is asked to continue.

![](/images/view.png)

![](/images/viewcode.png)


1. When the manager chooses **View Low Inventory**, he is given a list of all the items that are low in stock (less than 5 eaches)


![](/images/low.png)

1. If the manager picks **Add to Inventory**, he is given the list of all items again, and prompted to make a selection by ID. Then, the manager is asked to enter the quantity. The system gets updated. 

![](/images/add.png)

![](/images/addcode.png)


1. When the manager picks the **Add New Product**, he is prompted to enter all of the criterias via inquirer.

![](/images/new1.png)

![](/images/new2.png)

![](/images/new3.png)

![](/images/new4.png)

1. The manager can also have an option to exit the app complitely as long as he prompts to **Exit the System**

## The overall app flow:

![](/images/challange2.gif)