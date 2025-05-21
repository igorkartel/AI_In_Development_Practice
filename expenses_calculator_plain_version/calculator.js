const expenses = [];

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || isNaN(amount)) return;

    expenses.push({ category, amount });

    // Добавляем в таблицу
    const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = category;
    newRow.insertCell(1).innerText = amount.toFixed(2);

    // Очистка формы
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
});

function calculateExpenses() {
    if (expenses.length === 0) return;

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    const average = total / 30;
    const top3 = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 3);

    // Вывод результата
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = `
        <p><strong>Total Expenses:</strong> $${total.toFixed(2)}</p>
        <p><strong>Average Daily Expense:</strong> $${average.toFixed(2)}</p>
        <p><strong>Top 3 Expenses:</strong></p>
        <ol>${top3.map(e => `<li>${e.category} ($${e.amount.toFixed(2)})</li>`).join('')}</ol>
    `;
}