const CONTAINER = document.querySelector('.grid-container')

function createGrid(rows,cols) {
    CONTAINER.style.display = 'grid';
    CONTAINER.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    CONTAINER.style.gridAutoRows = '1fr';
    CONTAINER.style.width = '300px';
    CONTAINER.style.height = '300px';

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');

        cell.style.backgroundColor = '#fff';

        cell.addEventListener('mouseover', (event) => {
            event.target.classList.add('hover')
        });

        cell.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = '#000'
        });

        CONTAINER.appendChild(cell);

    }
}

createGrid(16,16)