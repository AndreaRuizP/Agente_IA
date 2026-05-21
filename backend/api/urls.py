from django.urls import path
from .views import (home, productos, crear_pedido, chat_ia)

urlpatterns = [
    path('', home),
    path('productos/', productos),
    path('pedidos/', crear_pedido,),
    path('chat/', chat_ia),
]