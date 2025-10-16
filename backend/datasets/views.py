from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
import pandas as pd
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

    # 👇 Nouvelle action personnalisée
    @action(detail=True, methods=["get"])
    def preview(self, request, pk=None):
        """
        Retourne les 10 premières lignes du CSV pour un aperçu rapide
        """
        try:
            dataset = self.get_object()
            df = pd.read_csv(dataset.file.path)
            preview = df.head(10).to_dict(orient="records")
            return Response({
                "columns": list(df.columns),
                "rows": preview
            })
        except Exception as e:
            return Response({"error": str(e)}, status=400)
