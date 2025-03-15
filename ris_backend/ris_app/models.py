from django.db import models
import datetime
import uuid

class Patient(models.Model):
    name = models.CharField(max_length=255, default="John Doe")
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, default="Unknown")
    contact = models.CharField(max_length=255, default="000-000-0000")
    birth_date = models.DateField(default=datetime.date(2000, 1, 1))
    address = models.TextField(default="Unknown Address")
    insurance = models.CharField(max_length=255, default="Unknown Insurance")
    social_id = models.CharField(max_length=255, unique=True, default=uuid.uuid4)
    email = models.EmailField(default="example@example.com")
    emergency_contact = models.CharField(max_length=255, default="000-000-0000")
    medical_history = models.TextField(blank=True, default="No medical history")
    weight = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    bmi = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

class Examination(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    exam_type = models.CharField(max_length=255, default="General Examination")
    appointment_date = models.DateField(default=datetime.date(2000, 1, 1))
    appointment_time = models.TimeField(default=datetime.time(9, 0))
    room = models.CharField(max_length=255, default="Room 1")
    technician_name = models.CharField(max_length=255, default="Unknown Technician")
    technician_id = models.CharField(max_length=255, default="0000")

    def __str__(self):
        return f"{self.exam_type} for {self.patient.name} on {self.appointment_date}"

class Result(models.Model):
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result for {self.examination} on {self.created_at}"

class Image(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255, blank=True, default="")

    def __str__(self):
        return f"Image for {self.result} - {self.description}"

class Billing(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="DT")
    payment_method = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    due_date = models.DateField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Billing for {self.patient.name} - {self.examination.exam_type}"
