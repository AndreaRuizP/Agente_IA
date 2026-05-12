from django.urls import path
from .views import home, productos

urlpatterns = [
    path('', home),
    path('productos/', productos),
]