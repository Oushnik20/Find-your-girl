let scoreH2= document.getElementById('score');
let timeleftH2= document.getElementById('timeleft');
let startNewGameButton= document.getElementById('startNewGame');
let pauseGameButton= document.getElementById('pauseGame');
let squares= document.querySelectorAll('.square');
let gameMusic= new Audio('../../images/cyber-town-simcity-style-music-22907.mp3');
let hitMusic= new Audio('../.../images/select-sound-121244.mp3');
let score=0;
let timeleft=0;
let hitPosition= null;
let timerId= null;
let randomMoleId= null;
let grid= document.getElementsByClassName('grid')[0];
//randomly place my mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole')
    }) 

    let randomSquare=squares[Math.floor(Math.random()*squares.length)]; // give id 0 to 8
    randomSquare.classList.add('mole');
    hitPosition= randomSquare.id;

}

function countDown(){
    timeleft--;
    timeleftH2.innerHTML= `Time Left: ${timeleft}`;

if(timeleft === 0){
    clearInterval(timerId);
    clearInterval(randomMoleId);
    grid.style.display= 'none';
}
}

randomMole();

function startGame(){
    score=0;
    timeleft= 60;
    scoreH2.innerHTML= 'Your Score: 0';
    timeleft.innerHTML= 'Time Left: 60';
    grid.style.display= 'inline-block';
    pauseGameButton.style.display= 'inline-block'
    pauseGameButton.innerHTML= 'Pause';
    gameMusic.play();
    // callback function
    // setInterval call function at regular interval
    timerId= setInterval(randomMole, 1000);
    randomMoleId= setInterval(countDown, 1000)
}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId= null;
        randomMoleId= null;
        pauseGameButton.textContent= 'Resume';
    }
    else{
        gameMusic.play();
        timerId= setInterval(randomMole, 1000);
        randomMoleId= setInterval(countDown, 1000);
        pauseGameButton.textContent= 'Pause';
    }
}

squares.forEach(square =>{
    square.addEventListener('mousedown', () =>{
        if(timerId != null){
            if(square.id === hitPosition){
                gameMusic.pause();
                hitMusic.play();
                setTimeout( () => {hitMusic.pause()}, 1000);
                gameMusic.play();
                score++;
                scoreH2.textContent= `Your Score ${score}`;
                hitPosition= null;
            }
        }
        
    })
})


startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);

