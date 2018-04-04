// const mainContainer = document.querySelector('#mainContainer');
// const btns = document.querySelectorAll('#controller > button')
const containers = document.querySelectorAll('.container');
const banner = document.querySelector('#banner');
const randomBtn = document.querySelector('#controller > button:first-child');
const alertMessage = document.querySelector('#alertMessage');
const easyBtn = document.querySelector('#controller button:nth-of-type(2)');
const hardBtn = document.querySelector('#controller button:nth-of-type(3)');
let rgbSpan = document.querySelector('#banner > span:nth-of-type(2)');
let numSwitcher = 6;
let rgbColors = rgbColorsGenerator(numSwitcher);
let colorReference = colorReferenceGenerator(rgbColors, numSwitcher);

console.log(rgbColors);
rgbSpan.textContent = colorReference;
playGame(numSwitcher);

// click event to reload randon colors
randomBtn.addEventListener('click', function() {
    rgbColors = rgbColorsGenerator(numSwitcher);
    colorReference = colorReferenceGenerator(rgbColors, numSwitcher);
    rgbSpan.textContent = colorReference;
    alertMessage.textContent = ''
    banner.style.backgroundColor = 'rgb(206, 203, 203)';
    playGame(numSwitcher);
});

// easy mode setup
easyBtn.addEventListener('click', function() {
    easyBtn.classList.add('selected');
    hardBtn.classList.remove('selected');
    numSwitcher = 3;
    for (let i = containers.length - 1; i >= numSwitcher; i--) {
        containers[i].style.display = 'none';
    }

});

// hard mode setup
hardBtn.addEventListener('click', function() {
    hardBtn.classList.add('selected');
    easyBtn.classList.remove('selected');
    numSwitcher = 6;
    for (let i = 0; i < numSwitcher; i++) {
        containers[i].style.display = 'flex';
    }
});


// functions
function rgbColorsGenerator(num) {
    const rgbColors = [];
    for (let i = 0; i < num; i++) {
        const r = Math.floor(Math.random() * 256); 
        const g = Math.floor(Math.random() * 256); 
        const b = Math.floor(Math.random() * 256);
        rgbColors.push(`rgb(${r}, ${g}, ${b})`) 
    }
    return rgbColors;
}

function colorReferenceGenerator(rgbArr, num) {
    const randomNum = Math.floor(Math.random() * num);
    const color = rgbArr[randomNum];
    return color;
}

function playGame(num) {
    for (let i = 0; i < num; i++) {
        containers[i].style.backgroundColor = rgbColors[i];
        containers[i].classList.remove('fadedBg');
        containers[i].addEventListener('click', function() {
            containers[i].classList.add('fadedBg');
            if (this.style.backgroundColor === colorReference) {
                banner.style.backgroundColor = colorReference;
                alertMessage.textContent = 'Correct!';
                alertMessage.style.color = 'green';
                for (let j = 0; j < num; j++) {
                 containers[j].style.backgroundColor = colorReference;
                 containers[j].classList.remove('fadedBg');
                }
             } else {
                alertMessage.textContent = 'Try Again!';
                alertMessage.style.color = 'red';
            }
        });
    }
}
