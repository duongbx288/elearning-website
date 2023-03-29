from django.urls import path

from . import views

app_name = 'affiliates'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:affiliate_id>/', views.detail, name='detail'),
    path('<int:affiliate_id>/results/', views.results, name='results'),
    path('<int:affiliate_id>/vote/', views.vote, name='vote'),
    path('<int:affiliate_id>/testing1/', views.test_button1, name='button1'),
    path('<int:affiliate_id>/testing2/', views.test_button2, name='button2'),
    path('teachers/', views.get_queryset, name='teacher'),
    path('teachers/<int:teacher_id>/', views.get_byId, name='teacher_id')
]
