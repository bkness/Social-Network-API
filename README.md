# Social Network API


## Description 
This is an app I created to help advance my skills with MongoDB

## Table of Contents 📝

- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [Contributing](#contributing)

- [Questions](#questions-📝)

## Installation 
>npm install

## Usage
To use the API, you will need to connect to your MongoDB Atlas cluster and configure the environment variables in a .env file. Once your database is set up, you can start the server by running:

>npm start

## Test 

>npm test

## Contributing
Fork the project and open a pull request with your new code

## API Endpoints 

### Users
Get all users

>GET /api/users

Get a single user by username 

>GET /api/users/:username

Add a new user

>POST /api/users

Update a user by username

>PUT /api/users/:username

Delete a user by username

>DELETE /api/users/:username

### Thoughts
Get all thoughts
>GET /api/thoughts
Get a single thought
>GET /api/thoughts/:id
Add a thought
>POST /api/thoughts
Update a thought
>PUT /api/thoughts/:id
Delete a thought
>DELETE /api/thoughts/:id

### Friends
To add a friend 

>POST /:username/:friendId

To delete a friend

>DELETE /api/users/:username/friends/:friendId

### Reactions 
To add a reaction 

>POST /api/thoughts/:id/reactions

To delete a reaction

>DELETE /api/thoughts/:thoughtId/reactions/:reactionId

## Deployed 
The GitHub code can be viewed [here](https://github.com/bkness/Social-Network-API). 

I have also created a video tutorial showing how to use the API endpoints with Insomnia on YouTube, which can be viewed [here](https://www.youtube.com/watch?v=g3LsVPTANH0).


## Questions
If you have any questions you can email me at kbrandon863@gmail.com if you want to see more of my work, visit my GitHub at [bkness](https://github.com/bkness)
