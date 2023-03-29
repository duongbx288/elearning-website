from django.contrib import admin

# Register your models here.
from .models import Affiliate, Student, Course, Teacher, CourseRating

admin.site.register(Affiliate)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(CourseRating)
admin.site.register(Teacher)