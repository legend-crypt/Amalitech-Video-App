from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from core.serializers import VideoSerializer
from core.models import Video
from django.shortcuts import get_object_or_404
from core.serializers import VideoSerializer
from core.utils import get_user_from_jwttoken


class VideoViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticatedOrReadOnly]
    def list(self, request):
        queryset = Video.objects.all()
        serializer = VideoSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user = get_user_from_jwttoken(request)
        if user.is_superuser:
            video_serializer = VideoSerializer(data=request.data)
            if video_serializer.is_valid():
                video_serializer.save()
                return Response('Video uploaded successfully', status=status.HTTP_201_CREATED)
        return Response(video_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        queryset = Video.objects.all()
        video = get_object_or_404(queryset, pk=pk)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        permission_classes = [IsAdminUser, IsAuthenticated]
        video = Video.objects.get(pk=pk)
        serializer = VideoSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        video = Video.objects.get(pk=pk)
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)