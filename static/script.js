async function summarizeText() {
    const inputText = document.getElementById('inputText').value.trim();

    if (!inputText) {
        alert('Please paste some text first!');
        return;
    }

    document.getElementById('outputSummary').innerHTML = "Summarizing...";

    try {
        const response = await fetch('http://localhost:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        const data = await response.json();

        if (data.summary) {
            document.getElementById('outputSummary').innerText = data.summary;
        } else {
            document.getElementById('outputSummary').innerText = "Error summarizing text.";
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('outputSummary').innerText = "Server Error.";
    }
}
