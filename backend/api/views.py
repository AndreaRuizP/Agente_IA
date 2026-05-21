import json
import requests

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Producto
from .serializers import (
    ProductoSerializer,
    PedidoSerializer
)


@api_view(['GET'])
def home(request):

    return Response({
        "mensaje": "API funcionando correctamente"
    })


@api_view(['GET'])
def productos(request):

    productos = Producto.objects.all()

    serializer = ProductoSerializer(
        productos,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def crear_pedido(request):

    serializer = PedidoSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def chat_ia(request):

    mensaje = request.data.get('mensaje')

    productos = Producto.objects.all()

    menu = ""

    for producto in productos:

        menu += f"""
        Nombre: {producto.nombre}
        Precio: {producto.precio}
        Descripción: {producto.descripcion}
        """

    prompt = f"""
    Eres un vendedor experto y asistente virtual
    de un restaurante de comidas rápidas.

    Tu trabajo es atender clientes y ayudarlos
    a pedir comida rápidamente.

    REGLAS IMPORTANTES:

    - SIEMPRE debes responder como vendedor.
    - NUNCA digas que no puedes recomendar productos.
    - NUNCA pidas contexto innecesario.
    - Debes detectar productos mencionados.
    - Debes responder corto y amable.
    - Usa emojis ocasionalmente.

    MENÚ DISPONIBLE:

    {menu}

    CLIENTE:
    {mensaje}
    """

    response = requests.post(

        "http://localhost:11434/api/generate",

        json={
            "model": "gemma:2b",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()

    texto = data["response"]

    try:

        resultado = json.loads(texto)

    except:

        resultado = {
            "mensaje": texto,
            "productos": []
        }

    productos_detectados = []

    for nombre in resultado["productos"]:

        producto = Producto.objects.filter(
            nombre__icontains=nombre
        ).first()

        if producto:

            productos_detectados.append({
                "id": producto.id,
                "nombre": producto.nombre,
                "precio": producto.precio
            })

    return Response({

        "mensaje": resultado["mensaje"],

        "productos": productos_detectados
    })