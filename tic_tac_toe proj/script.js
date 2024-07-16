document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".ticbox");
    let resetbtn = document.querySelector("#reset");
    let newbtn = document.querySelector("#new");
    let msgC = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let playerO = true;

    const WinPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("Box is clicked");
            if (box.innerText === "") 
            { 
                box.innerText = playerO ? "O" : "X";
                playerO = !playerO;
                box.style.pointerEvents = "none"; 
                checkWinner();
            }
        });
    });

    const resetGame = () => {
        playerO = true;
        enableBox();
        msgC.classList.add("hide");
    };

    const disableBox = () => {
        boxes.forEach(box => {
            box.style.pointerEvents = "none"; 
        });
    };

    const enableBox = () => {
        boxes.forEach(box => {
            box.style.pointerEvents = "auto"; // Enable clicking on the box
            box.innerText = ""; // Clear the text inside the box
        });
    };

    const showWinner = (winner) => {
        msg.innerText = `Congrats, The Winner is ${winner}`;
        msgC.classList.remove("hide");
        disableBox();
    };

    const checkWinner = () => {
        for (let pattern of WinPatterns) {
            let [a, b, c] = pattern;
            let pos1 = boxes[a].innerText;
            let pos2 = boxes[b].innerText;
            let pos3 = boxes[c].innerText;

            if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                console.log("Winner!!", pos1);
                showWinner(pos1);
                return;
            }
        }

       
        let allFilled = Array.from(boxes).every(box => box.innerText !== "");
        if (allFilled) {
            msg.innerText = "It's a Draw!";
            msgC.classList.remove("hide");
            disableBox();
        }
    };

    newbtn.addEventListener('click', resetGame);
    resetbtn.addEventListener('click', resetGame);
});
