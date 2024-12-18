let key = "d9ccf175ee5e3e2381b089874aaa6feb568b3b8a";
let url = "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=";

const fetchData = async() => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${key}`
              }
        })
        .then(response => response.json())
        .then(data => console.log(data))
    } catch (error) {
        console.log("Fetching error", error);
    }
}

fetchData()