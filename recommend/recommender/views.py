
import pandas as pd
import numpy as np
from .recommendation_system.recommend_system_package import collab_filtering
from .recommendation_system.function_package import read_data_function
from django.http import HttpResponse, JsonResponse
from django.template import loader
import json
from .apps import RecommenderConfig
from .models import CourseRating, Course
import os
# Create your views here.
from rest_framework import status
from django.http import HttpResponse

def index(request, user_id = 'None'):
    user = 0
    createCSV()
    recommended = []
    template = loader.get_template('recommender/index.html')
    if (request.method == 'POST'):
        user = request.POST['user-id']
    if (user != 0 and user.isdigit()):
            # recommended = get_recommend(user)
            recommended = RecommenderConfig.cf_rs.recommend_top(int(user), 5)

    context = {
        'recommend': recommended,
        'user': user
    }
    # print(recommended)
    # jsonRes = json.dumps(recommended)
    # print(jsonRes)
    return HttpResponse(template.render(context, request))

def getCourse(self, user_id = 0):
    createCSV()
    recommended = []
    if (user_id != 0):
        recommended = RecommenderConfig.cf_rs.recommend(int(user_id))
        
    context = {
        'recommend': recommended,
        'user': user_id
    }
    jsonResponse = json.dumps(context)
    return JsonResponse(context, status=status.HTTP_200_OK, safe=False)

def testing(self):
    courses = Course.objects.all()[:5]
    for item in courses:
        print(item.name)
        print(item.description)
    return HttpResponse('ok')

def get_recommend(user_id):
    data_matrix = read_data_function.get_dataframe_ratings_base("recommender/recommendation_system/dataset/ml-100k/ub.base")
    cf_rs = collab_filtering.CF(data_matrix, k=2, uuCF=1)
    cf_rs.fit()
    
    # cb_rs = contented_base.CB('recommender/recommendation_system/dataset/movilens_csv/movies.csv')
    # cb_rs.fit()
    
    list_name_movie = read_data_function.get_name_movie('recommender/recommendation_system/dataset/ml-100k/u.item')
    list_year_movie = read_data_function.get_year_movie('recommender/recommendation_system/dataset/ml-100k/u.item')
    
    list_movies = []
    
    list_movies = cf_rs.recommend_top(int(user_id), 10)
    for item in list_movies:
        item['name'] = list_name_movie[item['id']]
        item['year'] = list_year_movie[item['id']]
    # item.name = list_name_movie[getattr(item, 'id')]
        
    return list_movies

# def getPredict(request, user_id)


def createCSV():  
    ratings = CourseRating.objects.all()
    list = [[item.student_id,item.course_id,item.value] for item in ratings]
    
    courses = Course.objects.all()
    listCourse = [[item.id, item.name] for item in courses]
    cwd = os.getcwd()
    pathR = cwd + "/recommender/course_data/rating.csv"
    pathC = cwd + "/recommender/course_data/course.csv"
    dfR = pd.DataFrame(list)
    dfC = pd.DataFrame(listCourse)
    dfR.to_csv(pathR, index=False, header=False)
    dfC.to_csv(pathC, index=False, header=False, encoding="utf-8")
    
def test_cf():
    r_cols = ['user_id', 'movie_id', 'rating', 'unix_timestamp']

    ratings_base = pd.read_csv('recommender/recommendation_system/dataset/ml-100k/ub.base', sep='\t', names=r_cols, encoding='latin-1')
    ratings_test = pd.read_csv('recommender/recommendation_system/dataset/ml-100k/ub.test', sep='\t', names=r_cols, encoding='latin-1')
    rate_train = ratings_base.to_numpy()
    rate_test = ratings_test.to_numpy()

    # indices start from 0
    rate_train[:, :2] -= 1
    rate_test[:, :2] -= 1
    
    rs = collab_filtering.CF(rate_train, k = 24, uuCF = 1)
    rs.fit()
    
    n_tests = rate_test.shape[0]
    SE = 0 # squared error
    for n in range(n_tests):
        pred = rs.pred(rate_test[n, 0], rate_test[n, 1], normalized = 0)
        SE += (pred - rate_test[n, 2])**2 

    RMSE = np.sqrt(SE/n_tests)
    print('User-user CF, RMSE =', RMSE)
    
    rs1 = collab_filtering.CF(rate_train, k = 30, uuCF = 0)
    rs1.fit()

    n_tests = rate_test.shape[0]
    SE = 0 # squared error
    for n in range(n_tests):
        pred = rs1.pred(rate_test[n, 0], rate_test[n, 1], normalized = 0)
        SE += (pred - rate_test[n, 2])**2 

    RMSE = np.sqrt(SE/n_tests)
    print('Item-item CF, RMSE =', RMSE)