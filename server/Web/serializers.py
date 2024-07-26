from rest_framework import serializers
from .models import *

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = '__all__' 

class ScriptExecutionSerializer(serializers.ModelSerializer):
    script = ScriptSerializer()  # 使用 ScriptSerializer 來序列化 script

    class Meta:
        model = ScriptExecution
        fields = '__all__'  # 或者指定你想要的字段