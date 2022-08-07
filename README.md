eCom its a eCommerce Platform that built with the MERN stack & Redux.

Features:

- Client side - main features:
  <b>Home page:</b>
    <ul>
    <li>dynamic navigation to the site pages includes icons: search box, profile that includes user profile and user orders includes different navigation: user navigation and admin navigation. only the admin can make crud on various parts on the site. also in the navigation you can logout from the site.
    </li>
    <li>Home page Slider that navigate you to the relevant category by his content
    Categories - a product cart that is being reduced to one product from each main category - man and woman and navigate to the relevant category. </li>
    <li>Best Seller -a product cart that is being reduced to one product from each sub category and navigate to the relevant product and by clicking add to cart the product added to cart.</li>
    <li>search box that search the relevant product from the products page</li>
    </ul>
    
    <b>Contact Us:</b>
    <ul>
    <li>contact us form that includes our contact information and send message form for leaving a message </li>
    </ul>
    
    <b>Products:</b>
    <ul>
    <li>
    a filter that filters the product by main category (man or woman) and sub category (man jeans, man shirt, man jacket, woman jeans, woman shirt, woman jacket)
    products with sale price and full price and a cart icon that when clicking on the product is being added to the cart.</li>
    </ul>
    <b>Cart:</b>
    <ul>
    <li>The products that was chosen have in the cart an option to choose amount and see the subtotal. In the cart you have a steps that only in you complete the previous step you can move ahead. if the user is not login he can not make an order.</li>
    </ul>

  <b>shipping address:</b>
    <ul>
    <li>entering the shipping address with form validation </li>
    </ul>
    <b>place order:</b>
    <ul>
    <li>in the place order screen you can update the amount of the product and deleting the unwanted product. In the order summary you can see the final cost includes shipping cost (free over 100$) and taxes.</li>
    </ul>

  <b>payment</b>
    <ul>
    <li>the final step - paying with paypal after paying you can see the order and also see it in your own profile</li>
    </ul>

  <b>Footer:</b>
    <ul>
    <li>The footer includes links to about us, contact us, linkedin and github </li>
    
    <li>More requirement that are included:</li>
    <li>REGEX</li>
    <li>Token</li>
    <li>Crud</li>
    <li>Separate permission for user and admin</li>
    <li>HTTP calls</li>
    </ul>
    
    <b>Server side - main features:</b>
    
    <b>Requirement that are included:</b>
    <ul>
    <li>HTTP listening for requests - listening to get requests, create,edit, read, delete from the database according to the client request, using express.</li>
    <li>Authentication</li>
    <li>  Categories - a product cart that is being reduced to one product from each main category - man and woman and navigate to the relevant category.</li>
    <li>Authorization</li>
    <li>Storing the database in mongodb and crud parts from the db.</li>
    <li>Server-side validations with joi.</li>
    <li>Logger - using morgan to manage http requests.</li>
  </ul>
  <b>Usage:</b>
  ES Modules in Node: I use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Install Dependencies (frontend & backend)
npm install cd frontend npm install

Build & Deploy:
Create frontend prod build cd frontend npm run build
To run the backend and front end you can use npm run dev

Seed Database:
You can use the following commands to seed the database with some sample users and products as well as destroy all data Import data: npm run data:import

Destroy data: npm run data:destroy
