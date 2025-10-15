from rest_framework import viewsets, permissions
from .models import Dataset
from .serializers import DatasetSerializer
from .tasks import clean_dataset

class DatasetViewSet(viewsets.ModelViewSet):
    serializer_class = DatasetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dataset.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        dataset = serializer.save(user=self.request.user)
        # lancer le nettoyage en tâche asynchrone
        clean_dataset.delay(dataset.id)
