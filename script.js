// SPA (Single Page Application) Sidebar Tab Switching
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active class on nav links
        document.querySelectorAll('.sidebar ul li a').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all sections and reveal target section
        document.querySelectorAll('.concept-section').forEach(section => section.classList.add('hidden'));
        const targetSection = this.getAttribute('href');
        document.querySelector(targetSection).classList.remove('hidden');
    });
});

// Chapter 1 Interactive Dynamic Elements: Bias-Variance Toggle
function toggleTradeoff(complexity) {
    const display = document.getElementById('tradeoff-display');
    if (complexity === 'low') {
        display.innerHTML = `<strong>Underfitting Environment:</strong> <br> High Bias, Low Variance. The model is too simple to grasp the patterns. Training and Testing errors are both high.`;
    } else if (complexity === 'high') {
        display.innerHTML = `<strong>Overfitting Environment:</strong> <br> Low Bias, High Variance. The model memorizes noise. Training error is minimal, but Testing error peaks sharply.`;
    }
}

// Chapter 6 Interactive Dynamic Elements: Architecture Selector
const architectures = {
    alex: "<strong>AlexNet (2012):</strong> Introduced deep convolutional networks utilizing ReLU activations, Dropout regularizations, and GPU acceleration to win ILSVRC.",
    vgg: "<strong>VGG (2014):</strong> Proved that smaller filter sizing (3x3 convolutional kernels) stacked deeply yields superior performance over larger kernels.",
    resnet: "<strong>ResNet (2015):</strong> Introduced Residual Blocks (skip connections) solving the exploding/vanishing gradient crisis across ultra-deep networks."
};

document.getElementById('arch-selector').addEventListener('change', function() {
    const selectedArch = this.value;
    document.getElementById('arch-desc').innerHTML = architectures[selectedArch];
});
