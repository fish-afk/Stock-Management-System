# Simple Stock management system.

Stock Management System For SHIHAB ENTERPRISE ltd.
But it is also compatible to any similar company.

## How to run this project locally.

## Prerequisites:

### 1

node.js version required: v20.11.1
npm version required: v10.2.4

### 2

Make sure to install and setup MySQL > v8.0 on your system.

### 3

Make sure you have the .env file in the "Server" folder with all the necessary environment variables.

these are:

`JWT_SECRET`
and
`REFRESH_SECRET`

## Steps

### step 1:

Clone this repository using the following commands

Linux and macOS:

```bash
sudo git clone https://github.com/fish-afk/001356993_COMP1682
```

Windows:

```bash
git clone https://github.com/fish-afk/001356993_COMP1682
```

### step 2:

Go to the "001356993_COMP1682" folder and copy all the code found in the "db.sql" file and run it in your mysql database. Also copy the "dummydata.sql" to seed the db.

### step 3:

open a terminal / windows cmd prompt inside the "001356993_COMP1682" folder. Make sure its inside that folder.

### step 4:

run this command to install node packages for the react frontend.
`cd Client`
`npm install`

then run
`cd ..`

the run this command to install node packages for the node frontend.
`cd Server`
`npm install`

### step 5:

run this command to start up the node server

`node index.js`

run this command to start the react frontend

`npm run dev`

### step 6:

copy the link shown in the CLI for the react code and paste and visit it in the browser.


Admin credentials:

username: john_doe
password: password123



Warehouse operator credentials:

username: john_doe_wh
password: password123



Stakeholder credentials:

username: john_doe_st
password: password123
