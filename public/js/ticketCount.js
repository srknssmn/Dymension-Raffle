const ticketCounter = document.querySelector('#ticketCounter')
const ticketCount = document.querySelector('#ticketCount')

const buttonSelects = document.querySelectorAll('.numberSelect');

buttonSelects.forEach(button => {
    button.addEventListener('click', () => {

      if((button.getAttribute('id') == "ticketIncrease")) {
        if(ticketCount.value < 5) {
            ticketCount.value = Number(ticketCount.value) + 1
        }
      } else if ((button.getAttribute('id') == "ticketDecrease")) {
        if(ticketCount.value >= 2) {
            ticketCount.value -= Number(1)
        }
      }
    });
});