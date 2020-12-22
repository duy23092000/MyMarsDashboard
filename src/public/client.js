let store = {
    chosenRover: "",
    user: {name: "Student"},
    apod: "",
    rovers: ["Curiosity", "Opportunity", "Spirit"],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = async (root, state) => {
    root.innerHTML = App(state);
    console.log('aaa', state)
};

// create content
const App = (state) => {
    let {rovers, apod} = state;
    return `
        <header></header>
        <main>
            <h1>${Greeting(store.user.name)}</h1>
            <section>
                <div class="content box">
            <div class="sentence" style="font-size: 24px;">
            <p>This is Nguyen Quang Duy blog</p>
            </div>
            <div class="column">
                <div><ul>${getRover(state)}</ul></div>
            </div>
        </div>
        ${ImageOfTheDay(apod)}
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

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date();
    const photodate = new Date(apod.date);
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store);
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>          
        `;
    } else {
        return `
            <img src="${apod.image.url}" height="100px" width="200px" />
        `;
    }
};

const getRover = (state) => {
    // let { rovers } = state;
    // fetch(`http://localhost:3000/:name`)
    //     .then((res) => res.json())
    //     .then((rovers) => updateStore(store, {rovers}))
    if ()
    return state.rovers.map(s => `<li><a href="${s}">${s}</a></li>`)
}

const getRoverData = (state) => {
    return `<ul>
                <li>Name: ${name}</li>
                <li>Launch date: </li>
                <li>Landing date: </li>
                <li>Ship's status: ${status}</li>
                <li>Day of taking photo: </li>
            </ul>`
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let {apod} = state;

    fetch(`http://localhost:3000/apod`)
        .then((res) => res.json())
        .then((apod) => updateStore(store, {apod}));

    return data;
};

const getRoverData = (state) => {
    const { chosen } = state

    fetch(`/${chosenRover}`)
        .then(res => res.json())
        .then(data => updateStore({ data }))
}
