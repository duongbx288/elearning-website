import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_selection import r_regression
from scipy import sparse


class CF(object):
    """
    class Collaborative Filtering, hệ thống đề xuất dựa trên sự tương đồng
    giữa các users với nhau, giữa các items với nhau
    """
    def __init__(self, data_matrix, k, dist_func=cosine_similarity, uuCF=1):
        """
        Khởi tạo CF với các tham số đầu vào:
            data_matrix: ma trận Utility, gồm 3 cột, mỗi cột gồm 3 số liệu: user_id, item_id, rating.
            k: số lượng láng giềng lựa chọn để dự đoán rating.
            uuCF: Nếu sử dụng uuCF thì uuCF = 1 , ngược lại uuCF = 0. Tham số nhận giá trị mặc định là 1.
            dist_f: Hàm khoảng cách, ở đây sử dụng hàm cosine_similarity của klearn.
            limit: Số lượng items gợi ý cho mỗi user. Mặc định bằng 10.
        """
        self.uuCF = uuCF  # user-user (1) or item-item (0) CF
        self.Y_data = data_matrix if uuCF else data_matrix[:, [1, 0, 2]]
        self.k = k
        self.dist_func = dist_func
        self.r_regression = r_regression
        self.Ybar_data = None
        # số lượng user và item, +1 vì mảng bắt đầu từ 0
        self.n_users = int(np.max(self.Y_data[:, 0])) + 1
        self.n_items = int(np.max(self.Y_data[:, 1])) + 1

    def add(self, new_data):
        """
        Cập nhật Y_data khi có lượt rating mới.
        """
        self.Y_data = np.concatenate((self.Y_data, new_data), axis=0)

    def normalize_matrix(self):
        """
        Tính similarity giữa các items bằng cách tính trung bình cộng ratings giữa các items.
        Sau đó thực hiện chuẩn hóa bằng cách trừ các ratings đã biết của item cho trung bình cộng
        ratings tương ứng của item đó, đồng thời thay các ratings chưa biết bằng 0.
        """
        users = self.Y_data[:, 0] # ở đây Y_data là thông tin ratings
        # print('ndarray: ',users)
        self.Ybar_data = self.Y_data.copy() # copy thông tin ratings (format: user_id, item_id, ratings)
        self.mu = np.zeros((self.n_users,)) 
        for n in range(self.n_users): # n_users là số lượng người dùng đã đánh gía
            ids = np.where(users == n)[0].astype(np.int32)
            item_ids = self.Y_data[ids, 1]
            ratings = self.Y_data[ids, 2] # lấy thông tin rating của users
            m = np.mean(ratings) # tính trung bình cộng ratings 
            if np.isnan(m):
                m = 0  # để tránh mảng trống và nan value
            self.mu[n] = m
            self.Ybar_data[ids, 2] = ratings - self.mu[n] # chuẩn hóa (thay đổi cột ratings ở thông tin ratings)
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
                                       (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users)) # ma trận sau khi chuẩn hóa
        self.Ybar = self.Ybar.tocsr() # thu gọn ma trận (bỏ các cột & hàng có value = 0) để tính toán nhanh hơn

    def similarity(self):
        """
        Tính độ tương đồng giữa các user và các item
        """
        eps = 1e-6
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)
        
        # self.S = self.r_regression(self.Ybar.T, self.Ybar.T) # tạo ma trận similarity giữa người dùng
        # print(self.S)

    def refresh(self):
        """
        Chuẩn hóa dữ liệu và tính toán lại ma trận similarity. (sau khi một số xếp hạng được thêm vào).
        """
        self.normalize_matrix()
        self.similarity()

    def fit(self):
        self.refresh()

    def __pred(self, u, i, normalized=1):
        """
        Dự đoán ra ratings của các users với mỗi items.
        """
        # tìm tất cả user đã rate item i
        ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32) # lấy thông tin đánh giá item i
        users_rated_i = (self.Y_data[ids, 0]).astype(np.int32) # lấy user đã đánh giá sản phẩm i 
        sim = self.S[u, users_rated_i] # lấy thông tin similarity của user đc xét với các user đã đánh giá i (S ở đây là ma trận similarity)
        a = np.argsort(sim)[-self.k:] # trả về thứ tự của những user đã đánh giá item i giống nhất với user được xét đến 
        nearest_s = sim[a] # 
        r = self.Ybar[i, users_rated_i[a]]
        if normalized:
            # cộng với 1e-8, để tránh chia cho 0
            return (r * nearest_s)[0] / (np.abs(nearest_s).sum() + 1e-8)

        return (r * nearest_s)[0] / (np.abs(nearest_s).sum() + 1e-8) + self.mu[u] # mu[u] ở đây là giá trị ratings trung bình của người dùng u

    def pred(self, u, i, normalized=1):
        """
        Xét xem phương pháp cần áp dùng là uuCF hay iiCF
        """
        if self.uuCF: return self.__pred(u, i, normalized)
        return self.__pred(i, u, normalized)

    def print_list_item(self):
        for i in range(self.n_items):
            print(i)

    def recommend(self, u):
        """
        Determine all items should be recommended for user u.
        The decision is made based on all i such that:
        self.pred(u, i) > 0. Suppose we are considering items which
        have not been rated by u yet.
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        recommended_items = []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                if rating > 0:
                    recommended_items.append(i)

        return recommended_items

    def recommend_top(self, u, top_x):
        """
        Determine top 10 items should be recommended for user u.
        . Suppose we are considering items which
        have not been rated by u yet.
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        item = {'id': None, 'similar': None, 'rating_possible': None}
        list_items = []

        def take_similar(elem):
            return elem['similar']

        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                item['id'] = i
                item['similar'] = rating
                item['rating_possible'] = rating
                list_items.append(item.copy())

        sorted_items = sorted(list_items, key=take_similar, reverse=True)[:top_x]
        # sorted_items.pop(top_x)
        return sorted_items

    def print_recommendation(self):
        """
        print all items which should be recommended for each user
        """
        print('Recommendation: ')
        for u in range(self.n_users):
            recommended_items = self.recommend(u)
            if self.uuCF:
                print('Recommend item(s):', recommended_items, 'for user', u)
            else:
                print('Recommend item', u, 'for user(s) : ', recommended_items)
                

