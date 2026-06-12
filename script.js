const imageInput = document.getElementById("imageInput");
const previewContainer = document.getElementById("previewContainer");

imageInput.addEventListener("change", function () {
    previewContainer.innerHTML = "";

    const files = this.files;

    for (let file of files) {
        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);
        img.classList.add("preview-image");

        previewContainer.appendChild(img);
    }
});