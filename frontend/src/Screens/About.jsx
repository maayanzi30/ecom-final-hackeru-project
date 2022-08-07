import React from "react";

import styles from "../styles/about.module.css";

const About = () => {
  return (
    <>
      <h1>About eCom</h1>
      <section className={styles.section}>
        <div className={styles.aboutCon}>
          <h3 className={styles.h3Title}>About me:</h3>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              My name is Maayan and I learned Full Stack development at HackerU
              college and this is my graduation project.
            </li>
            <li className={styles.aboutList}>
              For my final project I wanted to do an eCommerce site cause in the
              past I manages those kind of sites and I wanted to build an
              eCommerce site on my own.
            </li>
            <li className={styles.aboutList}>
              I decided to built an eCommerce site about clothes and add
              features I learn in the class and features I learned of my own to
              make the site functionality as similar to real eCommerce sites.
            </li>
          </ul>
        </div>

        <div className={styles.aboutCon}>
          <h3 className={styles.h3Title}>Client side - main features:</h3>
          <h4 className={styles.h4Title}>Home page:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              dynamic navigation to the site pages includes icons: search box,
              profile that includes user profile and user orders includes
              different navigation: user navigation and admin navigation. only
              the admin can make crud on various parts on the site. also in the
              navigation you can logout from the site.
            </li>
            <li className={styles.aboutList}>
              Home page Slider that navigate you to the relevant category by his
              content
            </li>
            <li className={styles.aboutList}>
              Categories - a product cart that is being reduced to one product
              from each main category - man and woman and navigate to the
              relevant category.
            </li>
            <li className={styles.aboutList}>
              Best Seller -a product cart that is being reduced to one product
              from each sub category and navigate to the relevant product and by
              clicking add to cart the product added to cart.
            </li>
            <li className={styles.aboutList}>
              search box that search the relevant product from the products page
            </li>
          </ul>
          <h4 className={styles.h4Title}>Contact Us:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              contact us form that includes our contact information and send
              message form for leaving a message
            </li>
          </ul>
          <h4 className={styles.h4Title}>Products:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              a filter that filters the product by main category (man or woman)
              and sub category (man jeans, man shirt, man jacket, woman jeans,
              woman shirt, woman jacket)
            </li>
            <li className={styles.aboutList}>
              products with sale price and full price and a cart icon that when
              clicking on the product is being added to the cart.
            </li>
          </ul>
          <h4 className={styles.h4Title}>Cart:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              The products that was chosen have in the cart an option to choose
              amount and see the subtotal. In the cart you have a steps that
              only in you complete the previous step you can move ahead. if the
              user is not login he can not make an order.
            </li>
          </ul>
          <h4 className={styles.h4Title}>shipping address:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              entering the shipping address with form validation
            </li>
          </ul>
          <h4 className={styles.h4Title}>place order:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              in the place order screen you can update the amount of the product
              and deleting the unwanted product. In the order summary you can
              see the final cost includes shipping cost (free over 100$) and
              taxes.
            </li>
          </ul>
          <h4 className={styles.h4Title}>payment</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              the final step - paying with paypal
            </li>
            <li className={styles.aboutList}>
              after paying you can see the order and also see it in your own
              profile
            </li>
          </ul>
          <h4 className={styles.h4Title}>Footer:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              The footer includes links to about us, contact us, linkedin and
              github
            </li>
          </ul>
          <h4 className={styles.h4Title}>
            More requirement that are included:
          </h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>REGEX</li>
            <li className={styles.aboutList}>Token</li>
            <li className={styles.aboutList}>Crud</li>
            <li className={styles.aboutList}>
              Separate permission for user and admin
            </li>
            <li className={styles.aboutList}>HTTP calls</li>
          </ul>
        </div>

        <div className={styles.aboutCon}>
          <h3 className={styles.h3Title}>Server side - main features:</h3>
          <h4 className={styles.h4Title}>Requirement that are included:</h4>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutList}>
              HTTP listening for requests - listening to get requests,
              create,edit, read, delete from the database according to the
              client request, using express.
            </li>
            <li className={styles.aboutList}>Authentication</li>
            <li className={styles.aboutList}>
              Categories - a product cart that is being reduced to one product
              from each main category - man and woman and navigate to the
              relevant category.
            </li>
            <li className={styles.aboutList}>Authorization</li>
            <li className={styles.aboutList}>
              Storing the database in mongodb and crud parts from the db.
            </li>
            <li className={styles.aboutList}>
              Server-side validations with joi.
            </li>
            <li className={styles.aboutList}>
              Logger - using morgan to manage http requests.
            </li>
          </ul>
        </div>
        <div className={`${styles.aboutCon} ${styles.aboutBuiltWithCon}`}>
          <h3 className={styles.h3Title}>
            This project was built and used with:
          </h3>
          <ul className={styles.aboutUl}>
            <li className={styles.aboutBuiltWith}>React</li>
            <li className={styles.aboutBuiltWith}>Mongodb</li>
            <li className={styles.aboutBuiltWith}>Express</li>
            <li className={styles.aboutBuiltWith}>NodeJs</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
