from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
        
    class Meta:
        model = Product
        fields = '__all__'
        
class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True) 
    product_image = serializers.imageField(source='product.image,read_only=True')
    class Meta:
        model = CartItem
        fields = __all__   