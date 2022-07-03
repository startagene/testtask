# testtask

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
### General Info
***
Test project for interview task
## Technologies
***
A list of technologies used within the project:
* [ASP. Net Core](https://docs.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-6.0?view=aspnetcore-6.0): Version 6 
* [React js](https://reactjs.org/): Version 18.2
* [EF Core](https://docs.microsoft.com/en-us/ef/core/): Version 6
* [Docker](https://www.docker.com//): Version 20
## Installation
***
To run the project you need to have ASP .Net Core 6, npm and docker installed on your machine.

this part will run SQL Server in docker:
```
$ git clone https://github.com/startagene/testtask
$ docker-compose up
```

open and run backend in Visual Studio (you should see swagger if all's ok)
then open another terminal window
```
$ cd ui
$ npm install
$ npm start
```
