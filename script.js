//js for vanishing the loader animation effect

const loader = document.querySelector(".loader");
// Call the hideLoader function after 3 seconds (3000 milliseconds)


// Function to hide and remove the loader
const hideLoader = () => {
    loader.classList.add("loader-hide");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
};
setTimeout(hideLoader, 1500);


//js for the weather App