from django.contrib import admin
from joinervoters.models import User
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin
from django import forms
# Register your models here.

class MyUserChangeForm (UserChangeForm):
	class Meta(UserChangeForm.Meta):
		model=User

class MyUserAdmin (UserAdmin):
	form=MyUserChangeForm
	list_display=UserAdmin.list_display+('birthday', 'gender',)
	
	fieldsets=UserAdmin.fieldsets+((None, {'fields':('birthday', 'gender',)}),)

class MyUserCreationForm (UserCreationForm):
	class Meta(UserCreationForm.Meta):
		model=User
		fields = {'username', 'password1', 'password2', 'email', 'birthday', 'gender'}
	def clean_username(self):
		username=self.cleaned_data['username']
		try:
			User.objects.get(username=username)
		except User.DoesNotExist:
			return username
		raise forms.ValidationError(self.error_messages['duplicate_username'])
admin.site.register(User, MyUserAdmin)
