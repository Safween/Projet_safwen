# Generated by Django 5.0.6 on 2024-05-25 01:05

import datetime
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='John Doe', max_length=255)),
                ('age', models.IntegerField(default=0)),
                ('gender', models.CharField(default='Unknown', max_length=10)),
                ('contact', models.CharField(default='000-000-0000', max_length=255)),
                ('birth_date', models.DateField(default=datetime.date(2000, 1, 1))),
                ('address', models.TextField(default='Unknown Address')),
                ('insurance', models.CharField(default='Unknown Insurance', max_length=255)),
                ('social_id', models.CharField(default=uuid.uuid4, max_length=255, unique=True)),
                ('email', models.EmailField(default='example@example.com', max_length=254)),
                ('emergency_contact', models.CharField(default='000-000-0000', max_length=255)),
                ('medical_history', models.TextField(blank=True, default='No medical history')),
                ('weight', models.FloatField(default=0.0)),
                ('height', models.FloatField(default=0.0)),
                ('bmi', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Examination',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exam_type', models.CharField(default='General Examination', max_length=255)),
                ('appointment_date', models.DateField(default=datetime.date(2000, 1, 1))),
                ('appointment_time', models.TimeField(default=datetime.time(9, 0))),
                ('room', models.CharField(default='Room 1', max_length=255)),
                ('technician_name', models.CharField(default='Unknown Technician', max_length=255)),
                ('technician_id', models.CharField(default='0000', max_length=255)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ris_app.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Billing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('currency', models.CharField(default='DT', max_length=10)),
                ('payment_method', models.CharField(choices=[('Cash', 'Cash'), ('Card', 'Card'), ('Other', 'Other')], default='Cash', max_length=50)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Paid', 'Paid'), ('Overdue', 'Overdue')], default='Pending', max_length=20)),
                ('due_date', models.DateField()),
                ('notes', models.TextField(blank=True, default='')),
                ('examination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ris_app.examination')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ris_app.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('examination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ris_app.examination')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('description', models.CharField(blank=True, default='', max_length=255)),
                ('result', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='ris_app.result')),
            ],
        ),
    ]
