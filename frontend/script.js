async function analyzeToken() {
    const token = document.getElementById("tokenInput").value;
    const result = document.getElementById("result");

    if (!token) {
        result.innerHTML = "Please enter a token.";
        return;
    }

    result.innerHTML = "Analyzing...";

    try {
        const response = await fetch("http://localhost:5000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();

        result.innerHTML = `
            <h3>Risk Score: ${data.riskScore}</h3>
            <p><strong>Warnings:</strong> ${data.warnings.join(", ")}</p>
            <pre>${JSON.stringify(data.payload, null, 2)}</pre>
        `;

    } catch (error) {
        result.innerHTML = "Error analyzing token.";
    }
}