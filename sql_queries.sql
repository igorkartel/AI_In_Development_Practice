-- Calculate the total sales volume for March 2024:
SELECT SUM(amount) AS total_sales_march
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
-- Expected result: 27,000

-- Find the customer who spent the most overall:
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
-- Expected result: Alice (20,000)

-- Calculate the average order value for the last three months (Jan, Feb, Mar 2024):
SELECT AVG(amount) AS avg_order_value
FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2024-04-01';
-- Expected result: 6,000