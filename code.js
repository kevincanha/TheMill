function LoadPhoto() {
    try {
        const pidInput = document.querySelector("#pid").value;
        const pid = parseInt(pidInput, 10);

        if (isNaN(pid) || pidInput.trim() === "") {
            throw new Error("Invalid product ID. Please enter a number.");
        }

        // Load image with fallback
        const photoURL = `images/${pid}.png`;
        const imageHtml = `<img id="image" src="${photoURL}" alt="Image not found" height="300" onerror="this.onerror=null; this.src='images/placeholder.png';">`;
        document.querySelector("#imagedisplay").innerHTML = imageHtml;

        // Check if text file exists before loading into iframe
        const textURL = `text/${pid}.txt`;
        fetch(textURL, { method: "HEAD" }) // Only check if the file exists
            .then(response => {
                if (!response.ok) {
                    throw new Error("Text file not found.");
                }
                document.querySelector("#textdisplay").src = textURL;
            })
            .catch(error => {
                console.error(error);
                document.querySelector("#textdisplay").src = "text/placeholder.txt"; // Show a default message
            });

    } catch (error) {
        alert(error.message); // Display error message to user
        console.error("Error:", error);
    }
}