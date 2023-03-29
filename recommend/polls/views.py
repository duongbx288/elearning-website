from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from .models import Affiliate, Teacher
from django.urls import reverse
from django.http import Http404
from django.template import loader
from django.shortcuts import render
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
# Create your views here.

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import TeacherSerializer


def index(request):
    test_order = Affiliate.objects.order_by('id')[:5]
    template = loader.get_template('affiliate/index.html')
    context = {
        'test_order': test_order,
    }
    return HttpResponse(template.render(context, request))

# -> This example use render()
# def index(request):
#     test_order = Affiliate.objects.order_by('id')[:5]
#     context = {
#         'test_order': test_order,
#     }
#     return render(request, 'affiliate/index.html', context)


def detail(request, affiliate_id):
    try:
        affiliate = Affiliate.objects.get(pk=affiliate_id)
        affiliates = Affiliate.objects.order_by('id')[:15]
    except Affiliate.DoesNotExist:
        raise Http404("Affiliate does not exist")
    return render(request, 'affiliate/detail.html', {'affiliate': affiliate, 'affiliates': affiliates})

# -> short cut using get_object_or_404()
# def detail(request, question_id):
#     question = get_object_or_404(Affiliate, pk=affiliate_id)
#     return render(request, 'affiliate/detail.html', {'affiliate': affiliate})


def results(request, affiliate_id):
    response = "You're looking at the results of affiliate %s."
    affiliate = get_object_or_404(Affiliate, pk=affiliate_id)
    return render(request, 'affiliate/results.html', {'affiliate': affiliate})

def test_button1(request, affiliate_id):
    print(request)
    affiliate = get_object_or_404(Affiliate, pk=affiliate_id)
    testing = 'Haha get rekt'
    return render(request, 'affiliate/detail.html', {
        'affiliate': affiliate,
        'testing': testing
    })

def test_button2(request, affiliate_id):
    print(request)
    affiliate = get_object_or_404(Affiliate, pk=affiliate_id)
    return render(request, 'affiliate/detail.html', {
        'affiliate': affiliate,
    })

def vote(request, affiliate_id):
    affiliate = get_object_or_404(Affiliate, pk=affiliate_id)
    
    if (request.method == 'POST'):
        new_status = request.POST['status']
        
    try:
        affiliate.status = new_status
    except (KeyError):
        # Redisplay the question voting form.
        return render(request, 'affiliate/detail.html', {
            'affiliate': affiliate,
            'error_message': "You didn't select a choice.",
        })
    else:
        print(affiliate)
        affiliate.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('affiliates:results', args=(affiliate.id,)))

# teacher API -- example

def get_byId(request, teacher_id):
    teacher = Teacher.objects.get(pk=teacher_id).toJSON()
    return JsonResponse(json.loads(teacher), status=status.HTTP_200_OK, safe=False)

def get_queryset(self):
    teacher = Teacher.objects.order_by('id')[:5]
    # difference at the .values()
    teacher1 = list(Teacher.objects.order_by('id')[:5].values()) 
    # return JsonResponse(serializers.serialize('json', teacher), status=status.HTTP_200_OK, safe=False)
    return JsonResponse(teacher1, status=status.HTTP_200_OK, safe=False)
    

class ListTeacherView(ListCreateAPIView):
    model = Teacher
    serializer_class = TeacherSerializer

    def get_queryset(self):
        return Teacher.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = TeacherSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new teacher account successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new teacher account unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)
