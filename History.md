1. creating the utils all foldes
2. changing in airplane model.js and also same changes in migration file
3. Then i use the command first db:migrate:undo and the db:migrate so the changes can be done.

4. --> resolve the issu and now i know who can throw the error i give the spacce in the model numbner so i can validate later for more flexible names.

5. Now we remove the try catch from the crud repository 
6. For better error handling we remove the try catch from crud rep and add the erro handling in the service layer.

7. now adding the function for the getall airplanes in the airplane servce.js

8. now we add the function name getAirplanes 

9. now we add the get route for the fetch all the airplanes

10. now adding the getAirplane(id) which can return the specific airplane with id --> AirplaneService.js

11. now addign the same fuction in the airplnae-Controller.js     getAirplane(id)

12. now we add the route for that in router.v1.index.js

13. From now it Throw an error than i resoleve it. the error is fucking minded to search the error is on the crud repo and the mistake is i write the findbyPK  --> findByPk and this is correct one.

14. Now it can Run Properly.

15. now adding the error for the airplane which is not found at the :id 

16. and it Throw error while fetching it shows the wrong error so i can resolve it and the mistake is i use the wrong if(error.StatusCode == StatusCodes.Not_FOUND) and the Right one is if(error.statusCode == StatusCode.NOT_FOUND) i  use the Wrong Speling for that.

17. Now it Resolve my error

18. Later now i create and update function that can update the capacity of airplnae with the :ID

19. now creating the city model with ``` npx sequelize model:generate --name City --attributes name:string ``` and ``` npx sequelize db:migrate```

20. Now adding the city-repository
21. now adding the city-service
22. now adding the middleware for both the airplane and the city
23. Defines Route for Creating a city

24. adding the getcity, getCites and destroycity in CityService.js

25. Defines Routes for them.

26. Now Creating a Airport model with Commad ```npx sequelize model:generate --name Airport --attributes name:string,code:string,address:string,cityId:integer ``` and with Attributes in it

27. added the validation for the Airport in Both js and Migrate Files.

28. Creating Forign key with the CityId present in the Airport Model.
29. Create a Migration with No code we have to implement According to Our's  --> ``` npx sequelize migration:generate --name update-city-airport-association ```

30. Now Define the code in that migrate file and then run Command ``` npx sequelize db:migrate ``` to Migrate the data into Database.

31. Then Added the same migration at the JAVASCRIPT Level now adding in the Airport Model in the ``` static Assosiation Colum``` 

32. 