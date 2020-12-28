let store = Immutable.Map({
    name: 'Student',
    apod: "",
    data: "",
    chosenRover: "",
    rovers: ["Curiosity", "Opportunity", "Spirit"],
})

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
    let {apod} = state;
    return `
        <header></header>
        <main>
            ${Greeting(state.get("name"))}
            <section>
            <ul>   
            ${displayRover(state)}
            </ul>    
            </section>
        </main>
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

// const getRover = (state) => {
//   return state.rovers.map((s) => `<li><a href="${s}">${s}</a></li>`);
// };

const displayRover = (state) => {

    if (state.chosenRover === 'curiosity') {
        let roverData = getRoverData(state);
        // console.log("okkkkkkk")
        console.log(roverData)
    }
    // const photos = state.data.results.photos;
    return `<button onclick="updateStore({chosenRover: 'curiosity'})">Curiosity</button>
            <button onclick="updateStore({chosenRover: 'opportunity'})">Opportunity</button>
            <button onclick="updateStore({chosenRover: 'spirit'})">Spirit</button>`
}

const testFunction = (state) => {
    getRoverData(state)
    // console.log(state)
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date();
    const photodate = new Date(apod.date);
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    console.log(apod)
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store);
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return `
            <p>See today's featured video <a href="${apod.get('url')}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
    } else {
        return `
            <img src="${apod.get('image').get('url')}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
    }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let {apod} = state;

    fetch(`http://localhost:3000/apod`)
        .then((res) => res.json())
        .then((apod) => updateStore(store, {apod}));

    return data;
};

//API Call to get each chosenRover's data
const getRoverData = (state) => {
    let { chosenRover } = state;
    fetch(`http://localhost:3000/${chosenRover}`)
        .then((res) => res.json())
        .then((roverData) => updateStore({roverData}))
}
