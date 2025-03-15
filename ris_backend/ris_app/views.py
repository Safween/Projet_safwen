from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Patient, Examination, Result, Image, Billing
from .serializers import PatientSerializer, ExaminationSerializer, ResultSerializer, ResultCreateSerializer, ImageSerializer, ImageCreateSerializer, BillingSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class ExaminationViewSet(viewsets.ModelViewSet):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def create(self, request, *args, **kwargs):
        result_serializer = ResultCreateSerializer(data=request.data)
        result_serializer.is_valid(raise_exception=True)
        result = result_serializer.save()

        images_data = request.FILES.getlist('images')
        for image_data in images_data:
            Image.objects.create(result=result, image=image_data)

        return Response(result_serializer.data, status=status.HTTP_201_CREATED)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
