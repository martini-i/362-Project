from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.signup_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/<int:user_id>/', views.user_profile, name='profile'),
    path('products/', views.product_list),
    path('products/<int:product_id>/', views.product_detail),
    path('add-to-cart/', views.add_to_cart),
    path('cart/<int:user_id>/', views.get_cart),
    path('remove-from-cart/', views.remove_from_cart),
    path('checkout/', views.checkout),
    path('orders/<int:user_id>/', views.order_history),
]
