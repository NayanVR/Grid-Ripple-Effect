const gridContainer = document.getElementById('grid-container');
const cursor = document.querySelector('.cursor');

const columns = parseInt(window.innerWidth / 40);
const rows = parseInt(window.innerHeight / 40);

gridContainer.style.setProperty('--columns', columns);
gridContainer.style.setProperty('--rows', rows);

let ripples = [];

const handleMouseMove = e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
};

document.addEventListener('mousemove', handleMouseMove);

const handleMouseClick = e => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.opacity = 1;
    ripple.style.width = 0;
    ripples.push(ripple);
    document.body.appendChild(ripple);
};

document.addEventListener('click', handleMouseClick);

const createTile = () => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    return tile;
};

const createTiles = quantity => {
    for (let i = 0; i < quantity; i++) {
        const tile = createTile(i);
        gridContainer.appendChild(tile);
    }
}

createTiles(columns * rows);

function animateRipple() {
    requestAnimationFrame(animateRipple);

    if (ripples.length > 0) {
        ripples.forEach((ripple, index) => {
            ripple.style.opacity = ripple.style.opacity - 0.005;
            ripple.style.width = ripple.offsetWidth + 10 + 'px';
            ripple.style.height = ripple.offsetHeight + 10 + 'px';
            if (ripple.style.opacity <= 0) {
                ripple.remove();
                ripples.splice(index, 1);
            }
        })
    }
}

animateRipple();