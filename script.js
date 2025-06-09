document.addEventListener("DOMContentLoaded", function () {
    const converterForm = document.getElementById("converter");
    if (converterForm) {
        converterForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const amount = parseFloat(document.getElementById("amount").value);
            const from = document.getElementById("from").value;
            const to = document.getElementById("to").value;

            const rates = {
                "EUR": { "CZK": 25.5, "USD": 1.1, "GBP": 0.85, "JPY": 158.3, "EUR": 1 },
                "USD": { "CZK": 23.0, "EUR": 0.91, "GBP": 0.77, "JPY": 144.2, "USD": 1 },
                "CZK": { "EUR": 0.039, "USD": 0.043, "GBP": 0.033, "JPY": 6.3, "CZK": 1 },
                "GBP": { "CZK": 30.1, "EUR": 1.18, "USD": 1.3, "JPY": 186.7, "GBP": 1 },
                "JPY": { "CZK": 0.16, "EUR": 0.0063, "USD": 0.0069, "GBP": 0.0054, "JPY": 1 },
            };

            const result = amount * rates[from][to];

            document.getElementById("result").textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

            addToHistory(amount, from, to, result.toFixed(2));
        });
    }

    const clearBtn = document.getElementById("clear-history");
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            localStorage.removeItem("conversionHistory");
            const historyList = document.getElementById("history-list");
            if (historyList) historyList.innerHTML = "";
        });
    }

    // Načíst historii, pokud existuje seznam
    const historyList = document.getElementById("history-list");
    if (historyList) {
        const storedHistory = JSON.parse(localStorage.getItem("conversionHistory")) || [];
        storedHistory.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }
});

function addToHistory(amount, from, to, result) {
    const historyText = `${amount} ${from} → ${result} ${to}`;

    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.push(historyText);
    localStorage.setItem("conversionHistory", JSON.stringify(history));

    const historyList = document.getElementById("history-list");
    if (historyList) {
        const historyItem = document.createElement("li");
        historyItem.textContent = historyText;
        historyList.appendChild(historyItem);
    }
}
