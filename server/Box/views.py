from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pitch
from .serializers import PitchSerializer
from django.http import Http404

class PitchDetailView(APIView):

    def get(self, request, pk=None):
        if pk:
            try:
                pitch = Pitch.objects.get(pk=pk)
                serializer = PitchSerializer(pitch)
            except Pitch.DoesNotExist:
                raise Http404("Pitch not found")
        else:
            pitches = Pitch.objects.all()
            serializer = PitchSerializer(pitches, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PitchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            pitch = Pitch.objects.get(pk=pk)
        except Pitch.DoesNotExist:
            raise Http404("Pitch not found")
        
        pitch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
