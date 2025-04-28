# Pytest file
import pytest
import json
from http import client as http_client
from django.test import Client
from django.urls import reverse
from django.contrib.auth.models import User
from catalog.models import Product, Cart, CartItem, Order, OrderItem, UserProfile


# ------ Fixtures -----
# Note: Fixtures are reusable setup functions in pytest that provide consistent test data or resources.
# They help reduce repetition, ensure test isolation, and simplify test setup. Here, we define:
# - `client`: A Django test client to simulate HTTP requests to views.
# - `create_user`: Creates a test user for authentication and association with carts/orders.
# - `create_product`: Creates a test product for cart and order tests.
# Each fixture is created fresh for each test, ensuring independence.

@pytest.fixture
def client():
    return Client()

@pytest.fixture
def create_user(db):
    user = User.objects.create_user(username="testuser", password="testpass123")
    return user

@pytest.fixture
def create_product(db):
    return Product.objects.create(name="Test Product", description="A product for testing", price=19.99)

# ------ Backend Tests -----

@pytest.mark.django_db
def test_create_product():
    product = Product.objects.create(
        name="Test Product",
        description="A product for testing",
        price=19.99
    )
    assert product.name == "Test Product"
    assert product.price == 19.99
    assert str(product) == "Test Product"

@pytest.mark.django_db
def test_cart_total_price():
    user = User.objects.create_user(username='testuser', password='testpass')
    cart = Cart.objects.create(user=user)
    product1 = Product.objects.create(name="P1", description="D", price=10.00)
    product2 = Product.objects.create(name="P2", description="D", price=15.00)

    CartItem.objects.create(cart=cart, product=product1, quantity=2)  # $20
    CartItem.objects.create(cart=cart, product=product2, quantity=1)  # $15

    assert cart.total_price() == 35.00

@pytest.mark.django_db
def test_order_item_total_price():
    user = User.objects.create_user(username='orderuser', password='orderpass')
    order = Order.objects.create(user=user, total=0)

    product = Product.objects.create(name="Order Product", description="O", price=25.00)
    item = OrderItem.objects.create(order=order, product=product, quantity=3)

    assert item.total_price() == 75.00

@pytest.mark.django_db
def test_user_profile_creation():
    user = User.objects.create_user(username='profileuser', password='profilepass')
    profile = UserProfile.objects.create(user=user, address="123 Testing St", phone="123-456-7890")

    assert str(profile) == 'profileuser'
    assert profile.address == "123 Testing St"
    assert profile.phone == "123-456-7890"


# ------ View Tests Include Frontend -----

@pytest.mark.django_db
def test_user_registration(client):
    url = reverse("register")
    data = {
        "username": "newuser",
        "password": "newpass123",
        "email": "newuser@example.com"
    }
    response = client.post(url, data, content_type="application/json")
    assert response.status_code == http_client.CREATED  # 201
    assert User.objects.filter(username="newuser").exists()

@pytest.mark.django_db
def test_user_login(client):
    user = User.objects.create_user(username="loginuser", password="loginpass123")
    url = reverse("login")
    data = {"username": "loginuser", "password": "loginpass123"}
    response = client.post(url, data, content_type="application/json")
    assert response.status_code == http_client.OK  # 200
    # Check if the user is logged in (session-based auth)
    assert "_auth_user_id" in client.session
    assert int(client.session["_auth_user_id"]) == user.id

@pytest.mark.django_db
def test_user_profile(client, create_user):
    profile = UserProfile.objects.create(user=create_user, address="456 Profile Ave", phone="987-654-3210")
    url = reverse("profile", kwargs={"user_id": create_user.id})
    # Log in the user
    client.login(username="testuser", password="testpass123")
    response = client.get(url)
    assert response.status_code == http_client.OK  # 200
    data = json.loads(response.content)
    assert data["address"] == "456 Profile Ave"
    assert data["phone"] == "987-654-3210"

@pytest.mark.django_db
def test_add_to_cart(client, create_user, create_product):
    # Log in the user
    client.login(username="testuser", password="testpass123")
    url = reverse("add_to_cart")
    data = {
        "product_id": create_product.id,
        "quantity": 2
    }
    response = client.post(url, data, content_type="application/json")
    assert response.status_code == http_client.CREATED  # 201
    assert CartItem.objects.count() == 1
    cart_item = CartItem.objects.first()
    assert cart_item.product == create_product
    assert cart_item.quantity == 2
    assert cart_item.cart.user == create_user

@pytest.mark.django_db
def test_checkout(client, create_user, create_product):
    # Log in the user
    client.login(username="testuser", password="testpass123")
    # Add items to cart first
    cart = Cart.objects.create(user=create_user)
    CartItem.objects.create(cart=cart, product=create_product, quantity=2)
    url = reverse("checkout")
    data = {
        "shipping_address": "123 Test St, City, Country"
    }
    response = client.post(url, data, content_type="application/json")
    assert response.status_code == http_client.CREATED  # 201
    assert Order.objects.count() == 1
    assert OrderItem.objects.count() == 1
    order = Order.objects.first()
    assert order.user == create_user
    assert order.total == 2 * create_product.price  # 2 * 19.99 = 39.98
    assert order.shipping_address == "123 Test St, City, Country"