from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import Product, Cart, CartItem, Order, OrderItem, UserProfile
import json

# NOTES #
## @csrf_exempt disables Django's default Cross-Site Request Forgery (CSRF) protection for this view.
# CSRF is a security feature that prevents malicious websites from making unwanted actions on behalf of a logged-in user.
# Normally, Django requires a special token to be included in POST requests for safety.
# Since this view receives JSON data (likely from a frontend app like React or a testing tool like Postman),
# and not from a standard Django form, CSRF protection is manually bypassed here.
# ⚠️ Use @csrf_exempt carefully—only when you're handling security in other ways (like using authentication tokens),
# especially in production environments.


# --- USER AUTH VIEWS ---

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            password = data['password']
            email = data.get('email', '')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already taken'}, status=400)

            user = User.objects.create_user(username=username, password=password, email=email)
            UserProfile.objects.create(user=user)  # Auto-create profile
            return JsonResponse({'message': 'User registered successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            password = data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful', 'user_id': user.id})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})


@csrf_exempt
def user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        profile = UserProfile.objects.get(user=user)

        if request.method == 'GET':
            return JsonResponse({
                'username': user.username,
                'email': user.email,
                'address': profile.address,
                'phone': profile.phone
            })

        elif request.method == 'POST':
            data = json.loads(request.body)
            profile.address = data.get('address', profile.address)
            profile.phone = data.get('phone', profile.phone)
            profile.save()
            return JsonResponse({'message': 'Profile updated successfully'})

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except UserProfile.DoesNotExist:
        return JsonResponse({'error': 'User profile not found'}, status=404)


# --- CART + CHECKOUT VIEWS ---

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=data['user_id'])
            product = Product.objects.get(id=data['product_id'])
            quantity = data['quantity']

            cart, _ = Cart.objects.get_or_create(user=user)
            item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            item.quantity = item.quantity + quantity if not created else quantity
            item.save()

            return JsonResponse({'message': 'Added to cart'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def checkout(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=data['user_id'])
            cart = get_object_or_404(Cart, user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            if not cart_items:
                return JsonResponse({'error': 'Cart is empty'}, status=400)

            total = sum(item.total_price() for item in cart_items)
            order = Order.objects.create(user=user, total=total, created_at=timezone.now())

            for item in cart_items:
                OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
                item.delete()

            return JsonResponse({'message': 'Order placed successfully', 'order_id': order.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
