# Node.js-MySQL

## Challange 1. Customer View.

#### At this point the application uses the mySQL database (bamazonCustomer) that was created prior running the code.

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


