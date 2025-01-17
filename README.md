## Welcome to the Training Dashboard, a simple and comprehensive web app to track your training sessions!🚀

As a triathlete, being able to quickly access the core stats of my sessions is very important. That's why I decided to devote the final project of the first year of my Master's Degree in Fullstack Development to this endeavor.

Here's a summary of how this app was created.

### 1. Structure of the project

These were the steps I followed to build the Training Dashboard:

1. Synced all my Polar Flow, Garmin Connect and Strava activities into [RunGap](https://www.rungap.com/).
2. Downloaded all the files as .fit.
3. Created a Fit Parser and JSON File Generator using Java and the [Garmin SDK](https://developer.garmin.com/connect-iq/overview/).
4. Turned the generated JSON file into a json-server REST API-style backend.
5. Served the JSON data in the frontend using JavaScript.  

### 2. Technologies used

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 3. Running the project

In order to run the project, simply open it in your IDE and run:

```
npm install
npm run dev
```

This will launch the Vite local server. The data is fetched from the json-server, which was deployed separately using Vercel.

## 4. Other considerations

<ins>_How does the data get updated?_</ins>

I am proud to call myself the webmaster of this project! I continuously update the data by parsing it through my Java app and refreshing the backend.

<ins>_Is Training Dashboard available on mobile?_</ins>

Training Dashboard is usable on mobile, but not intended for it. The idea is for it to look like an Excel file, but cooler!

<ins>_I've got questions about Training Dashboard_</ins>

If you wanna talk about Training Dashboard, don't hesitate to email me!
