// Selecting all reuired elements
const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll(".play-area__box"),
  players = document.querySelector(".play-board__players"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".result-box__won-text"),
  replayBtn = resultBox.querySelector(".result-box__btn button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectXBtn.onclick = () => {
  selectBox.classList.add("hide"); // hides the select-box with btn X clicked
  playBoard.classList.add("show"); // shows the playboard when btn X clicked
};

selectOBtn.onclick = () => {
  selectBox.classList.add("hide"); // hides the select-box with btn O clicked
  playBoard.classList.add("show"); // shows the playboard when btn O clicked
  players.setAttribute("class", "play-board__players active player");
};

let playerXIcon = "fas fa-times"; // class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; // class name of fontawesome circle icon
let playerSign = "X"; // suppose player will be X
let runBot = true;

// User click function
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  } else {
    playerSign = "X";
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  selectWinner(); // calling the winner function
  playBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none"; // once user selected any box that box cannot be selected again
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); // generating random time delay so bot will delay randomly to select box
  console.log(randomDelayTime);
  setTimeout(() => {
    bot(runBot); // calling bot function
  }, randomDelayTime); // passing random delay time
}

// Bot click function
function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = []; // creating empty array, we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        // if box has no child elements
        array.push(i); // inserting unclicked or unselected boxes inside array means that box has no children
        // console.log(`${i} has no children`);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none"; // once bot select any box user cannot select or click it
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

// Select the winner
function getClass(idname) {
  return document.querySelector(".box" + idname).id; // returning id name
}

function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(7, 8, 9, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign)
  ) {
    console.log(`${playerSign} is the winner!`);
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700); // 700ms delay

    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  } else {
    // if match has drawn
    if (
      getClass(1) != "" &&
      getClass(1) != "" &&
      getClass(2) != "" &&
      getClass(3) != "" &&
      getClass(4) != "" &&
      getClass(5) != "" &&
      getClass(6) != "" &&
      getClass(7) != "" &&
      getClass(8) != "" &&
      getClass(9) != ""
    ) {
      console.log(`${playerSign} is the winner!`);
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700); // 700ms delay

      wonText.textContent = `Match has been drawn!`;
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
};
