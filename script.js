const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");

speedRange.addEventListener("input", () => {
    speedValue.textContent = speedRange.value;
});
const imageInput = document.getElementById("imageInput");
const previewContainer = document.getElementById("previewContainer");
const generateBtn = document.getElementById("generateBtn");
const gifOutput = document.getElementById("gifOutput");

let uploadedImages = [];

imageInput.addEventListener("change", function () {
    previewContainer.innerHTML = "";
    uploadedImages = [];

    Array.from(this.files).forEach(file => {
        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);
        img.classList.add("preview-image");

        previewContainer.appendChild(img);
        uploadedImages.push(img);
    });
});

generateBtn.addEventListener("click", () => {

    if (uploadedImages.length === 0) {
        alert("Please upload images first!");
        return;
    }

    gifOutput.innerHTML = "<p>Generating GIF...</p>";

    const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "gif.worker.js"
    });

    uploadedImages.forEach(img => {
        gif.addFrame(img, {
            delay: parseInt(speedRange.value)
        });
    });

    gif.on("finished", function(blob) {

        const gifURL = URL.createObjectURL(blob);

        gifOutput.innerHTML = `
            <h3>Generated GIF</h3>
            <img src="${gifURL}" style="max-width:300px;">
            <br><br>
            <a href="${gifURL}" download="gif-forge.gif">
                Download GIF
            </a>
        `;
    });

    gif.render();
});