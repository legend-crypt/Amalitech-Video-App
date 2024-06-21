from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from rest_framework import status
# from django.contrib.auth.models import User
from django.urls import reverse
from core.models import Video
from core.serializers import VideoSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import os
User = get_user_model()


class VideoViewSetTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='testpassword', is_superuser=True)
        self.client.force_authenticate(user=self.user)
        refresh = RefreshToken.for_user(self.user)
        self.jwt_token = str(refresh.access_token)
        self.video_path = '/home/konadulordkweku/Amalitech/Outro.mp4'
        self.thumbnail_path = '/home/konadulordkweku/Amalitech/logo_1.png'
        assert os.path.exists(self.video_path), f"{self.video_path} does not exist"
        assert os.path.exists(self.thumbnail_path), f"{self.thumbnail_path} does not exist"

        # self.video_data = {
        #     'title': 'Test Video',
        #     'description': 'This is a test video',
        #     'video': 'http://example.com/testvideo.mp4',
        #     'thumbnail': 'http://example.com/testvideo.jpg',
        # }
        self.invalid_video_data = {
            'title': '',  # Invalid data to trigger validation error
            'description': 'This is an invalid video',
            'video': 'http://example.com/testvideo.mp4',
            'thumbnail': 'http://example.com/testvideo.jpg',
        }
        self.video = Video.objects.create(title='Existing Video', description='This is an existing video', video='http://example.com/existingvideo.mp4')

    def test_list_videos(self):

        url = reverse('videos')
        # Replace 'video-list' with your actual URL name if different
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming there's only one existing video in setUp

    def test_create_video(self):
        url = reverse('videos')  # Replace 'video-list' with your actual URL name if different
        with open(self.video_path, 'rb') as video_file, open(self.thumbnail_path, 'rb') as thumbnail_file:
            data = {
                'title': 'Second video',
                'description': 'I am posting my second video',
                'video': SimpleUploadedFile('video.webm', video_file.read(), content_type='video/webm'),
                'thumbnail': SimpleUploadedFile('thumbnail.png', thumbnail_file.read(), content_type='image/png'),
            }
            response = self.client.post(url, data, format='multipart', HTTP_AUTHORIZATION=f'Bearer {self.jwt_token}')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_video_invalid_data(self):
        url = reverse('videos')  # Replace 'video-list' with your actual URL name if different
        response = self.client.post(url, self.invalid_video_data, format='json', HTTP_AUTHORIZATION=f'Bearer {self.jwt_token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_video(self):
        url = reverse('video-detail', args=[self.video.video_id])  # Replace 'video-detail' with your actual URL name if different
        response = self.client.get(url)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.video.title)