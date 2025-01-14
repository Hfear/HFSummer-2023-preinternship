# Connecting with External APIs and Working with Environment Variables

## Students Will Be Able To (SWBAT)
- Understand and use environment variables to store sensitive information
- Install and use Axios to send requests to an external API
- Understand how to work with API responses and error handling

## Agenda
1. Introduction to Environment Variables
2. Using dotenv for Environment Variables in Node.js
3. Introduction to Axios
4. Making GET requests to an external API
5. Handling API Responses
6. Error Handling

This README outlines how to set up environment variables to store API keys and use Axios to send requests to an external API, returning the response back to the client.

## Environment Variables

Create a `.env` file in your project's root directory (where the package.json file is):

```
touch .env
```

In this `.env` file, you can define environment variables. For example, to store the API key for the Spoonacular API, add the following line:

```
SPOONACULAR_API_KEY=your_api_key
```

Replace `your_api_key` with your actual Spoonacular API key. You can get it after you confirm your email address and visit [this console](https://spoonacular.com/food-api/console#Profile)

In order to use this environment variable in our application, we'll need to add in another dependency:

```bash
npm install --save-dev dotenv
```

### Ignoring the `.env` File

Prevent the `.env` file from being tracked by Git to keep your API keys and other sensitive data private:

1. Open the `.gitignore` file in your project's root directory. If it doesn't exist, create it.
2. Add the following line to the file:
    ```
    .env
    node_modules
    ```
3. Save the file. The `.env` file is now ignored by Git (it should appear gray in the VSCode file explorer).

## Using Axios to Send Requests to the Spoonacular API

This project uses Axios to send requests to the Spoonacular API. Here's an example of how to set up an Express route handler to take a request, pass it to the Spoonacular API, and then send the response back to the client:

To use Axios in our project, we'll need to install it:

```node
npm install --save axios
```
Then we can use it in the `server.js` file

```javascript
const express = require("express");
const app = express();
const port = 4000;
const axios = require('axios');
require('dotenv').config();


app.get('/recipes', async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch`;

    // Pass parameters from the Express request to the Spoonacular API
    const { data } = await axios.get(url, {
      params: {
        ...req.query,
        apiKey: apiKey
      }
    });

    // Send the response from the Spoonacular API back to the client
    res.json(data);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});
```

When you make a request to this route, remember to include any necessary query parameters for the Spoonacular API in your request to the Express server. Consult with the [Spoonacular Documentation on the recipes/complexSearch endpoint](https://spoonacular.com/food-api/docs#Search-Recipes-Complex) for details on what parameters you can add. The Express server will pass these parameters along to the Spoonacular API.

Start your server with:

```
npm start
```

Now your server will send requests to the Spoonacular API and return the responses back to the client.

For detailed information on the endpoints and query parameters used in this API, refer to the [Spoonacular API documentation](https://spoonacular.com/food-api/docs#Search-Recipes-Complex).

## Testing

To test your API, you can use a tool like Postman to send requests to your server and inspect the responses. This can help you debug any issues that come up and ensure your server is working correctly.

---

That should cover everything you need! Remember to replace "your_api_key" with your actual Spoonacular API key, and replace `<repository-url>` and `<repository-name>` with the appropriate values for your project.






--------------------

## 1. Introduction to Environment Variables
- **Definition:** Environment variables are a type of dynamic-named value that can affect the way running processes behave on a computer.
- **Usage:** They are used to customize the system environment to suit user needs. In the case of web development, we often use them to store sensitive information such as database credentials and API keys.

Example:
```bash
// .env
export API_KEY=your_api_key_here
```

## 2. Using dotenv for Environment Variables in Node.js
- **dotenv:** Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Storing sensitive information:** This is crucial for securing sensitive data and not exposing it in your code.

Example:
```javascript
require('dotenv').config();

console.log(process.env.API_KEY);
```

## 3. Introduction to Axios
- **Definition:** Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used both in the browser and Node.js.
- **Making HTTP requests:** With Axios, you can make HTTP requests to REST endpoints and other URLs and retrieve the responses.

Example:
```javascript
const axios = require('axios');

axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## 4. Making GET requests to an external API
- **GET requests:** We use GET requests to retrieve data from an API.
- **Setting headers:** In many APIs, you need to set headers such as `Authorization` or `x-api-key` to authenticate your request.

Example:
```javascript
const axios = require('axios');

axios.get('https://api.example.com/data', {
  headers: {
    'x-api-key': process.env.API_KEY
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

## 5. Handling API Responses
- **API Responses:** When an API receives a request, it sends back a response. This response can contain status codes, headers, and most importantly, data.
- **Working with the data:** You can parse this data and use it in your application.

Example:
```javascript
axios.get('https://api.example.com/data', {
  headers: {
    'x-api-key': process.env.API_KEY
  }
})
.then(response => {
  console.log(response.data);
  // Use the data here
})
.catch(error => console.error(error));
```

## 6. Error Handling
- **Errors:** When an error occurs during the request, Axios allows you to handle those errors using the catch block.
- **Error Response:** The error object has a `response` property, which contains the server's response to the request.

Example:
```javascript
axios.get('https://api.example.com/data', {
  headers: {
    'x-api-key': process.env.API_KEY
  }
})
.then(response => console.log(response.data))
.catch(error => {
  console.error(error.response || error.message);
});
```

## Key Takeaways

| Concept | Description | Example |
| --- | --- | --- |
| Environment Variables | Dynamic-named values stored in the system, often used for storing sensitive data like API keys and database credentials. | `export API_KEY=your_api_key_here` |
| dotenv | A Node.js package used for setting up environment variables. It loads environment variables from a `.env` file into `process.env`. | `require('dotenv').config(); console.log(process.env.API_KEY);` |
| Axios | A promise-based HTTP client that works both in the browser and Node.js, used for making requests to REST APIs. | `const axios = require('axios'); axios.get('api_url').then(response => console.log(response.data));` |
| API Responses | Data returned by the server in response to an API request. Contains status codes, headers, and data. | `axios.get('api_url').then(response => console.log(response.data));` |
| Error Handling | Mechanism to handle errors during the execution of the program. In the context of making API requests, errors are often handled in the catch block of a promise. | `axios.get('api_url').catch(error => console.error(error.response || error.message));` |

## Resources
- [Environment Variables in Node.js](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)
- [dotenv package](https://www.npmjs.com/package/dotenv)
- [Axios - npm](https://www.npmjs.com/package/axios)
- [Handling errors in Axios](https://axios-http.com/docs/handling_errors)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

I apologize for missing that detail. You're correct, it's important to prevent the `.env` file from being tracked by Git to keep your API keys and other sensitive data private. Here's how you can update your `.gitignore` file and how you can set up an express route to pass request parameters to the Spoonacular API.

## Ignoring the `.env` File

1. Open the `.gitignore` file in your project's root directory. If it doesn't exist, create it.
2. Add the following line to the file:
    ```
    .env
    ```
3. Save the file. The `.env` file is now ignored by Git.

## Passing Request Parameters to the Spoonacular API

Here's an example of how you can set up an Express route handler to take a request, pass it to the Spoonacular API, and then send the response back to the client:

```javascript
// ...
const app = express();
const axios = require('axios');
require('dotenv').config();



app.get('/recipes', async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch`;

    // Pass parameters from the Express request to the Spoonacular API
    const { data } = await axios.get(url, {
      params: {
        ...req.query,
        apiKey: apiKey
      }
    });

    // Send the response from the Spoonacular API back to the client
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

```

In this code, the Express app sets up a GET route at `/recipes`. When a request is made to this route, the app makes a GET request to the Spoonacular API using Axios. It passes along the query parameters from the original Express request to the Spoonacular API. When the Axios request is resolved, the Express app sends the data from the Spoonacular API back to the client.

Please note that error handling is crucial when dealing with external API requests, as illustrated in the `catch` block.

---

## Passing Request Parameters and Returning Data from an API

This code shows an example of an Express route handler that receives a request, passes it to the Spoonacular API, and then sends the response from the Spoonacular API back to the client. 

```bash
curl 'http://localhost:4000/recipes?query=pasta&maxFat=25&number=2'
```

When you make a request to this route, remember to include any necessary query parameters for the Spoonacular API in your request to the Express server. The Express server will pass these parameters along to the Spoonacular API.

