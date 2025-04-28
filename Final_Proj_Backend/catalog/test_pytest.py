# Pytest file
# ------ Backend TestCases -----

import pytest
import json
from django.contrib.auth.models import User
from django.urls import reverse
from catalog.models import Product, Cart, CartItem, Order, OrderItem, UserProfile

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

# Test cases specifically for views.py

@pytest.mark.django_db
def test_signup_view_success(client):
    url = reverse('register')
    data = {
        'username': 'profileuser',
        'password': 'profilepass',
        'email': 'example@email.com'
    }
    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['message'] == 'User registered successfully'
    assert User.objects.filter(username = 'profileuser').exists()
    user = User.objects.get(username = 'profileuser')
    assert UserProfile.objects.filter(user = user).exists()

@pytest.mark.django_db
def test_signup_view_duplicate(client):
    User.objects.create_user(username='firstuser', password='password123')
    url = reverse('register')
    data = {
        'username': 'firstuser',
        'password': 'profilepass',
        'email': 'example@email.com'
    }
    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 400
    json_data = response.json()
    assert json_data['error'] == 'Username already taken'

@pytest.mark.django_db
def test_signup_view_error_handling(client):
    url = reverse('register')
    data = {
        'username': 'firstuser'
        # Test case will provide no password to trigger error
    }
    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 500
    json_data = response.json()
    assert 'error' in json_data

@pytest.mark.django_db
def test_login_view_success(client):
    user = User.objects.create_user(username='profileuser', password='profilepass')
    url = reverse('login')
    data = {
        'username': 'profileuser',
        'password': 'profilepass'
    }
    response = client.post(
        url,
        json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['message'] == 'Login successful'
    assert json_data['user_id'] == user.id

@pytest.mark.django_db
def test_login_view_invalid_input(client):
    user = User.objects.create_user(username='wrongname', password='badpass')
    url = reverse('login')
    data = {
        'username': 'profileuser',
        'password': 'profilepass'
    }
    response = client.post(
        url,
        json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 400
    json_data = response.json()
    assert json_data['error'] == 'Invalid credentials'

@pytest.mark.django_db
def test_login_view_missing_data(client):
    url = reverse('login')
    data = {
        'username': 'profileuser',
        # No password to trigger a failure
    }
    response = client.post(
        url,
        json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 500
    assert 'error' in response.json()

@pytest.mark.django_db
def test_user_profile_view(client):
    user = User.objects.create_user(username='user1', password='pass123')
    profile = UserProfile.objects.create(user=user, address="123 Testing St", phone="123-456-7890")
    
    url = reverse('profile', kwargs={'user_id': user.id})
    response = client.get(url)

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['username'] == 'user1'
    assert json_data['address'] == '123 Testing St'
    assert json_data['phone'] == '123-456-7890'

@pytest.mark.django_db
def test_user_profile_missing_user(client):
    url = reverse('profile', kwargs={'user_id': 1000}) # Nonexistent user
    response = client.get(url)

    assert response.status_code == 404
    json_data = response.json()
    assert json_data['error'] == 'User not found'

@pytest.mark.django_db
def test_user_profile_missing_profile(client):
    user = User.objects.create_user(username='user1', password='pass123')
    # No user profile

    url = reverse('profile', kwargs={'user_id': user.id})
    response = client.get(url)

    assert response.status_code == 404
    json_data = response.json()
    assert json_data['error'] == 'User profile not found'

@pytest.mark.django_db
def test_user_profile_update(client):
    user = User.objects.create_user(username='user1', password='pass123')
    profile = UserProfile.objects.create(user=user, address="123 Testing St", phone="123-456-7890")
    
    url = reverse('profile', kwargs={'user_id': user.id})
    data = {'address': '456 Django Ave', 'phone': '111-222-5555'}

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['message'] == 'Profile updated successfully'

    profile.refresh_from_db()
    assert profile.address == '456 Django Ave'
    assert profile.phone == '111-222-5555'

@pytest.mark.django_db
def test_user_profile_update_missing_user(client):
    url = reverse('profile', kwargs={'user_id': 1000}) # Nonexistent user
    data = {'address': '456 Django Ave', 'phone': '111-222-5555'}

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 404
    json_data = response.json()
    assert json_data['error'] == 'User not found'

@pytest.mark.django_db
def test_user_profile_update_missing_profile(client):
    user = User.objects.create_user(username='user1', password='pass123')
    
    url = reverse('profile', kwargs={'user_id': user.id})
    data = {'address': '456 Django Ave', 'phone': '111-222-5555'}

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 404
    json_data = response.json()
    assert json_data['error'] == 'User profile not found'

@pytest.mark.django_db
def test_add_to_cart(client):
    user = User.objects.create_user(username='shopuser', password='birthday1')
    product = Product.objects.create(name='Bread', description='yum', price=10.00)

    url = reverse('add_to_cart')
    data = {
        'user_id': user.id,
        'product_id': product.id,
        'quantity': 2
    }

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['message'] == 'Added to cart'

    cart = Cart.objects.get(user=user)
    cart_item = CartItem.objects.get(cart=cart, product=product)
    assert cart_item.quantity == 2

@pytest.mark.django_db
def test_add_to_cart_failure(client):
    user = User.objects.create_user(username='shopuser', password='birthday1')

    url = reverse('add_to_cart')
    data = {
        'user_id': user.id,
        'product_id': 1000, # Nonexistent product
        'quantity': 2
    }

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 500
    json_data = response.json()
    assert 'error' in json_data

@pytest.mark.django_db
def test_checkout(client):
    user = User.objects.create_user(username='selfcheck', password='receipt123')
    product = Product.objects.create(name='Milk', description='hi dad', price=10.00)
    cart = Cart.objects.create(user=user)
    CartItem.objects.create(cart=cart, product=product, quantity=3)

    url = reverse('checkout')
    data = {
        'user_id': user.id,
        'product_id': product.id,
        'quantity': 3
    }

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 200
    json_data = response.json()
    assert json_data['message'] == 'Order placed successfully'

    order = Order.objects.get(id=json_data['order_id'])
    assert order.user == user
    assert order.total == 30.00

    order_items = OrderItem.objects.filter(order=order)
    assert order_items.count() == 1
    assert order_items.first().product == product
    assert order_items.first().quantity == 3

    cart_items = CartItem.objects.filter(cart=cart)
    assert cart_items.count() == 0

@pytest.mark.django_db
def test_checkout_empty_cart(client):
    user = User.objects.create_user(username='selfcheck', password='receipt123')
    cart = Cart.objects.create(user=user)

    url = reverse('checkout')
    data = {'user_id': user.id}

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 400
    json_data = response.json()
    assert json_data['error'] == 'Cart is empty'

@pytest.mark.django_db
def test_checkout_failure(client):
    url = reverse('checkout')
    data = {'user_id': 1000} # Nonexistent user

    response = client.post(
        url,
        data=json.dumps(data),
        content_type='application/json'
    )

    assert response.status_code == 500
    json_data = response.json()
    assert 'error' in json_data