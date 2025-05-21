import requests

API_URL = "https://fakestoreapi.com/products"

def fetch_products():
    response = requests.get(API_URL)
    return response

def test_api_response_code():
    response = fetch_products()
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

def test_products_data():
    response = fetch_products()
    products = response.json()
    defective_products = []

    for product in products:
        defects = []
        # Check title
        if not product.get('title'):
            defects.append("Missing or empty title")
        # Check price
        if product.get('price', 0) < 0:
            defects.append("Negative price")
        # Check rating.rate
        rating = product.get('rating', {})
        if rating.get('rate', 0) > 5:
            defects.append("Rating.rate exceeds 5")
        if defects:
            defective_products.append({
                "id": product.get('id'),
                "title": product.get('title'),
                "defects": defects
            })

    # Print defective products for review
    if defective_products:
        print("\nDefective products found:")
        for prod in defective_products:
            print(f"ID: {prod['id']}, Title: {prod['title']}, Defects: {prod['defects']}")
    else:
        print("\nNo defective products found.")

    # Optionally, fail the test if defects are found
    assert not defective_products, "Defective products detected. See output above."

if __name__ == "__main__":
    # Run tests manually if script is executed directly
    test_api_response_code()
    test_products_data()