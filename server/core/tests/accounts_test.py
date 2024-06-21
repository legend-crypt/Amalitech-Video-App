from django.test import TestCase

from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from unittest.mock import patch

UserAccount = get_user_model()

class AccountCreationViewSetTest(APITestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')  # Ensure this matches your URL name

    def test_create_account_missing_fields(self):
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, "Please provide both email and password")

    def test_create_account_email_exists(self):
        UserAccount.objects.create_user(email='test@example.com', password='testpassword')
        data = {'email': 'test@example.com', 'password': 'newpassword'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_208_ALREADY_REPORTED)
        self.assertEqual(response.data, "Email already exists")