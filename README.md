# e-commerce-dashboard

## Description

A simple fullstack(MERN) e-commerce-dashboard

## Getting Started

### Dependencies

* You should have nodejs installed in your system
* You should have mongoDB installed and configured in your system.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

### Downloading and Extracting

* You can download the zip file from here or fork this repo.
* After extracting the zip file you should have two folders inside your project folder frontend and backend.

### Executing the code

* Step 1: Start mongoDB service on your machine. 
* Step 2: Open mongoDB compass
* Step 3: Connect to the mongo
* Step 4: Make database named 
          ```
          e-commerce
          ``` 
          with collections named 
          ```
          users
          ```
          and 
          ```
          products
          ```
          and keep the connection alive also you can note the connection string
          ```
          ex: mongodb://localhost:27017
          ```
          (this will be used later)
* Step 5: Open terminal in the backend folder of the project and execute following command
```
npm install
```
* Step 6: Open terminal in the frontend folder of the project and execute following command
```
npm install
```
* Step 7: Open terminal in the backend folder of the project and execute following command and keep it alive
```
nodemon ./index.js
```
* Step 8: Open terminal in the frontend folder of the project and execute following command
```
npm start
```
* Step 8: Now open your browser
* The frontend application is running at port 3000 you can see this by typing the below url in your browser
```
http://localhost:3000/
```
* Step 9: Now open another your browser
* The backend application (server) is running at port 5000 you can see this by typing the below url in your browser
```
http://localhost:5000/
```
## Help

In case your another application running on port 5000, try changing port in index.js file in backend folder. The line of code looks like
```
app.listen(5000)
```

## Authors

Contributors names and contact info:

Aaditya Nayak

## Contact info
Linkedin: https://www.linkedin.com/in/aaditya-nayak-an73a8208/
