from rest_framework import serializers
from .models import Patient, Examination, Result, Image, Billing

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class ExaminationSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    technician_name = serializers.CharField(read_only=True)

    class Meta:
        model = Examination
        fields = ['id', 'patient', 'patient_name', 'exam_type', 'appointment_date', 'appointment_time', 'room', 'technician_name', 'technician_id']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'description']

class ResultSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    examination_details = serializers.CharField(source='examination.__str__', read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'examination', 'examination_details', 'description', 'created_at', 'images']

class ResultCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'examination', 'description']

class ImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'result', 'image', 'description']

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = '__all__'
