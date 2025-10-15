from celery import shared_task
import pandas as pd
from .models import Dataset

@shared_task
def clean_dataset(dataset_id):
    dataset = Dataset.objects.get(id=dataset_id)
    df = pd.read_csv(dataset.file.path)
    df = df.dropna()  # suppression des N.A.
    cleaned_path = dataset.file.path.replace('.csv', '_clean.csv')
    df.to_csv(cleaned_path, index=False)
    dataset.cleaned_file.name = cleaned_path.split('media/')[-1]
    dataset.save()
