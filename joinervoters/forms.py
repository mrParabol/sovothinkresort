from django import forms
from joinervoters.models import MessageBoxDef, Announcements, DeletePostviaVotes, ExportUser, User, CreateGroup, GroupPostses, GroupJoin, EnfafiloComment, ProfilePhoto, BackPhoto
from django.db.models.signals import post_save
from django.conf import settings
from ckeditor.widgets import CKEditorWidget
from django.core.files import File
from taggit.forms import *
from haystack.forms import SearchForm, ModelSearchForm
from snowpenguin.django.recaptcha2.fields import ReCaptchaField
from snowpenguin.django.recaptcha2.widgets import ReCaptchaWidget

class ReSignUpForm(forms.Form):
	first_name = forms.CharField(max_length=255, label='First Name')
	last_name = forms.CharField(max_length=255, label='Last Name')
	captcha = ReCaptchaField(widget=ReCaptchaWidget())

	def signup(self, request, user):
		user.first_name = self.cleaned_data['first_name']
		user.last_name = self.cleaned_data['last_name']
		user.save()

class UserProfileForm(forms.ModelForm):
	bigphotox = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotox'}))
	bigphotoy = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotoy'}))
	bigphotowidth = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotowidth'}))
	bigphotoheight = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotoheight'}))
	miniphotox = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotox'}))
	miniphotoy = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotoy'}))
	miniphotowidth = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotowidth'}))
	miniphotoheight = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotoheight'}))
	first_name = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'id':'firstname', 'placeholder':'First Name', 'class':'form-control'}))
	last_name = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'id':'lastname', 'placeholder':'Last Name', 'class':'form-control'}))
	birthday = forms.DateField(input_formats=settings.DATE_INPUT_FORMATS,
	    widget=forms.DateInput(format=('%Y-%m-%d'),
	    attrs={'id':'birthday', 'class':'form-control', 'data-field':'date',
	    'readonly':'readonly'}))
	feeling = forms.CharField(required = False,
	    widget=forms.HiddenInput(attrs={'readonly':'readonly', 'id':'feeling'}))
	gender = forms.ChoiceField(choices = User.SELECT_GENDER, widget=forms.Select(attrs={'id':'gender', 'class':'custom-select'}))
	bigphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'bigphoto', 'onclick':'imageonefunc()', 'class':'bigphoto custom-file-input', 'accept': 'image/*'}))
	miniphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'miniphoto', 'onclick':'imagetwofunc()', 'class':'miniphoto custom-file-input', 'accept': 'image/*'}))
	aboutyourself = forms.CharField(required = False, label='aboutyourself', widget=forms.Textarea(attrs={'id' : 'aboutyourself', 'class':'form-control', 'placeholder':'About Yourself'}))
	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'birthday', 'gender', 'feeling', 'aboutyourself',)

class ProfilePhotoForm(forms.ModelForm):
	bigphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'bigphoto', 'onclick':'imageonefunc()', 'class':'bigphoto', 'accept': 'image/*'}))
	class Meta:
		model = ProfilePhoto
		fields = ('bigphoto',)

class BackPhotoForm(forms.ModelForm):
	miniphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'miniphoto', 'onclick':'imagetwofunc()', 'class':'miniphoto', 'accept': 'image/*'}))
	class Meta:
		model = BackPhoto
		fields = ('miniphoto',)

