# Elearning - website
Website mua và học khóa học, có áp dụng affiliate marketing.
Có các chức năng chính: mua, tạo khóa học, tạo mã khuyến mại, gợi ý khóa học dựa trên Collaborative Filtering (Chưa hoàn thiện),v.v.

Project gồm các thư mục chính: backend, frontend, recommend
File cơ sở dữ liệu: e_learn.sql 

Yêu cầu cài đặt:
- backend: maven, Java 11 (Với IDE là Intellij, không yêu cầu cài đặt maven do đã được tích hợp sẵn) 
- frontend: npm package (Cài đặt NodeJs)
- recommend: python3, pandas, sklearn, django
- MySQL

Chạy project:
- backend: mvn clean install
- fronent: npm i
           npm start
- recommend: python manage.py runserver