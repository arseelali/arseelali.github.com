document.addEventListener('DOMContentLoaded', () => {
    const dot = document.createElement('div');
    dot.className = 'trail';
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Adjust for the current scroll position
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        dot.style.left = `${mouseX + scrollX}px`;
        dot.style.top = `${mouseY + scrollY}px`;

        // Check if the mouse is over a white area
        const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
        if (elementUnderMouse && elementUnderMouse.closest('.white-area')) {
            dot.style.backgroundColor = 'black';
        } else {
            dot.style.backgroundColor = 'white';
        }
    });
});
