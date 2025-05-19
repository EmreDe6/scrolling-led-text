document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const fontColorPicker = document.getElementById('fontColorPicker');
    const scrollTextElement = document.getElementById('scroll-text');
    const scrollContainerElement = document.getElementById('scroll-container');

    const DESIRED_SPEED_PX_PER_SEC = 75; // Adjust for desired default speed

    function updateText() {
        const newText = textInput.value;
        scrollTextElement.textContent = newText;

        // Calculate new animation duration based on text length and container width
        // offsetWidth includes padding-left (container width) + text content width
        const totalEffectiveWidth = scrollTextElement.offsetWidth;
        let newDuration;

        if (totalEffectiveWidth > 0 && DESIRED_SPEED_PX_PER_SEC > 0) {
            newDuration = totalEffectiveWidth / DESIRED_SPEED_PX_PER_SEC;
            // Clamp duration to reasonable min/max values
            if (newText.trim() === "") {
                // For empty text, totalEffectiveWidth is effectively containerWidth.
                // Use a slightly different clamping if desired for empty scrolls.
                newDuration = Math.max(1, Math.min(newDuration, 15)); // e.g., 1s min, 15s max for empty
            } else {
                newDuration = Math.max(2, Math.min(newDuration, 120)); // e.g., 2s min, 120s max for text
            }
        } else {
            newDuration = 15; // Fallback duration if calculation is not possible
        }

        // Restart animation with new duration
        // 1. Remove current animation to apply changes
        scrollTextElement.style.animationName = 'none';

        // 2. Force a reflow to ensure the browser processes the removal
        void scrollTextElement.offsetWidth;

        // 3. Re-apply animation with the new duration and original name
        scrollTextElement.style.animationDuration = newDuration + 's';
        scrollTextElement.style.animationName = 'scroll-left-animation'; // Must match CSS @keyframes name
    }

    function updateBackgroundColor() {
        scrollContainerElement.style.backgroundColor = bgColorPicker.value;
    }

    function updateFontColor() {
        scrollTextElement.style.color = fontColorPicker.value;
    }

    // Initial setup when the page loads
    if (textInput && scrollTextElement && scrollContainerElement) {
        // Call updateText to set initial text from input and calculate initial animation duration
        updateText();
    }
    if (bgColorPicker && scrollContainerElement) {
        updateBackgroundColor(); // Apply initial background color from picker's default
    }
    if (fontColorPicker && scrollTextElement) {
        updateFontColor(); // Apply initial font color from picker's default
    }

    // Event listeners for live updates
    if (textInput) {
        textInput.addEventListener('input', updateText);
    }
    if (bgColorPicker) {
        bgColorPicker.addEventListener('input', updateBackgroundColor);
    }
    if (fontColorPicker) {
        fontColorPicker.addEventListener('input', updateFontColor);
    }
});