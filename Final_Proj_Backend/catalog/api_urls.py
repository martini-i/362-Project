from django.urls import path
from .api_views import (
    ProductList,
    CartView,
    AddToCartView,
    RemoveFromCartView,
    CheckoutView
)

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('cart/', CartView.as_view(), name='view-cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
]
