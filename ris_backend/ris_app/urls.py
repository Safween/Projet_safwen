from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, ExaminationViewSet, ResultViewSet, ImageViewSet, BillingViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'examinations', ExaminationViewSet)
router.register(r'results', ResultViewSet)
router.register(r'images', ImageViewSet)
router.register(r'billings', BillingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
