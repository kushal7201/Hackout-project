const question = [
    {
        question: "What is your favorite food",
        option1: "pizza",
        option2: "grass",
        option3: "cucumber"
    },
    {
        question: "What is your favorite pizza",
        option1: "cheese",
        option2:"margerita",
        option3:"paneer"
    },
    {
        question: "What is your favorite food",
        option1: "pizza",
        option2: "grass",
        option3: "cucumber"
    },
    {
        question: "What is your favorite pizza",
        option1: "cheese",
        option2:"margerita",
        option3:"paneer"
    },
];

var element = 0;
function displayHtml(element)
{
    let dynamicHtml = 
    `<form>
        <div class = "question">
          <h3>${question[element].question}</h3>
        </div>
        <button onclick="optionSelect(1)" class="option o-1">${question[element].option1}</button>
        <button  onclick="optionSelect(2)" class="option o-2">${question[element].option2}</button>
        <button  onclick="optionSelect(3)" class="option o-3">${question[element].option3}</button>

        <a onclick = "
        ${element++};
        displayHtml(${element});
    " class="next-button">

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Next Question
        </a>
      </form>`
      document.querySelector('.login-box').innerHTML = dynamicHtml;
}

displayHtml(element);

function optionSelect(param){
    let buttonElement = document.querySelector(`.o-${param}`);
    buttonElement.classList.add("clicked");
}