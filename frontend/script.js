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

        if (!response.ok) throw new Error("Backend error");

        const data = await response.json();

        result.innerHTML = `
            <h3>🔴 Risk Score: ${data.riskScore}</h3>
            <p><strong>Warnings:</strong> ${data.warnings?.join(", ") || "None"}</p>
            <pre>${JSON.stringify(data.payload, null, 2)}</pre>
        `;

    } catch (error) {

        // 🔥 SIMULATION MODE (Fallback)
        result.innerHTML = `
            <h3>⚠ Backend Not Available</h3>
            <p>Showing Simulation Data</p>
            <h3>🔴 Risk Score: 75 (Simulated)</h3>
            <p><strong>Warnings:</strong> Weak Secret Key, Long Expiry, No Signature Verification</p>
            <pre>{
  "simulated": true,
  "message": "This is demo fallback data"
}</pre>
        `;
    }
}