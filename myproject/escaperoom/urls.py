from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('game/', views.game, name='game'),
    path('store_score/', views.store_score, name='store_score'),
    path('finish/', views.finish, name='finish'),
]