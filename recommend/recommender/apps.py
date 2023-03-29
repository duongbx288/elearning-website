from django.apps import AppConfig
from .recommendation_system.recommend_system_package import collab_filtering
from .recommendation_system.function_package import read_data_function

class RecommenderConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recommender'
    data_matrix = read_data_function.get_dataframe_ratings_base("recommender/course_data/rating.csv")
    cf_rs = collab_filtering.CF(data_matrix, k=2, uuCF=1)
    cf_rs.fit()