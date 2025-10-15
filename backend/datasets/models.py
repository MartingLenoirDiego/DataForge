from django.db import models
from django.conf import settings

class Dataset(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='datasets'
    )
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='datasets/')
    cleaned_file = models.FileField(upload_to='cleaned/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"
