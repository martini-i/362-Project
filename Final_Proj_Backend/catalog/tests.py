from django.test import TestCase
from models.py import Product, Cart, CartItem, Order, OrderItem
# Create your tests here.

class ProductModelTest(TestCase):
    def test_product_str(self):
        product = Product.objects.create(
            name="Shirt", description="Nice shirt", price=19.99, stock=10
        )
        self.assertEqual(str(product), "Shirt")
        
class CartModelTest(TestCase):
    def test_product_str(self):
        
        )
        self.assertEqual()
        
class CartItemModelTest(TestCase):
    def test_product_str(self):
        
        )
        self.assertEqual()
        
        
class OrderModelTest(TestCase):
    def test_product_str(self):
        
        )
        self.assertEqual()

class OrderItemModelTest(TestCase):
    def test_product_str(self):
        
        )
        self.assertEqual()