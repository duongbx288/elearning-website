# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
import datetime
from django.db import models
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.core.serializers import serialize

def checkNone(word):
    if (word is None):
        return ""
    else:
        return word

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Teacher):
            return str(obj)
        return super().default(obj)

class Affiliate(models.Model):
    id = models.IntegerField(primary_key=True)
    affiliate_code = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    avatar = models.CharField(max_length=500, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.BigIntegerField(blank=True, null=True)
    facebook = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'affiliate'

    def __str__(self):
        return 'name: ' + self.name + ' ,status: ' + checkNone(self.status)


class BannerMapping(models.Model):
    id = models.IntegerField(primary_key=True)
    banner = models.ForeignKey('Banners', models.DO_NOTHING)
    section_id = models.IntegerField()
    page_id = models.IntegerField(blank=True, null=True)
    time_hide = models.IntegerField(blank=True, null=True)
    number_hide = models.IntegerField(blank=True, null=True)
    position = models.CharField(max_length=20, blank=True, null=True)
    position_type = models.CharField(max_length=20, blank=True, null=True)
    position_value = models.CharField(max_length=10, blank=True, null=True)
    percentage = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banner_mapping'


class Banners(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(unique=True, max_length=50)
    title = models.CharField(max_length=255)
    img_url = models.TextField()
    url = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=255)
    pop_up = models.SmallIntegerField(blank=True, null=True)
    modal = models.SmallIntegerField(blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField()
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banners'


class Comments(models.Model):
    id = models.IntegerField(primary_key=True)
    lesson = models.ForeignKey(
        'Lesson', models.DO_NOTHING, blank=True, null=True)
    course = models.ForeignKey(
        'Course', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'


class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    teacher = models.ForeignKey(
        'Teacher', models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    introduction = models.CharField(max_length=500, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    type_id = models.IntegerField(blank=True, null=True)
    cover = models.CharField(max_length=100, blank=True, null=True)
    link = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course'


class CourseRating(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(
        Course, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    value = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course_rating'


class Lesson(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(
        Course, models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    video_link = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=1000, blank=True, null=True)
    introduction = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    lesson_num = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lesson'


class LessonInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    lesson = models.ForeignKey(
        Lesson, models.DO_NOTHING, blank=True, null=True)
    video_link = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=5000, blank=True, null=True)
    introduction = models.CharField(max_length=500, blank=True, null=True)
    start_number = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    locked = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lesson_info'


class OrderItems(models.Model):
    id = models.IntegerField(primary_key=True)
    order = models.ForeignKey(
        'Orders', models.DO_NOTHING, blank=True, null=True)
    course = models.ForeignKey(
        Course, models.DO_NOTHING, blank=True, null=True)
    init_price = models.IntegerField(blank=True, null=True)
    discount = models.IntegerField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_items'


class Orders(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    affiliate = models.ForeignKey(
        Affiliate, models.DO_NOTHING, blank=True, null=True)
    initial_sum = models.IntegerField(blank=True, null=True)
    discount = models.IntegerField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'


class Pages(models.Model):
    id = models.IntegerField(primary_key=True)
    website = models.ForeignKey('Websites', models.DO_NOTHING)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.CharField(max_length=50, blank=True, null=True)
    last_modified_at = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pages'


class Roles(models.Model):
    roles = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'roles'


class SectionMapping(models.Model):
    id = models.IntegerField(primary_key=True)
    page = models.ForeignKey(Pages, models.DO_NOTHING)
    section = models.ForeignKey('Sections', models.DO_NOTHING)
    mode_hide = models.SmallIntegerField()
    time_hide = models.IntegerField(blank=True, null=True)
    number_hide = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'section_mapping'


class Sections(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(unique=True, max_length=255)
    div_id = models.CharField(unique=True, max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    display_mode = models.SmallIntegerField(blank=True, null=True)
    width = models.IntegerField()
    height = models.IntegerField()
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sections'


class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    student_code = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class StudentCourse(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(
        Student, models.DO_NOTHING, blank=True, null=True)
    course = models.ForeignKey(
        Course, models.DO_NOTHING, blank=True, null=True)
    lesson = models.ForeignKey(
        Lesson, models.DO_NOTHING, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student_course'


class StudentLesson(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(
        Student, models.DO_NOTHING, blank=True, null=True)
    lesson_info = models.ForeignKey(
        LessonInfo, models.DO_NOTHING, blank=True, null=True)
    lesson = models.ForeignKey(
        Lesson, models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student_lesson'


class Teacher(models.Model):
    id = models.IntegerField(primary_key=True)
    teacher_code = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=2000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'teacher'

    # def toJSON(self):
    #     return json.dumps(self, default=lambda o: o.isoformat() 
    #                       if (isinstance(o, datetime.datetime)) else o.__dict__, sort_keys=True, 
    #                       indent=4)
        
    def toJSON(self):
        if (type(self) is not Teacher):
            return serialize('json', self, cls=LazyEncoder)
        else:
            item = []
            item.append(self)
            return serialize('json', item, cls=LazyEncoder)


class Type(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    cate_img = models.CharField(max_length=45, blank=True, null=True)
    created_by = models.CharField(max_length=45, blank=True, null=True)
    last_modified_by = models.CharField(max_length=45, blank=True, null=True)
    created_at = models.CharField(max_length=45, blank=True, null=True)
    last_modified_at = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type'


class UserAccount(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    student = models.ForeignKey(
        Student, models.DO_NOTHING, blank=True, null=True)
    teacher = models.ForeignKey(
        Teacher, models.DO_NOTHING, blank=True, null=True)
    affiliate = models.ForeignKey(
        Affiliate, models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)
    username = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_account'


class UserRoles(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    role_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'user_roles'


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Websites(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(unique=True, max_length=50)
    domain = models.CharField(max_length=500)
    web_key = models.CharField(unique=True, max_length=50)
    created_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    last_modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'websites'
