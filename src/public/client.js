// An Immutable Map to store the data
let store = Immutable.Map({
  name: "Student",
  chosenRover: "",
});

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  return `
        <header>${Greeting(state.get("name"))}</header>
        <main>${chooseRover(state)}</main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

const chooseRover = (state) => {
  // Call the getRoverData method to get data when data is empty, otherwise the getRoverData will be recursive.
  // I learned this from https://github.com/jeffcad/Udacity-Intermediate-JavaScript-Nanodegree-Project-2
  if (!state.data) {
    getRoverData(state);
  }

  // Call the getRoverInfo method to render information to UI
  // Only the case "curiosity" get the latest photos, otherwise will get the photos on the day that I set up from the server
  switch (state.chosenRover) {
    case "curiosity":
      return `${getRoverInfo(state, "latest_photos")}`;
    case "opportunity":
      return `${getRoverInfo(state, "photos")}`;
    case "spirit":
      return `${getRoverInfo(state, "photos")}`;
  }

  // When I put the updateStore inside ${} expression, all things will be recursive again, so I put it all in a string
  // Each time when the button is clicked, it will update the store and put a chosen rover in it
  return `
        <div>
            <button onclick="updateStore({chosenRover: 'curiosity'})">Curiosity</button>
            <button onclick="updateStore({chosenRover: 'opportunity'})">Opportunity</button>
            <button onclick="updateStore({chosenRover: 'spirit'})">Spirit</button>  
        </div>
        `;
};

// Method to render information to UI
const getRoverInfo = (state, photoType) => {
  let roverName;
  let roverLaunchDate;
  let roverLandingDate;
  let roverStatus;
  let roverLatestPhotoDate;
  let photoUrl;
  let photo;
  if (photoType == "latest_photos") {
    photo = state.roverData?.results.latest_photos;
  } else if (photoType == "photos") {
    photo = state.roverData?.results.photos;
  }

  if (photo) {
    roverName = photo[0].rover.name;
    roverLaunchDate = photo[0].rover.launch_date;
    roverLandingDate = photo[0].rover.landing_date;
    roverStatus = photo[0].rover.status;
    roverLatestPhotoDate = photo[0].earth_date;
    photoUrl = photo.map((photo) => photo.img_src);

    return `<button class="backBtn" onclick="updateStore({chosenRover: '', roverData: ''})">Back to home</button>
              <ul>
                <li><h1>Rover Name: ${roverName}</h1></li>
                <li><h3>Launch Date: ${roverLaunchDate}</h3></li>
                <li><h3>Landing Date: ${roverLandingDate}</h3></li>
                <li><h3>Rover Status: ${roverStatus}</h3></li>
                <li><h3>Latest photo date: ${roverLatestPhotoDate}</h3></li>
              </ul>
                ${photoUrl?.map(
                  (url) =>
                    `<img src='${url}' style='width: 200px height: 200px'>`
                )}
               `;
  } else {
    return "Loading ...";
  }
};

// ------------------------------------------------------  API CALLS

// Example API call

//API Call to get each chosenRover's data and update the store each when I call it
const getRoverData = (state) => {
  let { chosenRover } = state;
  fetch(`http://localhost:3000/${chosenRover}`)
    .then((res) => res.json())
    .then((roverData) => updateStore({ roverData }));
};
