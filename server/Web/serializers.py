from rest_framework import serializers
from .models import Script, ScriptExecution, ScriptCommand

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = '__all__'


class ScriptExecutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScriptExecution
        fields = '__all__'
        read_only_fields = ('script',)


class ScriptCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScriptCommand
        fields = '__all__'
        read_only_fields = ('execution', 'executed_at')
