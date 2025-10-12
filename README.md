# inventory-application

A Node/Express inventory management app for all things fruit. From the popular Honeycrisp apple to the now elusive Gros Michel banana, this imaginary business tracks it all.

This project contains categories and items, in which users can choose a category and peruse the items pertaining to that specific category. For example users can choose the Banana category which contains every variety of bananas from the common Cavendish banana to more obscure ones like the Red banana.

CRUD operations are also available, allowing users to create, read, update, and delete categories and items as they wish. As SQL is a relational database, the category and items table will be linked together accordingly with primary and foreign keys. All in all, this project will be my first full-stack website, with a sleek website and solid server side database to make the website fully functional online.

<img width="1710" height="864" alt="Screenshot of website homepage" src="https://github.com/user-attachments/assets/c7f61a32-de0d-4fb1-ba5c-e5f40aa9d167" />

<p align="center">
  <a href="https://inventory-application-415o.onrender.com/">
    View live site
  </a>
</p>

## Features
As a fully fledged inventory application, this website supports:

- Fully dynamic website with HTML built on the fly using the EJS templating language
- Model View Controller (MVP) design pattern for organizing and maintaining code
- Creating, reading, updating, and deleting (CRUD) data
- Managing harvests and categorie along connecting the fruits to these tables
- Forms with both client and server side validation using express-validator
- Protection of destructive data (updating/deleting), requiring a password in order to proceed
- Fully styled and intuitive website design
- PostgreSQL, a popular open source object-relational database to persist data beyond a single user
- Deployment of site and database to a Platform as a Service (PaaS) hosting provider

## Built With

- **Node.js**: JavaScript runtime environment allowing JavaScript code outside of a web browser
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **EJS**: Simple, unopinionated templating language that lets you generate HTML markup with plain JavaScript
- **express-validator**: Set of express.js middlewares that validates and sanitizes incoming request data from forms
- **node-postgres (pg)**: Collection of node.js modules for interfacing with PostgreSQL databases
- **dotenv**: Zero-dependency module that loads environment variables from a .env file into process.env
- **PostgreSQL**: Powerful, open source object-relational database system
- **Prettier**: Opinionated code formatter for making code pretty ✨

## Installation

- Clone the repository to your local computer:

```bash
git clone git@github.com:your-username/inventory-application.git
```

- Navigate into the directory

```bash
cd inventory-application
```

- Install dependencies

```bash
npm install
```

- Start the Node server

```bash
node --watch app.js
```

Now you're all set. Happy coding!

## Reflections
This was my longest project to date, taking just over a month to complete. I originally planned this project to be finished within two weeks, but it soon became clear that such an ambitious timeline was unrealistic. It wasn’t because it wasn’t possible, but rather my current habits and modus operandi were preventing me from ever being able to complete it on time. This insight inspired the focus of my reflection, which is what I want to share with you today.

The biggest issue I faced was poor project management. Projects naturally become more complex and intricate as features grow, and this was my largest project to date. I had to juggle Node.js, Express.js, form handling, databases, views, and many other moving parts. It got to the point where I spent a good amount of time finding what needed to change and how I was going to complete it before actually doing it. My old habit of “winging it” has reached its limit, and project management will be what fixes it. 

By planning my website’s structure, code, and styling in a document beforehand, I can overcome these barriers and elevate my productivity. In fact, I’ve just recently developed Roblox games for fun, and creating a Game Design Document (GDD) beforehand helped me break through and actually make progress when developing. Project management is only going to get more important from this point forward, so I will make it a priority to master it and use it to propel my growth as a developer.

Beyond poor project management was scope creep. With so many features my inventory application required and no roadmap to follow, it soon reared its ugly head. Starting with the thought, “It would be pretty cool if my website did this,” I unknowingly fell into a trap I created for myself. For example, I began my project by designing my database schemas. What tables do I need? How many columns do I need? What about the data types for the columns? Eventually my mind wandered to the “nice-to-haves”, like a species column or even an inventory application for not only fruits, but produce too.

This is where scope creep came in. Not only was it an unnecessary feature, it also distracted me from my main goals. I found myself worrying about additional features while forgetting about essential ones. I even forgot about columns like an image_link and price column needed for my Minimum Viable Product (MVP). By the time the mistake became clear to me, it required extra time to fix and update my database and code accordingly. This wasn’t a one-off situation either, as I found myself dealing with scope creep multiple times later on that really took a toll on both my progress and enjoyment. At one point I’ve even wrestled with the idea of simply quitting programming all together. 

Scope creep doesn’t always make itself known until it’s too late. Especially when you reap the consequences of your actions and think to yourself, “Why did I even do this to myself?” To prevent scope creep from ever becoming a problem in the future, I’ll always start with a clear MVP. In fact, MVPs were created with the sole idea of combating scope creep and getting the core features completed before anything else. Doing so, I will be able to focus on what needs to be done and build on top of that solid foundation the MVP set for me.

Ultimately, this project was not just a learning experience but also a reminder of my current habits. I was able to hide these bad habits when working on smaller projects, but that won’t fly anymore. As the scope of my projects inevitably grows, so will the consequences of small actions from the past. To quote Atomic Habits, “Your outcomes are a lagging measure of your habits… You get what you repeat.”



