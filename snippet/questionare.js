const question = [
    {
        question: "What is your favorite food",
        option1: "pizza",
        option2: "grass",
        option3: "cucumber"
    },
    {
        question: "what is your favorite pizza",
        option1: "cheese",
        option2:"margerita",
        option3:"paneer"
    }
];

var element = 0;
function displayHtml(element)
{
    let dynamicHtml = 
    `
        <div class="main-box">
            <h2 class="question">${question[element].question}</h2>
            <div class="grid-box">
                <button class="grid-elements">${question[element].option1}</button>
                <button class="grid-elements">${question[element].option2}</button>
                <button class="grid-elements">${question[element].option3}</button>
                <button id="next-button" class="grid-elements" onclick="
                    ${element++};
                    displayHtml(${element});
                ">Next button</button>
            </div>
        </div>
    `;
    document.querySelector('body').innerHTML = dynamicHtml;
}

displayHtml(element);


