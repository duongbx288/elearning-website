from django.urls import path

from . import views

app_name='recommender'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:user_id>', views.index, name='index'),
    # path('get_recommend', views.get_item, name='get_item')
    path('test', views.testing, name='testing'),
    path('get-course/<int:user_id>', views.getCourse, name='get_course')
]