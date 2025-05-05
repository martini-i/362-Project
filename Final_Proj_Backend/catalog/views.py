from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import Product, Cart, CartItem, Order, OrderItem, UserProfile
import json

# ------------------------------
# USER AUTH VIEWS
# ------------------------------

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
            UserProfile.objects.create(user=user)
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
                return JsonResponse({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                })
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

# ------------------------------
# PRODUCT VIEWS
# ------------------------------

def product_list(request):
    products = Product.objects.all()
    return JsonResponse([
        {
            'id': p.id,
            'name': p.name,
            'price': str(p.price),
            'description': p.description,
            'image': request.build_absolute_uri(p.image.url) if p.image else '',
            'category': p.category if hasattr(p, 'category') else ''
        }
        for p in products
    ], safe=False)

def product_detail(request, product_id):
    try:
        p = Product.objects.get(id=product_id)
        return JsonResponse({
            'id': p.id,
            'name': p.name,
            'price': str(p.price),
            'description': p.description,
            'image': request.build_absolute_uri(p.image.url) if p.image else '',
            'category': p.category if hasattr(p, 'category') else ''
        })
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)

# ------------------------------
# CART AND ORDER VIEWS
# ------------------------------

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        try:
            # --- Parse data ---
            data = json.loads(request.body)
            user_id = data.get('user_id')
            product_id = data.get('product_id')
            quantity = data.get('quantity', 1)

            # --- Validate ---
            if not user_id or not product_id:
                return JsonResponse({'error': 'Missing user_id or product_id'}, status=400)

            # --- Fetch user + product ---
            user = User.objects.get(id=user_id)
            product = Product.objects.get(id=product_id)

            # --- Get or create Cart ---
            cart, _ = Cart.objects.get_or_create(user=user)

            # --- Get or create CartItem ---
            item, created = CartItem.objects.get_or_create(cart=cart, product=product)

            if created:
                item.quantity = quantity
            else:
                item.quantity += quantity

            item.save()

            return JsonResponse({'message': 'Added to cart'})

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")
            product_id = data.get("product_id")
            quantity = data.get("quantity", 1)

            user = User.objects.get(id=user_id)
            product = Product.objects.get(id=product_id)

            cart, _ = Cart.objects.get_or_create(user=user)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            cart_item.quantity += quantity
            cart_item.save()

            return JsonResponse({"message": "Added to cart"})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def remove_from_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=data["user_id"])
            product = Product.objects.get(id=data["product_id"])
            cart = Cart.objects.get(user=user)
            CartItem.objects.filter(cart=cart, product=product).delete()
            return JsonResponse({"message": "Item removed"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def checkout(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = int(data.get("user_id", 0))

            if not user_id:
                return JsonResponse({"error": "Invalid user ID"}, status=400)

            user = User.objects.get(id=user_id)
            cart, created = Cart.objects.get_or_create(user=user)
            items = CartItem.objects.filter(cart=cart)

            if not items.exists():
                return JsonResponse({"error": "Cart is empty"}, status=400)

            order = Order.objects.create(user=user, total=0, is_paid=False)
            total = 0
            for item in items:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )
                total += item.product.price * item.quantity

            order.total = total
            order.save()

            # Clear cart after order
            items.delete()

            return JsonResponse({"message": "Order placed successfully"})

        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def order_history(request, user_id):
    try:
        orders = Order.objects.filter(user_id=user_id).order_by('-created_at')
        response = []
        for order in orders:
            items = OrderItem.objects.filter(order=order).select_related("product")
            order_data = {
                "id": order.id,
                "created_at": order.created_at,
                "total": str(order.total),
                "is_paid": order.is_paid,
                "items": [
                    {
                        "product": {
                            "id": item.product.id,
                            "name": item.product.name,
                            "image": request.build_absolute_uri(item.product.image.url) if item.product.image else ''
                        },
                        "quantity": item.quantity,
                        "price": str(item.price)
                    }
                    for item in items
                ]
            }
            response.append(order_data)

        return JsonResponse(response, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
