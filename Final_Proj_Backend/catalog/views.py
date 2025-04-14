from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Product, Cart, CartItem, Order, OrderItem
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data['user_id'])
        product = Product.objects.get(id=data['product_id'])
        quantity = data['quantity']

        cart, _ = Cart.objects.get_or_create(user=user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()

        return JsonResponse({'message': 'Added to cart'})

@csrf_exempt
def checkout(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data['user_id'])
        cart = get_object_or_404(Cart, user=user)
        cart_items = CartItem.objects.filter(cart=cart)

        total = sum(item.subtotal() for item in cart_items)

        order = Order.objects.create(user=user, total=total)

        for item in cart_items:
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
            item.delete()

        return JsonResponse({'message': 'Order placed successfully', 'order_id': order.id})

