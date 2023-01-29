# students-management

__Student attendance by facial recognition__


**EXAMPLES**
..
![This is an image](/examples/home.jpg)

![This is an image](/examples/students-list.jpg)

![This is an image](/examples/attendance.jpg)

![This is an image](/examples/admin.jpg)

![This is an image](/examples/info.jpg)

![This is an image](/examples/chat.jpg)

![This is an image](/examples/login.jpg)

![This is an image](/examples/students.jpg)
..


**SETTING BEFORE START APPLICATION**

**1/ Setting port**
go to line 20 in src/server.js


**2/ Setting time**

> Set the time to open and close the admin page
go to line 6 and 7 in src\app\controllers\adminController.js
***Note: The time the admin page works must be after the attendance page ends on the same day***
***Note: admin page end time must be same day. But I recommend to:*** timeClosePage.setHours(23, 50, 0)

> If you want the admin page to work on sunday
comment line 24 in src\app\controllers\adminController.js 

> Set the time to open and close page attendance
set time open page go to line 8 in src\app\controllers\AttendanceController.js
set time close page go to line 9 in src\app\controllers\AttendanceController.js
***Note: time close page attendance must be same as attendance end time***
***Note: The attendance page should be active sooner than the delay time is more than 30 minutes***


> Set delay time and attendance end time
set delay time go to line 75 in src\resources\views\attendance.hbs
set attendance end time go to line 76 in src\resources\views\attendance.hbs 
***note: attendance end time must be same as time close page attendance***

**3/ Set up database using Mongodb**

> mongoose connect
go to line 6 in src\config\db\index.js

> create collection accounts
Have to create an account for each class in the database.
According to structure
        type: "class",
        class: yourClass (example: "11A4"),
        username: yourUserName (example: "11a4ahihi"),
        password: yourPassword (example: "11a4hihi"),
The number of documents depends on how many classes you use
And here is the structure for the admin account just one
        type: "admin",
        username: yourUserName,
        password: yourPassword,


> create collection data
Collection data is used to store data after one day attendance
According to structure
        rank: number,
        classes: []
***note: number is from 1 to 6. That means there will be 6 documents***


> create collection students
Have to create each class to accommodate students.
According to structure
        khoi: yourGrade (example: 11),
        class: yourClass (example: "11A4"),
        students: [],
        khoa: yourSchoolYear (example: 54),
        rank: yourRank (example: 1  (to sort class order))
The number of documents depends on how many classes you use.


**HOW TO USE**

**1/**
Students to the /face-labels page (eg: http://localhost:7000/face-labels).
to enter information.

**2/**
Each class needs a student using a mobile device to log in to the class account and go to the attendance page at the time the page is active for each student of the class to take attendance.

Wait until the page announces the end of the attendance time, then press ok, do not press cancel. Then you can then exit the browser.

**3/**
When the admin page is active admin log in to the admin account to view the data.


