from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from core.serializers import VideoSerializer
from core.models import Video
from django.shortcuts import get_object_or_404


class VideoViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [IsAuthenticatedOrReadOnly]
        else:
            permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def list(self, request):
        queryset = Video.objects.all()
        serializer = VideoSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        title = request.data['title']
        description = request.data['description']
        video = request.FILES.get('video')
        thumbnail = request.FILES.get('thumbnail')
        video = Video.objects.create(title=title, description=description, video=video, thumbnail=thumbnail)
        if video:
            return Response('Video uploaded successfully', status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
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