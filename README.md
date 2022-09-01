# Azure-Function-Simple-Todo-Api
This is a simple todo api using Azure Functions and Mongo DB.


## How to use
1. Clone the repo
2. Open the solution in Visual Studio
3. Build the solution
4. Publish the solution to Azure
5. Open the Azure Portal
6. Go to the Function App
7. Go to the Function
8. Copy the Function Url
9. Open Postman

### Create a Todo
10. Create a new request
11. Set the request type to POST
12. Set the request url to the Function Url
13. Set the request body to raw
14. Set the request body type to JSON
15. Set the request body to
```json
{
    "title": "Todo Title",
    "description": "Todo Description"
}
```
16. Send the request

### Get all Todos
17. Create a new request
18. Set the request type to GET
19. Set the request url to the Function Url
20. Send the request

### Get a Todo
21. Create a new request
22. Set the request type to GET
23. Set the request url to the Function Url + the id of the todo you created
24. Send the request

