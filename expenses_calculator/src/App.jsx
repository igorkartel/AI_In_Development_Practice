import React, { useState } from "react";

function App() {
  // State to store the list of expenses
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Groceries", amount: 15.00 },
    { id: 2, category: "Rent", amount: 40.00 },
    { id: 3, category: "Transportation", amount: 5.00 },
    { id: 4, category: "Entertainment", amount: 10.00 },
    { id: 5, category: "Communication", amount: 2.00 },
    { id: 6, category: "Gym", amount: 3.00 },
  ]);

  // State for new expense input fields
  const [nextId, setNextId] = useState(7);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // State for calculated results
  const [results, setResults] = useState(null);

  // Handler to add a new expense to the list
  const handleAddExpense = () => {
    // Validate input
    if (!newCategory || !newAmount || isNaN(Number(newAmount))) return;
    setExpenses([
      ...expenses,
      { id: nextId, category: newCategory, amount: Number(newAmount) },
    ]);
    setNextId(nextId+1);
    setNewCategory("");
    setNewAmount("");
  };

  // Handler to calculate the required indicators
  const handleCalculate = () => {
    // Calculate total expenses
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate average daily expense (assuming 30 days in a month)
    const avgDaily = total / 30;

    // Find top 3 largest expenses
    const top3 = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    // Save results to state
    setResults({
      total,
      avgDaily,
      top3,
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>Monthly Expenses Calculator</h2>
      {/* Expense input table */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each expense row */}
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td style={{ textAlign: "center" }}>{exp.id}</td>
              <td style={{ textAlign: "center" }}>{exp.category}</td>
              <td style={{ textAlign: "center" }}>{exp.amount.toFixed(2)}</td>
            </tr>
          ))}
          {/* Row for adding a new expense */}
          <tr>
            <td>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category"
              />
            </td>
            <td>
              <input
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Amount"
                type="number"
                min="0"
              />
            </td>
            <td>
              <button onClick={handleAddExpense}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Calculate button */}
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Display results if calculated */}
      {results && (
        <div>
          <h3>Results</h3>
          <p>
            <strong>Total amount of expenses:</strong> ${results.total.toFixed(2)}
          </p>
          <p>
            <strong>Average daily expense:</strong> ${results.avgDaily.toFixed(2)}
          </p>
          <p>
            <strong>Top 3 expenses:</strong>
          </p>
          <ol>
            {results.top3.map((exp) => (
              <li key={exp.id}>
                {exp.category} (${exp.amount.toFixed(2)})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;