const CONTAINER = document.querySelector('.grid-container')
const COLORLABEL = document.querySelector('#color-picker-label');
const COLORINPUT = document.querySelector('#color-picker-input');
const ERASER = document.querySelector('.eraser')
const RESIZE = document.querySelector('#resize-button')

let paintMode = true;
let eraseMode = false;
let isPainting = false;
let isErasing = false;

COLORLABEL.addEventListener('click', () => {
    COLORINPUT.click();
    paintMode = true;
    eraseMode = false;
});

COLORINPUT.addEventListener('change', () => {
    COLORLABEL.textContent = `Selected color: ${COLORINPUT.value}`;
});

ERASER.addEventListener('click', () => {
    eraseMode = true;
    paintMode = false;
})

RESIZE.addEventListener('click', () => {
    promptGridSize()
})

function createGrid(rows, cols) {
    CONTAINER.style.display = 'grid';
    CONTAINER.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    CONTAINER.style.gridAutoRows = '1fr';

    const viewportSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    CONTAINER.style.width = `${viewportSize}px`;
    CONTAINER.style.height = `${viewportSize}px`;


    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');

        CONTAINER.style.backgroundColor = '#fff';

        cell.addEventListener('mousedown', () => {
            if (paintMode) {
                isPainting = true;
            } else if (eraseMode) {
                isErasing = true;
            }
        })

        cell.addEventListener('mouseup', () => {
            if (paintMode) {
                isPainting = false;
            } else if (eraseMode) {
                isErasing = false;
            }
        })

        cell.addEventListener('click', (event) => {
            if (paintMode) {
                event.target.style.backgroundColor = COLORINPUT.value
            } else if (eraseMode) {
                event.target.style.backgroundColor = '#fff'
            }
        })

        cell.addEventListener('mouseover', (event) => {
            if (isPainting && paintMode) {
                event.target.style.backgroundColor = COLORINPUT.value
            }
            if (isErasing && eraseMode) {
                event.target.style.backgroundColor = '#fff'
            }
        });

        cell.addEventListener('touchstart', () => {
            if (paintMode) {
                isPainting = true;
            } else if (eraseMode) {
                isErasing = true;
            }
        })

        // Add touchend event for mobile devices
        cell.addEventListener('touchend', () => {
            if (paintMode) {
                isPainting = false;
            } else if (eraseMode) {
                isErasing = false;
            }
        })

        // Add touchmove event for mobile devices
        cell.addEventListener('touchmove', (event) => {
            event.preventDefault(); // prevent scrolling
            if (isPainting && paintMode) {
                event.target.style.backgroundColor = COLORINPUT.value
            }
            if (isErasing && eraseMode) {
                event.target.style.backgroundColor = '#fff'
            }
        });


        CONTAINER.appendChild(cell);

    }
}

function resizeGrid() {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    const cellSize = viewportSize / 32;

    CONTAINER.style.width = `${viewportSize}px`;
    CONTAINER.style.height = `${viewportSize}px`;
    CONTAINER.style.gridTemplateColumns = `repeat(32, ${cellSize}px)`;
}

window.addEventListener('resize', resizeGrid);

function promptGridSize() {
    let promptResponse = prompt('How big do you want the canvas?')
    let value = parseInt(promptResponse)
    if (value > 100) {
        alert('too big')
        promptGridSize()
    } else if (value < 8) {
        alert('too small')
        promptGridSize()
    } else if (isNaN(value)) {
        alert('must input a number')
        promptGridSize()
    } else {
        CONTAINER.innerHTML = ''
        createGrid(value, value)
    }
}

createGrid(32, 32)