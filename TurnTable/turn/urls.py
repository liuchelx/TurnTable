from django.urls import path
import django.conf.urls 
from . import views
# from django.views.decorators.csrf import csrf_exempt


app_name = 'turn'
urlpatterns = [
    path('', views.index, name='index'),
    path('draw',views.draw, name = 'draw'),
    path('rotate',views.rotate, name = 'rotate'),
    path('no_prize',views.no_prize, name ='no_prize'),
    path('exist',views.exist, name = 'exist'),
    
]
