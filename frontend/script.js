async function analyzeToken() {
    const token = document.getElementById("tokenInput").value;
    const result = document.getElementById("result");

    if (!token) {
        result.innerHTML = "Please enter a token.";
        return;
    }

    result.innerHTML = "Analyzing...";

    try {
        const response = await fetch("http://localhost:5000/api/status");
        const data = await response.json();

        result.innerHTML = `
            <p>Backend Connected ✔</p>
            <p>${data.message}</p>
        `;
    } catch (error) {
        result.innerHTML = "Error connecting to backend.";
    }
}