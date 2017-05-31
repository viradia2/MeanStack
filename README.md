
### Description

This is a database driven web application for the West Virginia Department of Education (WVDE) that allows all counties of WV to submit graduation dates of different schools and allows the application admin to be able to generate various dynamic reports automatically. The admin is also able to manage all users of all counties, and manage all schools and counties in WV.
The application is implemented by using the MEAN stack (MongoDB, Express, Angular 2, Node.js) – one of the popular and latest web technologies stack.
The application can be extended to submit all the important dates in an academic year of all the schools.

### Install Dependencies

```
npm install
```

### Create a Front End - Angular Production Build

```
cd <path of the project>\angular-src
ng build --prod --aot  OR  ng build --prod --aot=false
```

### MongoDB

```
In cmd: cd C:\Program Files\MongoDB\Server\3.4\bin
To start MongoDB: mongod.exe --dbpath "<any path>\db" --logpath "<any path>\log\MongoDBLog.log"
To open MongoDB shell: mongo.exe
To import data in MongoDB: mongoimport --db <databasename> --collection <collectionname> --drop --file "<filepath>\Data.json"
```

### Run Server

```
cd <path of the project>
npm start OR nodemon
```

### Deployment

Refer to "While Deploying.txt" file in this repository.

### Internal Back End Web Services Within the Application

Refer to "Internal Back End Web Services.xlsx" file in this repository.
Front end is using these back end web services.

### References

Refer to "References.txt" file in this repository.

### Authors

Vivek Viradia (vivek.viradia@gmail.com), Keval Sanghavi (keval.sanghavi@gmail.com) 

### License

```
Copyright (C) 2017 Vivek Viradia (vivek.viradia@gmail.com), Keval Sanghavi (keval.sanghavi@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
