const CONTAINER = document.querySelector('.grid-container')
let isPainting = false;

function createGrid(rows,cols) {
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
            isPainting = true;
        })

        cell.addEventListener('mouseup', () => {
            isPainting = false;
        })

        cell.addEventListener('click', (event) => {
            event.target.style.backgroundColor = '#000'
        })

        cell.addEventListener('mouseover', (event) => {
            if (isPainting) {
                event.target.style.backgroundColor = '#000'
            }
        });



        CONTAINER.appendChild(cell);

    }
}

createGrid(16,16)