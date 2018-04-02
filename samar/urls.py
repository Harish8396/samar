from django.conf.urls import url

from . import views

app_name = 'samar'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^upload/', views.upload, name='upload'),
    url(r'^get_latest/', views.get_latest, name='get_latest'),
    url(r'^set_latest/', views.set_latest, name='set_latest'),
]