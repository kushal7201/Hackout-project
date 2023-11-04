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
      <button class="button option-1" data-button-number="1">${question[element].option1}</button>
      <button class="button option-2" data-button-number="2">${question[element].option2}</button>
      <button class="button option-3" data-button-number="3">${question[element].option3}</button>

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

document.querySelectorAll('.button')
  .forEach((option) => {
    option.addEventListener('click', () => {
      const {buttonNumber} = option.dataset;

      const highlightButton = document.querySelector(`.option-${buttonNumber}`);
      highlightButton.classList.add('highlight-option');

    });
  });

