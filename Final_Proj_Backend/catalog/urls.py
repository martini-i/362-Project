from django.urls import path
from . import views

urlpatterns = [
    # User auth
    path('register/', views.signup_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/<int:user_id>/', views.user_profile, name='profile'),

    # Products
    path('products/', views.product_list, name='product_list'),
    path('products/<int:product_id>/', views.product_detail, name='product_detail'),

    # Cart
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('cart/<int:user_id>/', views.get_cart, name='get_cart'),
    path('remove-from-cart/', views.remove_from_cart, name='remove_from_cart'),

    # Checkout and Orders
    path('checkout/', views.checkout, name='checkout'),
    path('orders/<int:user_id>/', views.order_history, name='order_history'),
]
