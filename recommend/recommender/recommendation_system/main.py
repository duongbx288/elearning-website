# import gui_package.gui
from .gui_package import gui
from .recommend_system_package import contented_base, collab_filtering
from .function_package import read_data_function
import pandas as pd
import numpy as np

if __name__ == "__main__":
    # Test
    r_cols = ['user_id', 'movie_id', 'rating', 'unix_timestamp']

    ratings_base = pd.read_csv('dataset/ml-100k/ub.base', sep='\t', names=r_cols, encoding='latin-1')
    ratings_test = pd.read_csv('dataset/ml-100k/ub.test', sep='\t', names=r_cols, encoding='latin-1')

    rate_train = ratings_base.to_numpy()
    rate_test = ratings_test.to_numpy() 

    # indices start from 0
    rate_train[:, :2] -= 1
    rate_test[:, :2] -= 1

    
    rs = collab_filtering.CF(rate_train, k = 30, uuCF = 1)
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
    

def try_recommend():
    # GUI: lay thong tin movie de suggest toi nguoi dung
    data_matrix = read_data_function.get_dataframe_ratings_base('dataset/ml-100k/ub.base')
    cf_rs = collab_filtering.CF(data_matrix, k=2, uuCF=1)
    cf_rs.fit()

    cb_rs = contented_base.CB('dataset/movilens_csv/movies.csv')
    cb_rs.fit()

    list_name_movie = read_data_function.get_name_movie('dataset/ml-100k/u.item')
    list_year_movie = read_data_function.get_year_movie('dataset/ml-100k/u.item')
    gui.main(cf_rs, cb_rs, list_name_movie, list_year_movie)