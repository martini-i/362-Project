from rest_framework import generics
from rest_framework.permissions import AllowAny   # temp: everyone can GET
from .models import Product
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Product, Cart, CartItem, Order, OrderItem, UserProfile
from .serializers import (
    ProductSerializer,
    CartSerializer,
    OrderSerializer,
    UserProfileSerializer
)

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]    # swap out later

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        item.quantity += quantity
        item.save()
        return Response({'message': 'Product added to cart'})

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'error': 'Cart not found'}, status=404)

        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return Response({'message': 'Product removed from cart'})

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        order = Order.objects.create(user=request.user, total=cart.total_price())
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        cart.items.all().delete()  # clear cart
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response({
            'email': request.user.email,
            'bio': serializer.data.get('bio'),
            'phone': serializer.data.get('phone'),
        })

    def post(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        profile.bio = request.data.get('bio', profile.bio)
        profile.phone = request.data.get('phone', profile.phone)
        profile.save()

        request.user.email = request.data.get('email', request.user.email)
        request.user.save()

        return Response({'message': 'Profile updated'})