#group
class EnfafiloCommentForm(forms.ModelForm):
	commentcontent = forms.CharField(label='Comment', widget=forms.Textarea(attrs={'class' : 'ckeditor', 'id' : 'commentcontent'}))
	#commentappear = forms.ChoiceField(choices = EnfafiloComment.APPEARCOMMENT_CHOICES, widget=forms.Select(attrs={'id':'commentappear', 'class':'form-control'}))
	#feeling = forms.CharField(
	    #widget=forms.HiddenInput(attrs={'readonly':'readonly', 'id':'feeling'}))
	#publishselect = forms.ChoiceField(choices = EnfafiloComment.REPLY_CHOICES, widget=forms.Select(attrs={'id':'publishselect', 'class':'form-control'}))
	content_type = forms.CharField(
	    widget=forms.HiddenInput(attrs={'id':'content_type'}))
	object_id = forms.CharField(
	    widget=forms.HiddenInput(attrs={'id':'object_id'}))
	#publishposts = forms.DateTimeField(input_formats=settings.DATE_TIME_INPUT_FORMATS,
	    #widget=forms.DateTimeInput(format=('%Y-%m-%d %H:%M'),
	    #attrs={'data-field':'datetime',
	    #'id':'publishposts', 'class':'form-control',
	    #'readonly':'readonly'}))
	
	class Meta:
		model = EnfafiloComment
		#fields = ('commentcontent', 'publishposts', 'commentappear', 'publishselect', 'content_type', 'object_id',)
		fields = ('commentcontent', 'content_type', 'object_id',)

class EnfafiloDeleteCommentForm(forms.Form):
	valueid = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'valueid', 'value':''}))
	valueslug = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'valueslug', 'value':''}))


class CreateGroupForm(forms.ModelForm):
	bigphotox = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotox'}))
	bigphotoy = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotoy'}))
	bigphotowidth = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotowidth'}))
	bigphotoheight = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'bigphotoheight'}))
	miniphotox = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotox'}))
	miniphotoy = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotoy'}))
	miniphotowidth = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotowidth'}))
	miniphotoheight = forms.FloatField(required = False, widget=forms.HiddenInput(attrs={'id':'miniphotoheight'}))
	groupname = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'id':'groupname', 'class':'form-control', 'placeholder':'Group Name'}))
	#followacceptcontrol = forms.BooleanField(required=False, initial=True, label='Group Show or Hide', widget=forms.CheckboxInput(attrs={'id':'followacceptcontrol', 'value':'TRUE'}))
	followacceptcontrol = forms.BooleanField(required=False, initial=True, widget=forms.CheckboxInput(attrs={'id':'followacceptcontrol', 'class': 'custom-control-input mycustomcheckbox', 'value':'TRUE'}))
	bigphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'bigphoto', 'onclick':'imageonefunc()', 'class':'bigphoto custom-file-input', 'accept': 'image/*'}))
	miniphoto = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'miniphoto', 'onclick':'imagetwofunc()', 'class':'miniphoto custom-file-input', 'accept': 'image/*'}))
	aboutgroup = forms.CharField(required = False, label='aboutgroup', widget=forms.Textarea(attrs={'class' : 'ckeditor', 'id' : 'aboutgroup'}))
	grouplabels = TagField(required = False, widget=forms.TextInput(attrs={'id':'grouplabels', 'class':'form-control', 'placeholder':'Label'}))
	class Meta:
		model = CreateGroup
		fields = ('groupname', 'followacceptcontrol', 'bigphoto', 'miniphoto', 'aboutgroup', 'grouplabels',)
	#def formcontrol(self):
		#if not self.cleaned_data['groupname']:
			#raise forms.ValidationError(u'Groupname alanı doldur pilic.')
		#if CreateGroup.objects.filter(groupname__iexact=self.cleaned_data['groupname']):
			#raise forms.ValidationError(u'Bu groupname adı daha önce alınmış')
		#return self.cleaned_data['groupname']
class GroupPostsesForm(forms.ModelForm):
	feeling = forms.CharField(required = False,
	    widget=forms.HiddenInput(attrs={'readonly':'readonly', 'id':'feeling'}))
	postsgroupwrite = forms.CharField(required = False, label='postsgroupwrite', widget=forms.Textarea(attrs={'class' : 'ckeditor', 'id' : 'postsgroupwrite'}))
	multiphoto = forms.FileField(required = False, widget=forms.FileInput(attrs={'id':'multiphoto', 'class':'multiphoto custom-file-input', 'accept': 'video/*'}))
	multifiles = forms.ImageField(required = False, widget=forms.FileInput(attrs={'id':'multifiles', 'class':'multifiles custom-file-input', 'multiple':'true'}))
	grouppknum = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'grouppknum', 'value':''}))
	groupslugchar = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'groupslugchar', 'value':''}))
	postgrouplabels = TagField(required = False, widget=forms.TextInput(attrs={'readonly':'readonly', 'class':'form-control', 'id':'postgrouplabels', 'type':'hidden', 'value':''}))
	class Meta:
		model = GroupPostses
		fields = ('feeling', 'postsgroupwrite', 'multiphoto', 'multifiles', 'postgrouplabels',)

