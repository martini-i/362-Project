from rest_framework import generics
from rest_framework.permissions import AllowAny   # temp: everyone can GET
from .models import Product
from .serializers import ProductSerializer

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]    # swap out later
