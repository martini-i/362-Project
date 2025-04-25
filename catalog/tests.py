# Create your tests here.


# ------ Backend TestCases ------

import pytest
from django.contrib.auth.models import User
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