class AnnouncementsForm(forms.ModelForm):
	postsgroupwrite = forms.CharField(required = False, label='postsgroupwrite', widget=forms.Textarea(attrs={'class' : 'ckeditor', 'id' : 'postsgroupwrite'}))
	grouppknum = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'grouppknum', 'value':''}))
	groupslugchar = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'groupslugchar', 'value':''}))
	postgrouplabels = TagField(required = False, widget=forms.TextInput(attrs={'readonly':'readonly', 'id':'postgrouplabels', 'type':'hidden', 'value':''}))
	class Meta:
		model = Announcements
		fields = ('postsgroupwrite',)

class GroupJoinForm(forms.Form):
	membertype = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'membertype', 'value':''}))
	grouppk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'grouppk', 'value':''}))
	userpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'userpk', 'value':''}))


class ExportUserForm(forms.Form):
	exporttype = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exporttype', 'value':''}))
	exportgrouppk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'exportgrouppk', 'value':''}))
	exportuserpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'exportuserpk', 'value':''}))
	requestoruserpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'requestoruserpk', 'value':''}))

class ExportUserVoterForm(forms.Form):
	exporttype = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exporttype', 'value':''}))
	exportgrouppk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'exportgrouppk', 'value':''}))
	exportup = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportup', 'value':''}))
	exportdown = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportdown', 'value':''}))


class DeletePostviaVotesForm(forms.Form):
	deltype = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'deltype', 'value':''}))
	delgrouppk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'delgrouppk', 'value':''}))
	delpostpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'delpostpk', 'value':''}))
	deluserpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'deluserpk', 'value':''}))
	delrequestoruserpk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'delrequestoruserpk', 'value':''}))

class DelPostVoterForm(forms.Form):
	deltype = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'deltype', 'value':''}))
	delgrouppk = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'delgrouppk', 'value':''}))
	exportup = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportup', 'value':''}))
	delpostid = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'delpostid', 'value':''}))
	exportdown = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportdown', 'value':''}))

class MessageBoxDefForm(forms.Form):
	readunreadcontrol = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'readunreadcontrol', 'value':''}))
	whichmessage = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'whichmessage', 'value':''}))
	processtyper = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'processtyper', 'value':''}))

class GroupPostVoterForm(forms.Form):
	exporttypepost = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exporttypepost', 'value':''}))
	exportgrouppkpost = forms.IntegerField(required = False, widget=forms.HiddenInput(attrs={'id':'exportgrouppkpost', 'value':''}))
	exportuppost = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportuppost', 'value':''}))
	exportdownpost = forms.CharField(required = False, widget=forms.HiddenInput(attrs={'id':'exportdownpost', 'value':''}))

class GroupSearchForm(SearchForm):
	'''
	start_date = forms.DateField(required=False)
	end_date = forms.DateField(required=False)
	'''
	#q = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'id':'q'}))

	def search(self):
		# First, store the SearchQuerySet received from other processing.
		sqs = super(GroupSearchForm, self).search()
		if not self.is_valid():
			return self.no_query_found()
		# Check to see if a start_date was chosen.
		#if self.cleaned_data['start_date']:
			#sqs = sqs.filter(pub_date__gte=self.cleaned_data['start_date'])
		# Check to see if an end_date was chosen.
		#if self.cleaned_data['end_date']:
			#sqs = sqs.filter(pub_date__lte=self.cleaned_data['end_date'])
		return sqs


		
	


