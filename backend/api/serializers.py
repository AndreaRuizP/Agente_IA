from rest_framework import serializers

from .models import (
    Categoria,
    Producto,
    Pedido,
    DetallePedido
)


class CategoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = '__all__'


class DetallePedidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetallePedido
        fields = ['producto', 'cantidad']


class PedidoSerializer(serializers.ModelSerializer):

    detalles = DetallePedidoSerializer(
        many=True
    )

    class Meta:
        model = Pedido
        fields = ['id', 'cliente', 'total', 'estado', 'detalles']

    def create(self, validated_data):

        detalles_data = validated_data.pop('detalles')

        pedido = Pedido.objects.create(
            cliente=validated_data['cliente']
        )

        total = 0

        for detalle in detalles_data:

            producto = Producto.objects.get(
                id=detalle['producto'].id
            )

            cantidad = detalle['cantidad']

            subtotal = producto.precio * cantidad

            total += subtotal

            DetallePedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=cantidad,
                subtotal=subtotal
            )

        pedido.total = total
        pedido.save()

        return pedido