# HyperWord

A word game where you must fill in the blanks and match the word score

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
The following NPM packages need to be installed on your server for this application to run.

body-parser - Node.js body parsing middleware.
express - Fast, unopinionated, minimalist web framework for node.
path - Utility for working with file and directory paths.
mysql - Database for storing entries.

## Installing
Clone the repo by openeing your Git Bash terminal and typing in (a directory you wish to house this application): git clone https://github.com/mattieice7486/HyperWorld.git

Navigate to the Hyperword folder you just created by entering cd Hyperword into terminal.

Install the dependencies with the npm i command, this works because the package.json is setup with the needed dependencies.

To start the express server type node server.js into terminal and wait for the following prompt:

$ node server.js
App listening on PORT: 8080
At this point you should have an express server instance running on your local machine and you can go to your favorite browser (we prefer chrome) and navigate to localhost:8080 to view the webpage.

Hosting this server on Heroku or another platform is outside the scope of this guide, but do note that this application does fully support remote hosting.

## Running the tests
The webpage itself has a built in API link at the bottom, this is the best way to run an initial test of your server to ensure all the data is getting ported to the document.

## Deployment
Hosting this server on Heroku or another platform is outside the scope of this guide, but do note that this application does fully support remote hosting.

## Built With
node js - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.

express - Fast, unopinionated, minimalist web framework for node.

body-parser - Node.js body parsing middleware.

path - Utility for working with file and directory paths.

MySQL - Database for storing user login data, dictionary API, and high scores
## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
Matthew Eisenstadter - Backend
Jesse Loring - Login and Authentication
Amy Mclaughlin - UI
Molly Zurheide - Game Logic

## License
This project is licensed under the GNU License - see the LICENSE.md file for details

## Acknowledgments
