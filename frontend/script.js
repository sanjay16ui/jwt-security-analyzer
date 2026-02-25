function analyzeToken() {
    const token = document.getElementById("tokenInput").value;
    const result = document.getElementById("result");

    if (!token) {
        result.innerHTML = "Please enter a token.";
        return;
    }

    result.innerHTML = "Analyzing...";
}