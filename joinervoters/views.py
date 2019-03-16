from django.shortcuts import render, redirect, get_object_or_404
from joinervoters.models import GroupFirstCount, ForGroupPostPhotos, UserDeleteNegativeActivityCounter, UserDeletePositiveActivityCounter, PostPositiveVotes, PostNegativeVotes, MessageBoxDef, PostCounter, PostRequestDeleteCounter, PostDelCount, UserRequestDeleteCounter, UserVotePositiveActivityCounter, UserVoteNegativeActivityCounter, Announcements, GroupDegree, BeDelegate, DeletePostviaVotes, ExportUser, User, CreateGroup, GroupPostses, GroupJoin, EnfafiloComment, ProfilePhoto, BackPhoto
from joinervoters.forms import GroupSearchForm, EnfafiloDeleteCommentForm, GroupPostVoterForm, MessageBoxDefForm, DelPostVoterForm, AnnouncementsForm, ExportUserVoterForm, DeletePostviaVotesForm, ExportUserForm, BackPhotoForm, ProfilePhotoForm, UserProfileForm, CreateGroupForm, GroupPostsesForm, GroupJoinForm, EnfafiloCommentForm
from django.views.generic import FormView, UpdateView, DetailView, CreateView, DeleteView, ListView
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import ModelFormMixin, DeletionMixin
from django.urls import reverse, reverse_lazy
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from allauth.account.decorators import verified_email_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.files import File
from django.core.files.base import ContentFile
import datetime
from django.http import JsonResponse
import simplejson as json
from django.views.decorators.csrf import csrf_exempt
from django.http.request import QueryDict
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from joinervoters.findimageprocess import PhotoProcess, ControlPhotoExt
from joinervoters.joincontrol import ShowListJoins, JoinControlFuncs, ListJoin, BlockFuncs
from django.views.generic.edit import FormMixin
from django.db.models import Max, Min, Count, Avg, FloatField, Q
from haystack.generic_views import SearchView
from joinervoters.tasks import second_group_have_president_user, second_group_have_president_delete
from haystack.query import SearchQuerySet
from haystack.utils.highlighting import Highlighter
import urllib
# Create your views here.

decorators = [verified_email_required, login_required(login_url='/accounts/login/')]

@method_decorator(decorators, name='dispatch')
class UserProfileUpdate(UpdateView):
	model = User
	form_class = UserProfileForm
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "userprofilenow/user_editprofile.html"
	template_name_suffix = '_editprofile'
	http_method_names = [u'get', u'post', u'put']
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#queryset = self.model.objects.get(pk = getid, slug = getslug)
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get(self, request, *args, **kwargs):
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		formbig = ProfilePhotoForm()
		formmini = BackPhotoForm()
		get_object = self.get_object()
		context = self.get_context_data(object=self.object, form=form, formbig=formbig, formmini=formmini)
		return render(self.request, self.template_name, context)
	
	def get_context_data(self, **kwargs):
		context = super(UserProfileUpdate, self).get_context_data(**kwargs)
		context['userprofileupdate'] = kwargs['object']
		context['form'] = kwargs['form']
		context['formbig'] = kwargs['formbig']
		context['formmini'] = kwargs['formmini']
		if self.request.user.id == self.kwargs['pk']:
			context['reqshowcont'] = 'True'
		else:
			context['reqshowcont'] = 'You are not authorized to view this page'
		return context
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('/accounts/login/')
		if not ProfilePhoto.objects.filter(user = self.request.user.id):
			ProfilePhoto.objects.create (user = self.request.user)
		if not BackPhoto.objects.filter(user = self.request.user.id):
			BackPhoto.objects.create (user = self.request.user)
		else:
			form_name = 'createpostone'
			if request.POST.get('first_name', '') != '' or request.POST.get('last_name', '') != '':
				if request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') != '':
					print(request.POST['bigphotox'])
					typebigphoto = ControlPhotoExt(request.FILES['bigphoto'])
					typeminiphoto = ControlPhotoExt(request.FILES['miniphoto'])
					if typebigphoto.imageorfile() == True and typeminiphoto.imageorfile() == True :
						bigphotodata = ProfilePhoto.objects.get(user=self.object)
						miniphotodata = BackPhoto.objects.get(user=self.object)
						datamini = {'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'),\
						   'miniphotowidth': request.POST.get('miniphotowidth', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'),\
						   'miniphoto': request.FILES['miniphoto']}
						databig = {'bigphotox': request.POST.get('bigphotox', '0'), 'bigphotoy': request.POST.get('bigphotoy', '0'),\
						 'bigphotowidth': request.POST.get('bigphotowidth', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'),\
						 'bigphoto': request.FILES['bigphoto']}
						data = {'first_name': request.POST.get('first_name', ''), 'last_name': request.POST.get('last_name', ''),\
						     'birthday': request.POST.get('birthday', ''), 'feeling': request.POST.get('feeling', ''),\
						      'gender': request.POST.get('gender', ''), 'aboutyourself': request.POST.get('aboutyourself', '')}
						profile_form = UserProfileForm(data, self.request.FILES or None, instance = self.object)
						bigphoto_form = ProfilePhotoForm(databig, request.FILES, instance = bigphotodata)
						miniphoto_form = BackPhotoForm(datamini, request.FILES, instance = miniphotodata)
						if data:
							return self.form_valid(profile_form, bigphoto_form, miniphoto_form)
						else:
							return HttpResponse(self.form_invalid(**{form_name: profile_form}))
					else:
						return HttpResponse(json.dumps({'error':'not an acceptable picture'}), content_type = "application/json")
				elif request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') == '':
					if ControlPhotoExt(request.FILES['bigphoto']).imageorfile() == True :
						bigphotodata = ProfilePhoto.objects.get(user=self.object)
						databig = {'bigphotox': request.POST.get('bigphotox', '0'), 'bigphotoy': request.POST.get('bigphotoy', '0'),\
						 'bigphotowidth': request.POST.get('bigphotowidth', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'),\
						 'bigphoto': request.FILES['bigphoto']}
						data = {'first_name': request.POST.get('first_name', ''), 'last_name': request.POST.get('last_name', ''),\
						     'birthday': request.POST.get('birthday', ''), 'feeling': request.POST.get('feeling', ''),\
						      'gender': request.POST.get('gender', ''), 'aboutyourself': request.POST.get('aboutyourself', '')}
						profile_form = UserProfileForm(data, self.request.FILES or None, instance = self.object)
						bigphoto_form = ProfilePhotoForm(databig, request.FILES, instance = bigphotodata)
						if data:
							return self.form_valid_one(profile_form, bigphoto_form)
						else:
							return HttpResponse(self.form_invalid(**{form_name: profile_form}))
					else:
						return HttpResponse(json.dumps({'error':'not an acceptable picture'}), content_type = "application/json")
				elif request.FILES.get('bigphoto', '') == '' and request.FILES.get('miniphoto', '') != '':
					if ControlPhotoExt(request.FILES['miniphoto']).imageorfile() == True :
						miniphotodata = BackPhoto.objects.get(user=self.object)
						datamini = {'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'),\
						   'miniphotowidth': request.POST.get('miniphotowidth', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'),\
						   'miniphoto': request.FILES['miniphoto']}
						data = {'first_name': request.POST.get('first_name', ''), 'last_name': request.POST.get('last_name', ''),\
						     'birthday': request.POST.get('birthday', ''), 'feeling': request.POST.get('feeling', ''),\
						      'gender': request.POST.get('gender', ''), 'aboutyourself': request.POST.get('aboutyourself', '')}
						profile_form = UserProfileForm(data, self.request.FILES or None, instance = self.object)
						miniphoto_form = BackPhotoForm(datamini, request.FILES, instance = miniphotodata)
						if data:
							return self.form_valid_two(profile_form, miniphoto_form)
						else:
							return HttpResponse(self.form_invalid(**{form_name: profile_form}))
					else:
						return HttpResponse(json.dumps({'error':'not an acceptable picture'}), content_type = "application/json")
				else:
					data = {'first_name': request.POST.get('first_name', ''), 'last_name': request.POST.get('last_name', ''),\
					     'birthday': request.POST.get('birthday', ''), 'feeling': request.POST.get('feeling', ''),\
					      'gender': request.POST.get('gender', ''), 'aboutyourself': request.POST.get('aboutyourself', '')}
					profile_form = UserProfileForm(data, self.request.FILES or None, instance = self.object)
					if data:
						return self.form_valid_three(profile_form)
					else:
						return HttpResponse(self.form_invalid(**{form_name: profile_form}))
			else:
				return HttpResponse(json.dumps({'error':'enter your first or last name'}), content_type = "application/json")
	def getfolderpath(self, instance, filenamepic):
		filenamepic = os.path.splitext(filenamepic)[0]
		fileregistername = os.path.join('media/userpicpath', str(instance.id), str(instance.id)+filenamepic)
		if not os.path.exists(fileregistername):
			os.makedirs(fileregistername)
		return fileregistername
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	def form_valid(self, form, formtwo, formthree):
		profile_form = form
		bigphoto_form = formtwo
		miniphoto_form = formthree
		bigphotox = float(bigphoto_form.data['bigphotox'])
		bigphotoy = float(bigphoto_form.data['bigphotoy'])
		bigphotowidth = float(bigphoto_form.data['bigphotowidth'])
		bigphotoheight = float(bigphoto_form.data['bigphotoheight'])
		miniphotox = float(miniphoto_form.data['miniphotox'])
		miniphotoy = float(miniphoto_form.data['miniphotoy'])
		miniphotowidth = float(miniphoto_form.data['miniphotowidth'])
		miniphotoheight = float(miniphoto_form.data['miniphotoheight'])
		go_form = bigphoto_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		go_formtwo = miniphoto_form.save(commit = False)
		is_valid = True
		go_formtwo.user = self.request.user
		go_formtwo.save()
		processgetpk = self.kwargs['pk']
		myprocessdata = User.objects.filter(pk=processgetpk)
		firstname = profile_form.data['first_name']
		lastname = profile_form.data['last_name']
		birthday = profile_form.data['birthday']
		feeling = profile_form.data['feeling']
		gender = profile_form.data['gender']
		aboutyourself = profile_form.data['aboutyourself']
		myphotos = ProfilePhoto.objects.get (user = self.request.user)
		myphotosmini = BackPhoto.objects.get (user = self.request.user)
		myprocessdata.update(first_name=firstname, last_name=lastname, feeling=feeling, birthday=birthday, gender=gender, aboutyourself=aboutyourself)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		miniphoto = myphotosmini.miniphoto.url
		miniphotopath = myphotosmini.miniphoto.path
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		user = get_object_or_404(User, username = self.request.user.username)
		postlist = self.model.objects.filter(pk = user.pk, slug = user.slug)
		jsondata = postlist.values('pk', 'slug', 'first_name', 'last_name', 'birthday', 'gender', 'aboutyourself')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'error in form'}), content_type = "application/json")

	def form_valid_three(self, form):
		profile_form = form
		processgetpk = self.kwargs['pk']
		myprocessdata = User.objects.filter(pk=processgetpk)
		firstname = profile_form.data['first_name']
		lastname = profile_form.data['last_name']
		birthday = profile_form.data['birthday']
		feeling = profile_form.data['feeling']
		gender = profile_form.data['gender']
		aboutyourself = profile_form.data['aboutyourself']
		myprocessdata.update(first_name=firstname, last_name=lastname, feeling=feeling, birthday=birthday, gender=gender, aboutyourself=aboutyourself)
		user = get_object_or_404(User, username = self.request.user.username)
		postlist = self.model.objects.filter(pk = user.pk, slug = user.slug)
		jsondata = postlist.values('pk', 'slug', 'first_name', 'last_name', 'birthday', 'gender', 'aboutyourself')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_two(self, form, formtwo):
		profile_form = form
		miniphoto_form = formthree
		miniphotox = float(miniphoto_form.data['miniphotox'])
		miniphotoy = float(miniphoto_form.data['miniphotoy'])
		miniphotowidth = float(miniphoto_form.data['miniphotowidth'])
		miniphotoheight = float(miniphoto_form.data['miniphotoheight'])
		go_formtwo = miniphoto_form.save(commit = False)
		is_valid = True
		go_formtwo.user = self.request.user
		go_formtwo.save()
		processgetpk = self.kwargs['pk']
		myprocessdata = User.objects.filter(pk=processgetpk)
		firstname = profile_form.data['first_name']
		lastname = profile_form.data['last_name']
		birthday = profile_form.data['birthday']
		feeling = profile_form.data['feeling']
		gender = profile_form.data['gender']
		aboutyourself = profile_form.data['aboutyourself']
		myphotosmini = BackPhoto.objects.get (user = self.request.user)
		myprocessdata.update(first_name=firstname, last_name=lastname, feeling=feeling, birthday=birthday, gender=gender, aboutyourself=aboutyourself)
		miniphoto = myphotosmini.miniphoto.url
		miniphotopath = myphotosmini.miniphoto.path
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		user = get_object_or_404(User, username = self.request.user.username)
		postlist = self.model.objects.filter(pk = user.pk, slug = user.slug)
		jsondata = postlist.values('pk', 'slug', 'first_name', 'last_name', 'birthday', 'gender', 'aboutyourself')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_one(self, form, formtwo):
		profile_form = form
		bigphoto_form = formtwo
		bigphotox = float(bigphoto_form.data['bigphotox'])
		bigphotoy = float(bigphoto_form.data['bigphotoy'])
		bigphotowidth = float(bigphoto_form.data['bigphotowidth'])
		bigphotoheight = float(bigphoto_form.data['bigphotoheight'])
		go_form = bigphoto_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		processgetpk = self.kwargs['pk']
		myprocessdata = User.objects.filter(pk=processgetpk)
		firstname = profile_form.data['first_name']
		lastname = profile_form.data['last_name']
		birthday = profile_form.data['birthday']
		feeling = profile_form.data['feeling']
		gender = profile_form.data['gender']
		aboutyourself = profile_form.data['aboutyourself']
		myphotos = ProfilePhoto.objects.get (user = self.request.user)
		myprocessdata.update(first_name=firstname, last_name=lastname, feeling=feeling, birthday=birthday, gender=gender, aboutyourself=aboutyourself)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		user = get_object_or_404(User, username = self.request.user.username)
		postlist = self.model.objects.filter(pk = user.pk, slug = user.slug)
		jsondata = postlist.values('pk', 'slug', 'first_name', 'last_name', 'birthday', 'gender', 'aboutyourself')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class UserDeleteView(DeleteView):
	model = User
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "userprofilenow/uniqueuser_delete.html"
	template_name_suffix = "_delete"
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
			delete_posts = self.object
		except:
			self.object = None
		if self.object == None:
			return HttpResponseRedirect ('/accounts/login/')
		context = self.get_context_data(object=self.object)
		return self.render_to_response(context)
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object
	
	def deletes_ajax(self, form):
		self.object = self.get_object()
		self.object.delete()
		return HttpResponse(json.dumps({'success':'delete'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('/accounts/login/')
		else:
			form_name = 'deleteformname'
			post_form = UserProfileForm(self.request.POST or None, self.request.FILES or None, instance = self.object)
			if self.object.id == self.request.user.id:
				return self.form_valid(post_form)
			else:
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		postform = form
		if self.request.is_ajax():
			return self.deletes_ajax(postform)
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT Silindi'}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def get_initial(self):
		get_object = self.get_object()
		first_name = get_object.first_name
		last_name = get_object.last_name
		birthday = get_object.birthday
		feeling = get_object.feeling
		gender = get_object.gender
		aboutyourself = get_object.aboutyourself
		initial = {'first_name':first_name, 'last_name':last_name, 'birthday':birthday, 'feeling':feeling, 'gender':gender, 'aboutyourself':aboutyourself}
		return initial
	
	def get_context_object_name(self):
		context_object_name = 'delete_user_context'
		return context_object_name
	
	def get_context_data(self, **kwargs):
		context = {}
		initial = self.get_initial()
		context['delete_user'] = kwargs['object'] = self.object
		context_object_name = self.get_context_object_name()
		context[context_object_name] = self.object
		context.update(kwargs)
		if 'profile_form' not in context:
			get_object = self.get_object()
			context['profile_form'] = UserProfileForm(initial=initial)
		if self.request.user.id == self.kwargs['pk']:
			context['reqshowcont'] = 'True'
		return context

@method_decorator(decorators, name='dispatch')
class UserDetailShow(DetailView):
	template_name = "userprofilenow/showuser_names.html"
	template_name_suffix = '_names'
	slug_url_kwarg = 'slug'
	pk_url_kwarg = 'pk'
	context_object_name = 'user_detail'
	model = User
	http_method_names = [u'get', u'post', u'put']
	
	def get(self, request, *args, **kwargs):
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		return render(self.request, self.template_name, context)
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#queryset = self.model.objects.get(pk = getid, slug = getslug)
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_context_data(self, **kwargs):
		context = super(UserDetailShow, self).get_context_data(**kwargs)
		userget = kwargs['object']
		context['user_detail'] = userget
		cnt_profile_photo = get_object_or_404(ProfilePhoto, user=userget.id)
		context['profile_photo'] = cnt_profile_photo
		return context

#grup aşağısı
@method_decorator(decorators, name='dispatch')
class CreateGroupViews(CreateView):
	context_object_name = 'create_group'
	form_class = CreateGroupForm
	http_method_names = [u'get', u'post', u'put']
	model = CreateGroup
	template_name = "creategroup/group_create.html"
	template_name_suffix = '_create'
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get_object(self, queryset=None):
		if not CreateGroup.objects.filter(user = self.request.user.id):
			CreateGroup.objects.create (user = self.request.user)
		if queryset is None:
			queryset = self.get_queryset()
		try:
			self.object = queryset
		except queryset.model.DoesNotExist:
			raise Http404("error models filter")
		return self.object
	
	def get_queryset(self):
		if self.model.objects.filter(user=self.request.user).exists():
			self.queryset = self.model.objects.filter(user=self.request.user)
		return self.queryset
	
	def get_slug_field(self):
		try:
			slugget = self.model.objects.get(user=self.request.user)
			slug = slugget.slug
			return slug
		except self.model.DoesNotExist:
			raise Http404("No MyModel matches the given query.")
	
	def get_pk_field(self):
		try:
			pkget = self.model.objects.get(user=self.request.user)
			pkget = pkget.pk
			return pkget
		except self.model.DoesNotExist:
			raise Http404("No MyModel matches the given query.")
	
	def get(self, request, *args, **kwargs):
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		form_class = self.get_form_class()
		form_name = 'creategroupform'
		form = self.get_form(form_class)
		try:
			mydata = self.get_object()
		except self.model.DoesNotExist:
			mydata = None
		return render(request, self.template_name, locals())
	
	def put(self, request, *args, **kwargs):
		form_name = 'creategroupform'
		if request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') != '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), 'bigphotox': request.POST.get('bigphotox'), \
				'bigphotoy': request.POST.get('bigphotoy', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'), 'bigphotowidth': request.POST.get('bigphotowidth', '0'), \
				'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'), 'miniphotowidth': request.POST.get('miniphotowidth', '0'), \
				'bigphoto': request.FILES['bigphoto'], 'miniphoto': request.FILES['miniphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.bigphoto = profile_form.cleaned_data['bigphoto']
				profile_form.miniphoto = profile_form.cleaned_data['miniphoto']
				profile_form.miniphotox = profile_form.cleaned_data['miniphotox']
				profile_form.miniphotoy = profile_form.cleaned_data['miniphotoy']
				profile_form.miniphotoheight = profile_form.cleaned_data['miniphotoheight']
				profile_form.miniphotowidth = profile_form.cleaned_data['miniphotowidth']
				profile_form.bigphotox = profile_form.cleaned_data['bigphotox']
				profile_form.bigphotoy = profile_form.cleaned_data['bigphotoy']
				profile_form.bigphotoheight = profile_form.cleaned_data['bigphotoheight']
				profile_form.bigphotowidth = profile_form.cleaned_data['bigphotowidth']
				return self.form_valid_ajax(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		elif request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') == '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), 'bigphotox': request.POST.get('bigphotox'), \
				'bigphotoy': request.POST.get('bigphotoy', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'), 'bigphotowidth': request.POST.get('bigphotowidth', '0'), \
				'bigphoto': request.FILES['bigphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.bigphoto = profile_form.cleaned_data['bigphoto']
				profile_form.bigphotox = profile_form.cleaned_data['bigphotox']
				profile_form.bigphotoy = profile_form.cleaned_data['bigphotoy']
				profile_form.bigphotoheight = profile_form.cleaned_data['bigphotoheight']
				profile_form.bigphotowidth = profile_form.cleaned_data['bigphotowidth']
				return self.form_valid_ajax_two(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		elif request.FILES.get('bigphoto', '') == '' and request.FILES.get('miniphoto', '') != '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), \
				'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'), 'miniphotowidth': request.POST.get('miniphotowidth', '0'), \
				'miniphoto': request.FILES['miniphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.miniphoto = profile_form.cleaned_data['miniphoto']
				profile_form.miniphotox = profile_form.cleaned_data['miniphotox']
				profile_form.miniphotoy = profile_form.cleaned_data['miniphotoy']
				profile_form.miniphotoheight = profile_form.cleaned_data['miniphotoheight']
				profile_form.miniphotowidth = profile_form.cleaned_data['miniphotowidth']
				return self.form_valid_ajax_three(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		else:
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', '')}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				return self.form_valid_ajax_four(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))

	def form_valid_ajax_four(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_ajax_three(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		miniphoto = myphotos.miniphoto.url
		miniphotopath = myphotos.miniphoto.path
		miniphotox = float(profile_form.miniphotox)
		miniphotoy = float(profile_form.miniphotoy)
		miniphotowidth = float(profile_form.miniphotowidth)
		miniphotoheight = float(profile_form.miniphotoheight)
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_ajax_two(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		bigphotox = float(profile_form.bigphotox)
		bigphotoy = float(profile_form.bigphotoy)
		bigphotowidth = float(profile_form.bigphotowidth)
		bigphotoheight = float(profile_form.bigphotoheight)
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")
	
	def form_valid_ajax(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		miniphoto = myphotos.miniphoto.url
		miniphotopath = myphotos.miniphoto.path
		bigphotox = float(profile_form.bigphotox)
		bigphotoy = float(profile_form.bigphotoy)
		bigphotowidth = float(profile_form.bigphotowidth)
		bigphotoheight = float(profile_form.bigphotoheight)
		miniphotox = float(profile_form.miniphotox)
		miniphotoy = float(profile_form.miniphotoy)
		miniphotowidth = float(profile_form.miniphotowidth)
		miniphotoheight = float(profile_form.miniphotoheight)
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Error in form, check it please'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		if not CreateGroup.objects.filter(user = self.request.user.id):
			CreateGroup.objects.create (user = self.request.user)
		if not request.POST['groupname'] or request.POST.get('groupname', '') == '':
			return HttpResponse(json.dumps({'error':'group name is mandatory'}), content_type = "application/json")
		usernameqscont = CreateGroup.objects.filter(groupname__iexact=request.POST['groupname'])
		if usernameqscont.exists():
			return HttpResponse(json.dumps({'error':'this community name is being used by another community'}), content_type = "application/json")
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'method is not true'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class CreateGroupUpdateViews(UpdateView):
	context_object_name = 'update_group'
	form_class = CreateGroupForm
	http_method_names = [u'get', u'post', u'put']
	model = CreateGroup
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/group_update.html"
	template_name_suffix = '_update'
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#queryset = self.model.objects.get(pk = getid, slug = getslug)
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_slug_field(self):
		try:
			slugget = self.model.objects.get(user=self.request.user)
			slug = slugget.slug
			return slug
		except self.model.DoesNotExist:
			raise Http404("No MyModel matches the given query.")
	
	def get_pk_field(self):
		try:
			pkget = self.model.objects.get(user=self.request.user)
			pkget = pkget.pk
			return pkget
		except self.model.DoesNotExist:
			raise Http404("No MyModel matches the given query.")
	
	def get(self, request, *args, **kwargs):
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		if not CreateGroup.objects.filter(user = self.request.user.id):
			return HttpResponseRedirect('department/create/new/')
		get_object = self.get_object()
		profile_form = CreateGroupForm(instance = get_object)
		form_name = 'creategroupupdateform'
		return render(request, self.template_name, locals())

	'''
	def put(self, request, *args, **kwargs):
		self.object = self.get_object()
		form_name = 'creategroupupdateform'
		data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST['aboutgroup'], \
			'followacceptcontrol': request.POST['followacceptcontrol'], 'grouplabels': request.POST['grouplabels'], 'bigphotox': request.POST['bigphotox'], \
			'bigphotoy': request.POST['bigphotoy'], 'bigphotoheight': request.POST['bigphotoheight'], 'bigphotowidth': request.POST['bigphotowidth'], \
			'miniphotox': request.POST['miniphotox'], 'miniphotoy': request.POST['miniphotoy'], 'miniphotoheight': request.POST['miniphotoheight'], 'miniphotowidth': request.POST['miniphotowidth'], \
			'bigphoto': request.FILES['bigphoto'], 'miniphoto': request.FILES['miniphoto']}
		profile_form = CreateGroupForm(data, self.request.FILES, instance = self.object)
		if profile_form.is_valid():
			profile_form.groupname = profile_form.cleaned_data['groupname']
			profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
			profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
			profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
			profile_form.bigphoto = profile_form.cleaned_data['bigphoto']
			profile_form.miniphoto = profile_form.cleaned_data['miniphoto']
			profile_form.miniphotox = profile_form.cleaned_data['miniphotox']
			profile_form.miniphotoy = profile_form.cleaned_data['miniphotoy']
			profile_form.miniphotoheight = profile_form.cleaned_data['miniphotoheight']
			profile_form.miniphotowidth = profile_form.cleaned_data['miniphotowidth']
			profile_form.bigphotox = profile_form.cleaned_data['bigphotox']
			profile_form.bigphotoy = profile_form.cleaned_data['bigphotoy']
			profile_form.bigphotoheight = profile_form.cleaned_data['bigphotoheight']
			profile_form.bigphotowidth = profile_form.cleaned_data['bigphotowidth']
			return self.form_valid_ajax(profile_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	'''
	def put(self, request, *args, **kwargs):
		self.object = self.get_object()
		form_name = 'creategroupupdateform'
		if request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') != '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), 'bigphotox': request.POST.get('bigphotox'), \
				'bigphotoy': request.POST.get('bigphotoy', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'), 'bigphotowidth': request.POST.get('bigphotowidth', '0'), \
				'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'), 'miniphotowidth': request.POST.get('miniphotowidth', '0'), \
				'bigphoto': request.FILES['bigphoto'], 'miniphoto': request.FILES['miniphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.object)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.bigphoto = profile_form.cleaned_data['bigphoto']
				profile_form.miniphoto = profile_form.cleaned_data['miniphoto']
				profile_form.miniphotox = profile_form.cleaned_data['miniphotox']
				profile_form.miniphotoy = profile_form.cleaned_data['miniphotoy']
				profile_form.miniphotoheight = profile_form.cleaned_data['miniphotoheight']
				profile_form.miniphotowidth = profile_form.cleaned_data['miniphotowidth']
				profile_form.bigphotox = profile_form.cleaned_data['bigphotox']
				profile_form.bigphotoy = profile_form.cleaned_data['bigphotoy']
				profile_form.bigphotoheight = profile_form.cleaned_data['bigphotoheight']
				profile_form.bigphotowidth = profile_form.cleaned_data['bigphotowidth']
				return self.form_valid_ajax(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		elif request.FILES.get('bigphoto', '') != '' and request.FILES.get('miniphoto', '') == '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), 'bigphotox': request.POST.get('bigphotox'), \
				'bigphotoy': request.POST.get('bigphotoy', '0'), 'bigphotoheight': request.POST.get('bigphotoheight', '0'), 'bigphotowidth': request.POST.get('bigphotowidth', '0'), \
				'bigphoto': request.FILES['bigphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.bigphoto = profile_form.cleaned_data['bigphoto']
				profile_form.bigphotox = profile_form.cleaned_data['bigphotox']
				profile_form.bigphotoy = profile_form.cleaned_data['bigphotoy']
				profile_form.bigphotoheight = profile_form.cleaned_data['bigphotoheight']
				profile_form.bigphotowidth = profile_form.cleaned_data['bigphotowidth']
				return self.form_valid_ajax_two(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		elif request.FILES.get('bigphoto', '') == '' and request.FILES.get('miniphoto', '') != '':
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', ''), \
				'miniphotox': request.POST.get('miniphotox', '0'), 'miniphotoy': request.POST.get('miniphotoy', '0'), 'miniphotoheight': request.POST.get('miniphotoheight', '0'), 'miniphotowidth': request.POST.get('miniphotowidth', '0'), \
				'miniphoto': request.FILES['miniphoto']}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				profile_form.miniphoto = profile_form.cleaned_data['miniphoto']
				profile_form.miniphotox = profile_form.cleaned_data['miniphotox']
				profile_form.miniphotoy = profile_form.cleaned_data['miniphotoy']
				profile_form.miniphotoheight = profile_form.cleaned_data['miniphotoheight']
				profile_form.miniphotowidth = profile_form.cleaned_data['miniphotowidth']
				return self.form_valid_ajax_three(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
		else:
			data = {'groupname': request.POST['groupname'], 'aboutgroup': request.POST.get('aboutgroup', ''), \
				'followacceptcontrol': request.POST.get('followacceptcontrol', 'False'), 'grouplabels': request.POST.get('grouplabels', '')}
			profile_form = CreateGroupForm(data, self.request.FILES, instance = self.request.user.grouponeuser)
			if profile_form.is_valid():
				profile_form.groupname = profile_form.cleaned_data['groupname']
				profile_form.followacceptcontrol = profile_form.cleaned_data['followacceptcontrol']
				profile_form.aboutgroup = profile_form.cleaned_data['aboutgroup']
				profile_form.grouplabels = profile_form.cleaned_data['grouplabels']
				return self.form_valid_ajax_four(profile_form)
			else:
				return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	
	'''
	def form_valid_ajax(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		miniphoto = myphotos.miniphoto.url
		miniphotopath = myphotos.miniphoto.path
		bigimageprocess = PhotoProcess(bigphoto, profile_form.bigphotox, profile_form.bigphotoy, profile_form.bigphotowidth, profile_form.bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		miniimageprocess = PhotoProcess(miniphoto, profile_form.miniphotox, profile_form.miniphotoy, profile_form.miniphotowidth, profile_form.miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT YAPILDI'}), content_type = "application/json")
	'''
	def form_valid_ajax(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		miniphoto = myphotos.miniphoto.url
		miniphotopath = myphotos.miniphoto.path
		bigphotox = float(profile_form.bigphotox)
		bigphotoy = float(profile_form.bigphotoy)
		bigphotowidth = float(profile_form.bigphotowidth)
		bigphotoheight = float(profile_form.bigphotoheight)
		miniphotox = float(profile_form.miniphotox)
		miniphotoy = float(profile_form.miniphotoy)
		miniphotowidth = float(profile_form.miniphotowidth)
		miniphotoheight = float(profile_form.miniphotoheight)
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_ajax_four(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_ajax_three(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		miniphoto = myphotos.miniphoto.url
		miniphotopath = myphotos.miniphoto.path
		miniphotox = float(profile_form.miniphotox)
		miniphotoy = float(profile_form.miniphotoy)
		miniphotowidth = float(profile_form.miniphotowidth)
		miniphotoheight = float(profile_form.miniphotoheight)
		miniimageprocess = PhotoProcess(miniphoto, miniphotox, miniphotoy, miniphotowidth, miniphotoheight)
		miniimageprocess = miniimageprocess.getnewphoto()
		miniimageprocess.save(miniphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")

	def form_valid_ajax_two(self, form):
		profile_form = form
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.save()
		profile_form.save_m2m()
		myphotos = self.model.objects.get(user = self.request.user, slug = go_form.slug)
		bigphoto = myphotos.bigphoto.url
		bigphotopath = myphotos.bigphoto.path
		bigphotox = float(profile_form.bigphotox)
		bigphotoy = float(profile_form.bigphotoy)
		bigphotowidth = float(profile_form.bigphotowidth)
		bigphotoheight = float(profile_form.bigphotoheight)
		bigimageprocess = PhotoProcess(bigphoto, bigphotox, bigphotoy, bigphotowidth, bigphotoheight)
		bigimageprocess = bigimageprocess.getnewphoto()
		bigimageprocess.save(bigphotopath)
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug)
		user = get_object_or_404(User, username = self.request.user.username)
		jsondata = postlist.values('pk', 'slug', 'groupname', 'followacceptcontrol', 'aboutgroup', 'grouplabels', 'bigphoto', 'miniphoto', 'createdates')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		taglist = []
		for taggitlist in postlist:
			for tag in taggitlist.grouplabels.all():
				taglist.append(tag.name)
		getdatadict['grouplabels'] = taglist
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if self.request.user != user:
			return HttpResponse(json.dumps({'error':'You don\'t show this post'}), content_type = "application/json")
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'method is not true but the process is completed'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Error in form, check it please'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		if not CreateGroup.objects.filter(user = self.request.user.id):
			return HttpResponseRedirect('department/create/new/')
		if not request.POST['groupname'] or request.POST.get('groupname', '') == '':
			return HttpResponse(json.dumps({'error':'group name is mandatory'}), content_type = "application/json")
		usernameqscont = CreateGroup.objects.filter(groupname__iexact=request.POST['groupname'])
		for usercontrol in usernameqscont:
			getposthaveuser = usercontrol.user
		if usernameqscont.exists() and self.request.user == getposthaveuser:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'error':'method is not true'}), content_type = "application/json")
		if usernameqscont.exists() and self.request.user != getposthaveuser:
			return HttpResponse(json.dumps({'error':'this community name is being used by another community'}), content_type = "application/json")
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'error':'method is not true'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class CreateGroupDeleteView(DeleteView):
	model = CreateGroup
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "creategroup/group_delete.html"
	template_name_suffix = "_delete"
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
			delete_posts = self.object
		except:
			self.object = None
		if self.object == None:
			return redirect ('groupname')
		context = self.get_context_data(object=self.object)
		return self.render_to_response(context)
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object
	
	def deletes_ajax(self, form):
		self.object = self.get_object()
		self.object.delete()
		return HttpResponse(json.dumps({'success':'silindi'}), content_type = "application/json")
	
	def put(self, request, *args, **kwargs):
		form_name = 'deleteformname'
		instanceobject = self.get_object()
		data = {'groupname': self.request.POST['groupname']}
		post_form = CreateGroupForm(data, self.request.FILES or None, instance = instanceobject)
		if post_form.is_valid():
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	def form_valid_ajax(self, form):
		postform = form
		if self.request.is_ajax():
			return self.deletes_ajax(postform)
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT Silindi'}), content_type = "application/json")
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")
	
	def get_initial(self):
		get_object = self.get_object()
		groupname = get_object.groupname
		bigphoto = get_object.bigphoto
		miniphoto = get_object.miniphoto
		aboutgroup = get_object.aboutgroup
		grouplabels = get_object.grouplabels
		initial = {'groupname':groupname, 'bigphoto':bigphoto, 'miniphoto':miniphoto, 'aboutgroup':aboutgroup, 'grouplabels':grouplabels}
		return initial
	
	def get_context_object_name(self):
		context_object_name = 'delete_group_context'
		return context_object_name
	
	def get_context_data(self, **kwargs):
		context = {}
		initial = self.get_initial()
		context['delete_namedetail'] = kwargs['object'] = self.object
		context_object_name = self.get_context_object_name()
		context[context_object_name] = self.object
		context.update(kwargs)
		if 'post_form' not in context:
			get_object = self.get_object()
			context['post_form'] = CreateGroupForm(initial=initial)
		return context

@method_decorator(decorators, name='dispatch')
class GroupDetailShow(DetailView, FormView):
	template_name = "creategroup/showgroup_names.html"
	template_name_suffix = '_names'
	slug_url_kwarg = 'slug'
	pk_url_kwarg = 'pk'
	context_object_name = 'group_detail'
	model = CreateGroup
	form_class = GroupJoinForm
	http_method_names = [u'get', u'post', u'put']
	
	
	def get(self, request, *args, **kwargs):
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		return render(self.request, self.template_name, context)
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		user = get_object_or_404(User, pk = self.request.user.id)
		#queryset = self.model.objects.get(pk = getid, user = user, slug = getslug)
		queryset = get_object_or_404(self.model, pk = getid, user = user, slug = getslug)
		if queryset:
			queryset=queryset
		else:
			queryset = None
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def put(self, request, *args, **kwargs):
		form_name = 'createpostone'
		data = {'membertype': request.POST['membertype'], 'grouppk': request.POST['grouppk'], 'userpk': request.POST['userpk']}
		post_form = GroupJoinForm(data)
		if post_form.is_valid():
			post_form.membertype = post_form.cleaned_data['membertype']
			post_form.grouppk = post_form.cleaned_data['grouppk']
			post_form.userpk = post_form.cleaned_data['userpk']
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	
	def form_valid_ajax(self, form):
		post_form = form
		processdata = JoinControlFuncs(post_form.grouppk, post_form.userpk)
		if post_form.membertype == "UNJOINED":
			#joined yapacan
			returndatashow = processdata.requestjoin()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "JOINED":
			#unjoined yapcan
			returndatashow = processdata.canceljoin()
			if returndatashow == True:
				return HttpResponse(json.dumps({'showdata':'UNJOINED', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'showdata':'error', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "SENDEDREQUEST":
			#block unblock dugme eklemesi için değer döndür
			owngrouporcrossmain = CreateGroup.objects.get(pk = post_form.grouppk)
			owngrouporcross = owngrouporcrossmain.user
			groupslugforsend = owngrouporcrossmain.slug
			groupuserorcross = User.objects.get(pk = post_form.userpk)
			if owngrouporcross == groupuserorcross:
				return HttpResponse(json.dumps({'showdata':'SENDEDREQUEST', 'membertypeone':"UNJOINED", 'membertypetwo':"JOINED", 'membertypethree':"BLOCKED", 'grouppk':post_form.grouppk, 'groupslug': groupslugforsend, 'userpk':post_form.userpk}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'showdata':'CANCELREQUEST', 'grouppk':post_form.grouppk, 'groupslug': groupslugforsend, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "BLOCKED":
			#unblock fonksiyonunu çalıştır
			returndatashow = processdata.requnblocked()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "UNBLOCKED":
			#block fonksiyonu çalıştır
			returndatashow = processdata.reqblocked()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'showdata':'error', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = None
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		else:
			if 'application/x-www-form-urlencoded' in request.META['CONTENT_TYPE']:
				#recaptcha control
				if request.POST.get('recaptcha', '') != '':
					recaptcha_response = request.POST['recaptcha']
					recapturl = 'https://www.google.com/recaptcha/api/siteverify'
					recapvalues = {
						'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
						'response': recaptcha_response
					}
					recapdata = urllib.parse.urlencode(recapvalues).encode()
					recapreq =  urllib.request.Request(recapturl, data=recapdata)
					recapresponse = urllib.request.urlopen(recapreq)
					recapresult = json.loads(recapresponse.read().decode())
					if recapresult['success']:
						return self.put(request, *args, **kwargs)
					else:
						return HttpResponse(json.dumps({'error':'captcha error'}), content_type = "application/json")
				else:
					return self.put(request, *args, **kwargs)
			else:
				return HttpResponse(json.dumps({'error':'post yöntemi yanlış'}), content_type = "application/json")
	
	def get_context_data(self, **kwargs):
		context = super(GroupDetailShow, self).get_context_data(**kwargs)
		startdate = datetime.datetime.now() - datetime.timedelta(minutes=15)
		orfiltterget = GroupJoin.objects.filter(fromuser=self.request.user, createdates__gt = startdate)
		if orfiltterget.filter(Q(joinstatus = "JOINED") | Q(joinstatus = "SENDEDREQUEST")).count() >= 17:
			context['captchacontrol'] = 'True'
		groupget = kwargs['object']
		if groupget != None:
			context['group_detail'] = groupget
			joincont = JoinControlFuncs(groupget, self.request.user)
			joincontshow = joincont.isjoincont()
			if joincontshow == True:
				joincontshow = joincont.isjoincontorwaiting()
			elif joincontshow == False:
				joincontshow = "UNJOINED"
			else:
				joincontshow = "error"
			context['joinprint'] = joincontshow
			context['form'] = GroupJoinForm
		else:
			context['group_detail'] = "Dont't data"
		return context

@method_decorator(decorators, name='dispatch')
class GroupListShow(ListView):
	model = CreateGroup
	template_name = "creategroup/selfshow_grouplist.html"
	template_name_suffix = '_grouplist'
	ordering = ['createdates']
	context_object_name = 'group_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(GroupListShow, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = CreateGroup.objects.all()
		return queryset

@method_decorator(decorators, name='dispatch')
class JoinerRelationsProcess(FormView):
	template_name = None
	success_url = None
	form_class = GroupJoinForm
	http_method_names = [u'get', u'post', u'put']
	
	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
	
	def get_form_class(self):
		return self.form_class
	
	def post(self, request, *args, **kwargs):
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		else:
			post_form = GroupJoinForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.membertype = post_form.cleaned_data['membertype']
				post_form.grouppk = post_form.cleaned_data['grouppk']
				post_form.userpk = post_form.cleaned_data['userpk']
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		post_form = form
		processdata = JoinControlFuncs(post_form.grouppk, post_form.userpk)
		if post_form.membertype == "UNJOINED":
			#joined yapacan
			returndatashow = processdata.requestjoin()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "JOINED":
			#unjoined yapcan
			returndatashow = processdata.canceljoin()
			if returndatashow == True:
				return HttpResponse(json.dumps({'showdata':'UNJOINED', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'showdata':'error', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "SENDEDREQUEST":
			#block unblock dugme eklemesi için değer döndür
			owngrouporcrossmain = CreateGroup.objects.get(pk = post_form.grouppk)
			owngrouporcross = owngrouporcrossmain.user
			groupslugforsend = owngrouporcrossmain.slug
			groupuserorcross = User.objects.get(pk = post_form.userpk)
			if owngrouporcross == groupuserorcross:
				return HttpResponse(json.dumps({'showdata':'SENDEDREQUEST', 'membertypeone':"UNJOINED", 'membertypetwo':"JOINED", 'membertypethree':"BLOCKED", 'grouppk':post_form.grouppk, 'groupslug': groupslugforsend, 'userpk':post_form.userpk}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'showdata':'CANCELREQUEST', 'grouppk':post_form.grouppk, 'groupslug': groupslugforsend, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "BLOCKED":
			#unblock fonksiyonunu çalıştır
			returndatashow = processdata.requnblocked()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "UNBLOCKED":
			#block fonksiyonu çalıştır
			returndatashow = processdata.reqblocked()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		elif post_form.membertype == "ACCEPTBLOCKED":
			#block fonksiyonu çalıştır
			returndatashow = processdata.reqaccept()
			return HttpResponse(json.dumps({'showdata':returndatashow, 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'showdata':'error', 'membertype':post_form.membertype, 'grouppk':post_form.grouppk, 'userpk':post_form.userpk}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")


#gönderi silinmesi için talep oluştur ve oylama işlemleri ile sil ve listele
@method_decorator(decorators, name='dispatch')
class DeletePostviaVotesView(FormView):
	#create del post
	template_name = None
	success_url = None
	form_class = DeletePostviaVotesForm
	http_method_names = [u'get', u'post', u'put']
	
	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def post(self, request, *args, **kwargs):
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		else:
			post_form = DeletePostviaVotesForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.deltype = post_form.cleaned_data['deltype']
				post_form.delgrouppk = post_form.cleaned_data['delgrouppk']
				post_form.delpostpk = post_form.cleaned_data['delpostpk']
				post_form.deluserpk = post_form.cleaned_data['deluserpk']
				post_form.delrequestoruserpk = post_form.cleaned_data['delrequestoruserpk']
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		post_form = form
		if post_form.deltype == "POSTUSERDELETEREQUEST":
			userdetail = User.objects.get(pk=post_form.delrequestoruserpk)
			groupdetail = CreateGroup.objects.get(pk = post_form.delgrouppk)
			joindetail = GroupJoin.objects.get(togroup = groupdetail, fromuser = userdetail)
			detaildelegate = BeDelegate.objects.filter(involvolvedgroup = groupdetail.id, delegateuser = post_form.delrequestoruserpk, joineruser = joindetail)
			#yukarı satırda delege kontrolü yapıldı
			if detaildelegate.exists() or groupdetail.user.id == self.request.user.id:
				getcontrol = DeletePostviaVotes.objects.filter(groupdelpost=post_form.delpostpk)
				if getcontrol.exists():
					return HttpResponse(json.dumps({'showdatadel':'already create delete request for post'}), content_type = "application/json")
				else:
					deluser = User.objects.get(pk=post_form.deluserpk)
					reqdeluser = User.objects.get(pk=post_form.delrequestoruserpk)
					fordelgroup = CreateGroup.objects.get(pk = post_form.delgrouppk)
					delpostget = GroupPostses.objects.get(pk=post_form.delpostpk)
					deletevoteuser, created = DeletePostviaVotes.objects.get_or_create(user = deluser, groupwhich = fordelgroup, groupdelpost = delpostget, delrequestoruser =reqdeluser)
					if created:
						#point start
						postcountcontrol = PostRequestDeleteCounter.objects.filter(user = self.request.user, whichgroup = fordelgroup.pk)
						if postcountcontrol.exists():
							for gcount in postcountcontrol:
								getcount = gcount.counter
							if getcount == '' or getcount == None:
								postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
							else:
								postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
						else:
							createpostcounter = PostRequestDeleteCounter(user = self.request.user, whichgroup = fordelgroup, updatedate = datetime.datetime.now())
							createpostcounter.save()
						#point stop
						#silinmesi talep edilen kullanıcının adı görünür
						return HttpResponse(json.dumps({'showdatausername':deletevoteuser.pk, 'deltype':post_form.deltype, 'delgrouppk':post_form.delgrouppk, 'deluserpk':post_form.deluserpk, 'delrequestoruserpk':post_form.delrequestoruserpk}), content_type = "application/json")
					else:
						return HttpResponse(json.dumps({'showdatadel':'already create delete request for this post'}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'showdatadel':'you dont this request'}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'showdataerror':'error', 'exporttype':post_form.deltype, 'exportgrouppk':post_form.exportgrouppk, 'exportuserpk':post_form.exportuserpk, 'requestoruserpk':post_form.requestoruserpk}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class DeletePostVoterProcess(FormView, SingleObjectMixin, DeletionMixin):
	#vote for del post
	template_name = None
	success_url = None
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	model=DeletePostviaVotes
	form_class = DelPostVoterForm
	http_method_names = [u'get', u'post', u'put']
	
	def winner_message_infotmations(self, whgrpget, whusrget):
		winpresident = "You win this group's president"+whgrpget.groupname
		presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = whusrget, messagechar = winpresident)
	
	def protect_message_informations(whgrpget):
		protectmessage = "You protect your president, concurgulations"+whgrpget.groupname
		protectpresident, protectedv = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = protectmessage)

	def loser_message_informations(self, whgrpget):
		#whgrpget kaybeden grubu get olarak aldım ve bunun kişisine (sahibine) .user deyerek mesaj göndersim.
		losepresidentmessage = "You lose this group's president"+whgrpget.groupname
		losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = losepresidentmessage)
	
	def second_group_have_president(self, grouppresident):
		most_now_time = datetime.datetime.now()
		startdate = most_now_time - datetime.timedelta(days=150)
		getwhgroup = CreateGroup.objects.filter(user = grouppresident)
		countgetwhgroup = getwhgroup.count()
		listerstuple = []
		groupdeltas = []
		crosstuple = []
		addgroupsort = []
		if getwhgroup.exists() and countgetwhgroup == 1:
			for ff in getwhgroup:
				fasd = ff.pk
			groupsjoinersget = GroupJoin.objects.filter(togroup = fasd, joinstatus = "JOINED")
			countgroupsjoinersget = groupsjoinersget.count()
			firstgroupget = CreateGroup.objects.get(pk = fasd)
			conter = 0
			while conter < countgroupsjoinersget:
				firstuserget = groupsjoinersget[conter].fromuser
				postpoint = PostCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for a in postpoint:
					getpostpo = a.counter
				if getpostpo:
					ccgetpostpo = getpostpo*9#+
				else:
					getpostpo = 0
				postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for b in postreqdelpoint:
					getreqdelpo = b.counter
				if getreqdelpo:
					ccgetreqdelpo = getreqdelpo*2#-
				else:
					ccgetreqdelpo = 0
				selfpostdelpoint = PostDelCount.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for c in selfpostdelpoint:
					getselfposdelpont = c.counter
				if getselfposdelpont:
					ccgetselfposdelpont = getselfposdelpont*3#-
				else:
					ccgetselfposdelpont = 0
				userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for d in userreqdelpoint:
					usedelpont = d.counter
				if usedelpont:
					ccusedelpont = usedelpont*3#-
				else:
					ccusedelpont = 0
				uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for e in uservoteposipoint:
					usevotpositpo = e.counter
				if usevotpositpo:
					ccusevotpositpo = usevotpositpo*1#+
				else:
					ccusevotpositpo = 0
				uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for f in uservotenegpoint:
					usvotnegpr = f.counter
				if usvotnegpr:
					ccusvotnegpr = usvotnegpr*1#-
				else:
					ccusvotnegpr = 0
				userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for g in userdelposivactpoint:
					usdelpoactpo = g.counter
				if usdelpoactpo:
					ccusdelpoactpo = usdelpoactpo*2#+
				else:
					ccusdelpoactpo = 0
				userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for h in userdelnegativactpoint:
					usedelnegactpos = h.counter
				if usedelnegactpos:
					ccusedelnegactpos = usedelnegactpos*2#-
				else:
					ccusedelnegactpos = 0
				usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
				tupleuserdegree = (usertotataccount, firstuserget.pk)
				listerstuple.append(tupleuserdegree)
				conter += 1
			listerstuple.sort()
			liscountes = len(listerstuple)
			loopcount = 0
			while loopcount < liscountes:
				getuserloop = listerstuple[loopcount][1]
				if getuserloop == grouppresident.pk:
					loopcount += 1
					continue
				else:
					getuserloop = listerstuple[loopcount][1]
					crgropuserloop = CreateGroup.objects.filter(user = getuserloop)
					if crgropuserloop.exists():
						if crgropuserloop.count() > 1:
							ggcount = 0
							while ggcount < crgropuserloop.count():
								firstwhgget = crgropuserloop[ggcount]
								samefirstwhgget = CreateGroup.objects.get(pk = firstwhgget.pk)
								getgrouppoints = group_point_account(samefirstwhgget, 150)
								whgrdegree = (getgrouppoints, samefirstwhgget.pk)
								groupdeltas.append(whgrdegree)
								ggcount += 1
							groupdeltas.sort()
							contgroupdelt = len(groupdeltas)
							delcont = 1
							while delcont < contgroupdelt:
								getdelgrp = CreateGroup.objects.filter(pk=groupdeltas[delcont][1])
								if getdelgrp.exists():
									getdelgrp.delete()
								else:
									break
								delcont += 1
							crossgrpoint = group_point_account(firstgroupget, 150)
							crosstuple.insert(0, (crossgrpoint, firstgroupget.pk))
							crosstuple.insert(1, (groupdeltas[0][0], groupdeltas[0][1]))
							crosstuple.sort()
							if crosstuple[0][1] == firstgroupget.pk:
								lowgrp = CreateGroup.objects.filter(pk = crosstuple[1][1])
								lowgrp.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								groupdeltas.clear()
								crosstuple.clear()
								break
						else:
							crgetgr = CreateGroup.objects.get(user = getuserloop)
							crgrppointer = group_point_account(crgetgr, 150)
							vrgrpoint = group_point_account(firstgroupget, 150)
							if vrgrpoint > crgrppointer:
								crgropuserloop.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								listerstuple.clear()
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								break
					else:
						chuserget = User.objects.get(pk = getuserloop)
						loser_message_informations(firstgroupget)
						winner_message_infotmations(firstgroupget, chuserget)
						firstgroupget.user = chuserget
						listerstuple.clear()
						break
				loopcount += 1
		elif getwhgroup.exists() and countgetwhgroup > 1:
			#gruplardan en büyük puanlısını bul gerisini sil kalan grupla işlem yap
			grcoude = 0
			while grcoude < countgetwhgroup:
				firtergetwhgroup = getwhgroup[grcoude]
				pointaccountfirt = group_point_account(firtergetwhgroup, 150)
				tuplefirtgr = (pointaccountfirt, firtergetwhgroup.pk)
				addgroupsort.append(tuplefirtgr)
				grcoude += 1
			addgroupsort.sort()
			sortaddgrcounts = len(addgroupsort)
			deltel = 1
			while deltel < sortaddgrcounts:
				grpkdelsget = addgroupsort[deltel][1]
				lowdelgrp = CreateGroup.objects.filter(pk = grpkdelsget)
				lowdelgrp.delete()
				deltel += 1
			getwhgroup = CreateGroup.objects.filter(pk = addgroupsort[0][1])
			addgroupsort.clear()
			for ff in getwhgroup:
				fasd = ff.pk
			groupsjoinersget = GroupJoin.objects.filter(togroup = fasd, joinstatus = "JOINED")
			countgroupsjoinersget = groupsjoinersget.count()
			firstgroupget = CreateGroup.objects.get(pk = fasd)
			conter = 0
			while conter < countgroupsjoinersget:
				firstuserget = groupsjoinersget[conter].fromuser
				postpoint = PostCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for a in postpoint:
					getpostpo = a.counter
				if getpostpo:
					ccgetpostpo = getpostpo*9#+
				else:
					getpostpo = 0
				postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for b in postreqdelpoint:
					getreqdelpo = b.counter
				if getreqdelpo:
					ccgetreqdelpo = getreqdelpo*2#-
				else:
					ccgetreqdelpo = 0
				selfpostdelpoint = PostDelCount.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for c in selfpostdelpoint:
					getselfposdelpont = c.counter
				if getselfposdelpont:
					ccgetselfposdelpont = getselfposdelpont*3#-
				else:
					ccgetselfposdelpont = 0
				userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for d in userreqdelpoint:
					usedelpont = d.counter
				if usedelpont:
					ccusedelpont = usedelpont*3#-
				else:
					ccusedelpont = 0
				uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for e in uservoteposipoint:
					usevotpositpo = e.counter
				if usevotpositpo:
					ccusevotpositpo = usevotpositpo*1#+
				else:
					ccusevotpositpo = 0
				uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for f in uservotenegpoint:
					usvotnegpr = f.counter
				if usvotnegpr:
					ccusvotnegpr = usvotnegpr*1#-
				else:
					ccusvotnegpr = 0
				userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for g in userdelposivactpoint:
					usdelpoactpo = g.counter
				if usdelpoactpo:
					ccusdelpoactpo = usdelpoactpo*2#+
				else:
					ccusdelpoactpo = 0
				userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for h in userdelnegativactpoint:
					usedelnegactpos = h.counter
				if usedelnegactpos:
					ccusedelnegactpos = usedelnegactpos*2#-
				else:
					ccusedelnegactpos = 0
				usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
				tupleuserdegree = (usertotataccount, firstuserget.pk)
				listerstuple.append(tupleuserdegree)
				conter += 1
			listerstuple.sort()
			liscountes = len(listerstuple)
			loopcount = 0
			while loopcount < liscountes:
				getuserloop = listerstuple[loopcount][1]
				if getuserloop == grouppresident.pk:
					loopcount += 1
					continue
				else:
					getuserloop = listerstuple[loopcount][1]
					crgropuserloop = CreateGroup.objects.filter(user = getuserloop)
					if crgropuserloop.exists():
						if crgropuserloop.count() > 1:
							ggcount = 0
							while ggcount < crgropuserloop.count():
								firstwhgget = crgropuserloop[ggcount]
								samefirstwhgget = CreateGroup.objects.get(pk = firstwhgget.pk)
								getgrouppoints = group_point_account(samefirstwhgget, 150)
								whgrdegree = (getgrouppoints, samefirstwhgget.pk)
								groupdeltas.append(whgrdegree)
								ggcount += 1
							groupdeltas.sort()
							contgroupdelt = len(groupdeltas)
							delcont = 1
							while delcont < contgroupdelt:
								getdelgrp = CreateGroup.objects.filter(pk=groupdeltas[delcont][1])
								if getdelgrp.exists():
									getdelgrp.delete()
								else:
									break
								delcont += 1
							crossgrpoint = group_point_account(firstgroupget, 150)
							crosstuple.insert(0, (crossgrpoint, firstgroupget.pk))
							crosstuple.insert(1, (groupdeltas[0][0], groupdeltas[0][1]))
							crosstuple.sort()
							if crosstuple[0][1] == firstgroupget.pk:
								lowgrp = CreateGroup.objects.filter(pk = crosstuple[1][1])
								lowgrp.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								groupdeltas.clear()
								crosstuple.clear()
								break
						else:
							crgetgr = CreateGroup.objects.get(user = getuserloop)
							crgrppointer = group_point_account(crgetgr, 150)
							vrgrpoint = group_point_account(firstgroupget, 150)
							if vrgrpoint > crgrppointer:
								crgropuserloop.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								listerstuple.clear()
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								break
					else:
						chuserget = User.objects.get(pk = getuserloop)
						loser_message_informations(firstgroupget)
						winner_message_infotmations(firstgroupget, chuserget)
						firstgroupget.user = chuserget
						listerstuple.clear()
						break
				loopcount += 1
		else:
			pass
	
	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		joinercontrol = GroupJoin.objects.filter(togroup = selectgroup.id, fromuser = self.request.user.id, joinstatus=JOINED)
		return joinercontrol
		
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		if not self.object.exists():
			return HttpResponse(json.dumps({'error':'you dont to use polls'}), content_type = "application/json")
		else:
			post_form = DelPostVoterForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.deltype = post_form.cleaned_data['deltype']#deltype DeletePostviaVotes id yi temsil ediyor
				post_form.delgrouppk = post_form.cleaned_data['delgrouppk']
				post_form.delpostid = post_form.cleaned_data['delpostid']
				post_form.exportup = post_form.cleaned_data['exportup']
				post_form.exportdown = post_form.cleaned_data['exportdown']
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		post_form = form
		voteridget = int(post_form.deltype)
		forpostgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		groupostcount = GroupPostses(user=self.request.user.id, creategrouppost=forpostgroup).count()
		pollcontrol = DeletePostviaVotes.objects.filter(pk = voteridget, groupwhich = post_form.delgrouppk, groupdelpost = post_form.delpostid, delrequestoruser = self.request.user.id)
		if pollcontrol.exists():
			return HttpResponse(json.dumps({'error':'you vote requestor'}), content_type = "application/json")
		elif groupostcount < 150:
			return HttpResponse(json.dumps({'error':'your posted count 150 down'}), content_type = "application/json")
		else:
			getvoteruser = DeletePostviaVotes.objects.get(pk = voteridget)
			filtergetvoteruser = DeletePostviaVotes.objects.filter(pk = voteridget)
			if getvoteruser.votes.exists(self.request.user.id):
				return HttpResponse(json.dumps({'error':'you vote already'}), content_type = "application/json")
			elif post_form.exportup == 'true':
				getvoteruser.votes.up(self.request.user.id)
				votercount = getvoteruser.votes.count()
				selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
				countjoiner = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus='JOINED').count()
				getcountjoiner = countjoiner/2
				now = datetime.datetime.now().month
				getvoterusertime = getvoteruser.createdates
				getvoterusertime = getvoterusertime.month
				getcontroltime = now - getvoterusertime
				likecountpost = GroupPostses.objects.get(pk=post_form.delpostid)
				getlikecount = likecountpost.votes.count()
				if getcontroltime > 7 and filtergetvoteruser.exists():
					getvoteruser.delete()
				elif votercount > getcountjoiner and filtergetvoteruser.exists():
					blockuserget = GroupJoin.objects.filter(togroup=selectgroup.id, fromuser=getvoteruser.user.id)
					deletedpostget = GroupPostses.objects.filter(pk=post_form.delpostid)
					if selectgroup.user == getvoteruser.user:
						valcountjoiner = countjoiner*90/100
						if votercount > valcountjoiner and deletedpostget.exists() and getvoteruser.deletestatus == 'OPEN':
							deletedpostget.delete()
							filtergetvoteruser.update(deletestatus='CLOSED')#eğer 300 gönderi ve üzeri ve toplamın 1/3 ü silinsin talebi oluşmuşsa başkan değişir.
							#başkan değişim kos satırı
							totalpostpresident = GroupPostses.objects.filter(user=selectgroup.user.id, creategrouppost=selectgroup.id).count()
							totalreqdelpost = DeletePostviaVotes.objects.filter(user=selectgroup.user.id, groupwhich=selectgroup.id, deletestatus='CLOSED').count()
							if totalreqdelpost > 300 and totalreqdelpost > totalpostpresident/2:
								#point start
								postcountcontrol = UserVotePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
								if postcountcontrol.exists():
									for gcount in postcountcontrol:
										getcount = gcount.counter
									if getcount == '' or getcount == None:
										postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
									else:
										postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
								else:
									createpostcounter = UserVotePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
									createpostcounter.save()
								#point stop
								#başkan seçim başlangıç
								most_now_time = datetime.datetime.now()
								startdate = most_now_time - datetime.timedelta(days=120)
								userstartcontrol = CreateGroup.objects.filter(pk=forpostgroup.pk, grouppostcounter__createdate__gt=startdate, togroupjoin__createdates__lte=startdate)
								startcontrolmostpost = userstartcontrol.annotate(the_most_post_count = Max('grouppostcounter__counter')).filter(the_most_post_count__gt=300).order_by('the_most_post_count')[:6]
								leastpostdel = userstartcontrol.annotate(the_least_post_delete_req=Min('grouppostrequestdelcounter__counter')).filter(the_least_post_delete_req__lte=20).order_by('the_least_post_delete_req')[:6]
								ownpostdel = userstartcontrol.annotate(self_post_delete=Min('groupdelcount__counter')).filter(self_post_delete__lte=20).order_by('self_post_delete')[:6]
								leastuserdel = userstartcontrol.annotate(least_user_delete=Min('groupuserdelcounter__counter')).filter(least_user_delete__lte).order_by('least_user_delete')[:6]
								leastposivoteuser = userstartcontrol.annotate(least_possitive_vote_post=Min('grouppositivecounter__counter')).order_by('least_possitive_vote_post')[:6]
								maxnegativvoteuser = userstartcontrol.annotate(most_negative_vote_post=Max('groupnegativecounter__counter')).order_by('most_negative_vote_post')[:6]
								leastposvuserdel = userstartcontrol.annotate(least_possitive_vote_user_delete=Min('usergrouppositivecounter__counter')).order_by('least_possitive_vote_user_delete')[:6]
								maxnegativeuserstay = userstartcontrol.annotate(most_negative_vote_user_stay=Max('usergroupnegativecounter__counter')).order_by('most_negative_vote_user_stay')[:6]
								iplus = 0
								changeusercont = False
								while iplus<6:
									firststartcontrolmostpost = startcontrolmostpost[iplus]
									for i in  firststartcontrolmostpost:
										getusermostpost = i.user
									leastpostdeli = 0
									while leastpostdeli < 6 :
										firstleastpostdel = leastpostdel[leastpostdeli]
										for f in firstleastpostdel:
											getleastpostdel = f.user
										if getusermostpost == getleastpostdel:
											owni = 0
											while owni < 6:
												firstownpostdel = ownpostdel[owni]
												for ow in firstownpostdel:
													getowuser = ow.user
												if getusermostpost == getowuser:
													lessuseri = 0
													while lessuseri < 6:
														firstleastuserdel = leastuserdel[lessuseri]
														for g in firstleastuserdel:
															getleastuserdel = g.user
														if getusermostpost == getleastuserdel:
															leastpostvvoti = 0
															while leastpostvvoti < 6:
																firstleastposivoteuser = leastposivoteuser[leastpostvvoti]
																for h in firstleastposivoteuser:
																	getleastposivoteuser = h.user
																if getusermostpost == getleastposivoteuser:
																	maxnegtvvotuseri = 0
																	while maxnegtvvotuseri < 6:
																		firstmaxnegativvoteuser = maxnegativvoteuser[maxnegtvvotuseri]
																		for zi in firstmaxnegativvoteuser:
																			getmaxnegativvoteuser = zi.user
																		if getusermostpost == getmaxnegativvoteuser:
																			leastpostvusercci = 0
																			while leastpostvusercci < 6:
																				firstleastposvuserdel = leastposvuserdel[leastpostvusercci]
																				for ffl in firstleastposvuserdel:
																					getleastposvuserdel = ffl.user
																				if getusermostpost == getleastposvuserdel:
																					maxnegativeuserstaycci = 0
																					while maxnegativeuserstaycci < 6:
																						firstmaxnegativeuserstay = maxnegativeuserstay[maxnegativeuserstaycci]
																						for kkl in firstmaxnegativeuserstay:
																							getmaxnegativeuserstay = kkl.user
																						if getusermostpost == getmaxnegativeuserstay:
																							changeusercont = True
																							break
																						else:
																							maxnegativeuserstaycci += 1
																							continue
																					break
																				else:
																					leastpostvusercci += 1
																					continue
																			break
																		else:
																			maxnegtvvotuseri += 1
																			continue
																	break
																else:
																	leastpostvvoti += 1
																	continue
															break
														else:
															lessuseri += 1
															continue
													break
												else:
													owni += 1
													continue
											break
										else:
											leastpostdeli += 1
											continue
									iplus += 1
								groupgetforuserchange = CreateGroup.objects.filter(pk=getid, slug=getslug)
								if changeusercont == True:
									#grup başkanı olan ve başkanlığı kaybolan bilgilendirilir bu kod blogunu yaz
									#ek başla
									availusercont = CreateGroup.objects.filter(user = getusermostpost)
									if availusercont.exists():
										countavailusercont = availusercont.count()
										availcount = 0
										while availcount < countavailusercont:
											getavailusercont = availusercont[availcount]
											havegroupusersget = GroupJoin.objects.filter(togroup = getavailusercont.pk, joinstatus = 'JOINED')
											counthavegroupusersget = havegroupusersget.count()
											couhavus = 0
											while couhavus < counthavegroupusersget:
												onegroupjoinget = havegroupusersget[couhavus]
												useronegroupjoin = onegroupjoinget.fromuser.pk
												postpoint = PostCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for a in postpoint:
													getpostpo = a.counter
												if getpostpo:
													ccgetpostpo = getpostpo*9#+
												else:
													getpostpo = 0
												postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for b in postreqdelpoint:
													getreqdelpo = b.counter
												if getreqdelpo:
													ccgetreqdelpo = getreqdelpo*2#-
												else:
													ccgetreqdelpo = 0
												selfpostdelpoint = PostDelCount.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for c in selfpostdelpoint:
													getselfposdelpont = c.counter
												if getselfposdelpont:
													ccgetselfposdelpont = getselfposdelpont*3#-
												else:
													ccgetselfposdelpont = 0
												userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for d in userreqdelpoint:
													usedelpont = d.counter
												if usedelpont:
													ccusedelpont = usedelpont*3#-
												else:
													ccusedelpont = 0
												uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for e in uservoteposipoint:
													usevotpositpo = e.counter
												if usevotpositpo:
													ccusevotpositpo = usevotpositpo*1#+
												else:
													ccusevotpositpo = 0
												uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for f in uservotenegpoint:
													usvotnegpr = f.counter
												if usvotnegpr:
													ccusvotnegpr = usvotnegpr*1#-
												else:
													ccusvotnegpr = 0
												userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for g in userdelposivactpoint:
													usdelpoactpo = g.counter
												if usdelpoactpo:
													ccusdelpoactpo = usdelpoactpo*2#+
												else:
													ccusdelpoactpo = 0
												userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
												for h in userdelnegativactpoint:
													usedelnegactpos = h.counter
												if usedelnegactpos:
													ccusedelnegactpos = usedelnegactpos*2#-
												else:
													ccusedelnegactpos = 0
												usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
												tupleuserdegree = (usertotataccount, useronegroupjoin)
												sortlistadd.append(tupleuserdegree)
												couhavus += 1
											sortlistadd.sort()
											sortlistcountsd = len(sortlistadd)
											####### bir kişiyi sahip yapabilmek için başkan seçilenin eski grubuna başkası atandı ama bu atanan kişinin sahip olduğu bir grup varsa o ne olacak ona yarın bak
											if sortlistcountsd == 1 and getavailusercont != groupgetforuserchange:
												delnpresident = "Your group is delete"+getavailusercont.groupname
												deletknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = delnpresident)
												getavailusercont.delete()
											elif sortlistcountsd > 1 and getavailusercont == groupgetforuserchange and sortlistadd[0][1] != getusermostpost.pk:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
											elif sortlistcountsd > 1 and getavailusercont == groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
											elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
											elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] != getusermostpost.pk:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
											else:
												if sortlistadd[0][1] == getusermostpost.pk:
													oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
													#self.second_group_have_president(oldgroupchangeuser)
													second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
													getavailusercont.user = oldgroupchangeuser
													self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
													self.loser_message_informations(getusermostpost)
												else:
													oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
													#self.second_group_have_president(oldgroupchangeuser)
													second_group_have_president_delete.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
													getavailusercont.user = oldgroupchangeuser
													self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
													self.loser_message_informations(getusermostpost)
													#######
											sortlistadd.clear()
											availcount += 1
										#ek bitir
										newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
										winpresident = "You win this group's president"+forpostgroup.groupname
										presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = winpresident)
										losepresidentmessage = "You lose this group's president"+forpostgroup.groupname
										losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = losepresidentmessage)
									else:
										newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
										winpresident = "You win this group's president"+forpostgroup.groupname
										presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = winpresident)
										losepresidentmessage = "You lose this group's president"+forpostgroup.groupname
										losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = losepresidentmessage)
								else:
									#grup başkanı başkanlığını korouduğu bilgisi verilir
									newgrouppresident = groupgetforuserchange.update(updates = datetime.datetime.now())
									changemessage = "You stay group president"+forpostgroup.groupname
									statuspresident, created = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = changemessage)
								#başkan seçim bitimi
								return  HttpResponse(json.dumps({'warn':'post delete'}), content_type = "application/json")
							else:
								#point start
								postcountcontrol = UserVotePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
								if postcountcontrol.exists():
									for gcount in postcountcontrol:
										getcount = gcount.counter
									if getcount == '' or getcount == None:
										postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
									else:
										postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
								else:
									createpostcounter = UserVotePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
									createpostcounter.save()
								#point stop
								return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
						else:
							#point start
							postcountcontrol = UserVotePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
							if postcountcontrol.exists():
								for gcount in postcountcontrol:
									getcount = gcount.counter
								if getcount == '' or getcount == None:
									postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
								else:
									postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
							else:
								createpostcounter = UserVotePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
								createpostcounter.save()
							#point stop
							return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
					else:
						#point start
						postcountcontrol = UserVotePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
						if postcountcontrol.exists():
							for gcount in postcountcontrol:
								getcount = gcount.counter
							if getcount == '' or getcount == None:
								postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
							else:
								postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
						else:
							createpostcounter = UserVotePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
							createpostcounter.save()
						#point stop
						if deletedpostget.exists() and getvoteruser.deletestatus == 'OPEN':
							deletedpostget.delete()
							filtergetvoteruser.update(deletestatus='CLOSED')
							return HttpResponse(json.dumps({'warn':'post deleted'}), content_type = "application/json")
						else:
							return HttpResponse(json.dumps({'warn':'this post is not available'}), content_type = "application/json")
				else:
					#point start
					postcountcontrol = UserVotePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
					if postcountcontrol.exists():
						for gcount in postcountcontrol:
							getcount = gcount.counter
						if getcount == '' or getcount == None:
							postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
						else:
							postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
					else:
						createpostcounter = UserVotePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
						createpostcounter.save()
					#point stop
				return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
			elif post_form.exportdown == 'true':
				getvoteruser.votes.down(self.request.user.id)
				votercount = getvoteruser.votes.count()
				#point start
				postcountcontrol = UserVoteNegativeActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
				if postcountcontrol.exists():
					for gcount in postcountcontrol:
						getcount = gcount.counter
					if getcount == '' or getcount == None:
						postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
					else:
						postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
				else:
					createpostcounter = UserVoteNegativeActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
					createpostcounter.save()
				#point stop
				return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'you do wrong think'}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")



@method_decorator(decorators, name='dispatch')
class DeletePostVoterList(ListView, SingleObjectMixin, FormMixin):
	model = DeletePostviaVotes
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/deletepostvoter_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = DelPostVoterForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(DeletePostVoterList, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		usergroupown = selectgroup.user
		delegateuserget = BeDelegate.objects.filter(involvolvedgroup= selectgroup.id, delegateuser=self.request.user.id)
		joinercontrol = GroupJoin.objects.filter(togroup=selectgroup.id, fromuser=self.request.user.id, joinstatus="JOINED")
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = DeletePostviaVotes.objects.filter(groupwhich=selectgroup.id, deletestatus = "OPEN")
				return queryset
			elif usergroupown != self.request.user and delegateuserget.exists() or joinercontrol.exists():
				queryset = DeletePostviaVotes.objects.filter(groupwhich=selectgroup.id, deletestatus = "OPEN")
				return queryset
			else:
				queryset=None
				return queryset
		else:
			queryset=None
			return queryset
#gönderi silinmesi işlemlerinin sonu

@method_decorator(decorators, name='dispatch')
class ExportUserProcess(FormView):
	template_name = None
	success_url = None
	form_class = ExportUserForm
	http_method_names = [u'get', u'post', u'put']
	
	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def post(self, request, *args, **kwargs):
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		else:
			post_form = ExportUserForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.exporttype = post_form.cleaned_data['exporttype']
				post_form.exportgrouppk = int(post_form.cleaned_data['exportgrouppk'])
				post_form.exportuserpk = int(post_form.cleaned_data['exportuserpk'])
				post_form.requestoruserpk = int(post_form.cleaned_data['requestoruserpk'])
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		post_form = form
		if post_form.exporttype == "USERDELETEREQUEST":
			userdetail = User.objects.get(pk=post_form.requestoruserpk)
			groupdetail = CreateGroup.objects.get(pk = post_form.exportgrouppk)
			joindetail = GroupJoin.objects.get(togroup = groupdetail, fromuser = userdetail)
			detaildelegate = BeDelegate.objects.filter(involvolvedgroup = groupdetail.id, delegateuser = post_form.requestoruserpk, joineruser = joindetail)
			#yukarı satırda delege kontrolü yapıldı
			if detaildelegate.exists() or groupdetail.user.id == self.request.user.id:
				getcontrol = ExportUser.objects.filter(user=post_form.exportuserpk)
				if getcontrol.exists():
					return HttpResponse(json.dumps({'already':'already create user delete request'}), content_type = "application/json")
				else:
					deluser = User.objects.get(pk=post_form.exportuserpk)
					reqdeluser = User.objects.get(pk=post_form.requestoruserpk)
					fordelgroup = CreateGroup.objects.get(pk = post_form.exportgrouppk)
					deletevoteuser, created = ExportUser.objects.get_or_create(user = deluser, groupwhich = fordelgroup, requestoruser =reqdeluser)
					if created:
						#point start
						postcountcontrol = UserRequestDeleteCounter.objects.filter(user = self.request.user, whichgroup = groupdetail.pk)
						if postcountcontrol.exists():
							for gcount in postcountcontrol:
								getcount = gcount.counter
							if getcount == '' or getcount == None:
								postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
							else:
								postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
						else:
							createpostcounter = UserRequestDeleteCounter(user = self.request.user, whichgroup = groupdetail, updatedate = datetime.datetime.now())
							createpostcounter.save()
						#point stop
						#silinmesi talep edilen kullanıcının adı görünür
						return HttpResponse(json.dumps({'showdata':deletevoteuser.user.username, 'exporttype':post_form.exporttype, 'exportgrouppk':post_form.exportgrouppk, 'exportuserpk':post_form.exportuserpk, 'requestoruserpk':post_form.requestoruserpk}), content_type = "application/json")
					else:
						return HttpResponse(json.dumps({'already':'already create user delete request'}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'already':'you dont this request'}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'showdataerror':'error', 'exporttype':post_form.exporttype, 'exportgrouppk':post_form.exportgrouppk, 'exportuserpk':post_form.exportuserpk, 'requestoruserpk':post_form.requestoruserpk}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class ExportUserVoterProcess(FormView, SingleObjectMixin, DeletionMixin):
	template_name = None
	success_url = None
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	model=ExportUser
	form_class = ExportUserVoterForm
	http_method_names = [u'get', u'post', u'put']
	
	def winner_message_infotmations(self, whgrpget, whusrget):
		winpresident = "You win this group's president"+whgrpget.groupname
		presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = whusrget, messagechar = winpresident)
	
	def protect_message_informations(whgrpget):
		protectmessage = "You protect your president, concurgulations"+whgrpget.groupname
		protectpresident, protectedv = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = protectmessage)

	def loser_message_informations(self, whgrpget):
		#whgrpget kaybeden grubu get olarak aldım ve bunun kişisine (sahibine) .user deyerek mesaj göndersim.
		losepresidentmessage = "You lose this group's president"+whgrpget.groupname
		losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = losepresidentmessage)
	
	def second_group_have_president(self, grouppresident):
		most_now_time = datetime.datetime.now()
		startdate = most_now_time - datetime.timedelta(days=150)
		getwhgroup = CreateGroup.objects.filter(user = grouppresident)
		countgetwhgroup = getwhgroup.count()
		listerstuple = []
		groupdeltas = []
		crosstuple = []
		addgroupsort = []
		if getwhgroup.exists() and countgetwhgroup == 1:
			for ff in getwhgroup:
				fasd = ff.pk
			groupsjoinersget = GroupJoin.objects.filter(togroup = fasd, joinstatus = "JOINED")
			countgroupsjoinersget = groupsjoinersget.count()
			firstgroupget = CreateGroup.objects.get(pk = fasd)
			conter = 0
			while conter < countgroupsjoinersget:
				firstuserget = groupsjoinersget[conter].fromuser
				postpoint = PostCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for a in postpoint:
					getpostpo = a.counter
				if getpostpo:
					ccgetpostpo = getpostpo*9#+
				else:
					getpostpo = 0
				postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for b in postreqdelpoint:
					getreqdelpo = b.counter
				if getreqdelpo:
					ccgetreqdelpo = getreqdelpo*2#-
				else:
					ccgetreqdelpo = 0
				selfpostdelpoint = PostDelCount.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for c in selfpostdelpoint:
					getselfposdelpont = c.counter
				if getselfposdelpont:
					ccgetselfposdelpont = getselfposdelpont*3#-
				else:
					ccgetselfposdelpont = 0
				userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for d in userreqdelpoint:
					usedelpont = d.counter
				if usedelpont:
					ccusedelpont = usedelpont*3#-
				else:
					ccusedelpont = 0
				uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for e in uservoteposipoint:
					usevotpositpo = e.counter
				if usevotpositpo:
					ccusevotpositpo = usevotpositpo*1#+
				else:
					ccusevotpositpo = 0
				uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for f in uservotenegpoint:
					usvotnegpr = f.counter
				if usvotnegpr:
					ccusvotnegpr = usvotnegpr*1#-
				else:
					ccusvotnegpr = 0
				userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for g in userdelposivactpoint:
					usdelpoactpo = g.counter
				if usdelpoactpo:
					ccusdelpoactpo = usdelpoactpo*2#+
				else:
					ccusdelpoactpo = 0
				userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for h in userdelnegativactpoint:
					usedelnegactpos = h.counter
				if usedelnegactpos:
					ccusedelnegactpos = usedelnegactpos*2#-
				else:
					ccusedelnegactpos = 0
				usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
				tupleuserdegree = (usertotataccount, firstuserget.pk)
				listerstuple.append(tupleuserdegree)
				conter += 1
			listerstuple.sort()
			liscountes = len(listerstuple)
			loopcount = 0
			while loopcount < liscountes:
				getuserloop = listerstuple[loopcount][1]
				if getuserloop == grouppresident.pk:
					loopcount += 1
					continue
				else:
					getuserloop = listerstuple[loopcount][1]
					crgropuserloop = CreateGroup.objects.filter(user = getuserloop)
					if crgropuserloop.exists():
						if crgropuserloop.count() > 1:
							ggcount = 0
							while ggcount < crgropuserloop.count():
								firstwhgget = crgropuserloop[ggcount]
								samefirstwhgget = CreateGroup.objects.get(pk = firstwhgget.pk)
								getgrouppoints = group_point_account(samefirstwhgget, 150)
								whgrdegree = (getgrouppoints, samefirstwhgget.pk)
								groupdeltas.append(whgrdegree)
								ggcount += 1
							groupdeltas.sort()
							contgroupdelt = len(groupdeltas)
							delcont = 1
							while delcont < contgroupdelt:
								getdelgrp = CreateGroup.objects.filter(pk=groupdeltas[delcont][1])
								if getdelgrp.exists():
									getdelgrp.delete()
								else:
									break
								delcont += 1
							crossgrpoint = group_point_account(firstgroupget, 150)
							crosstuple.insert(0, (crossgrpoint, firstgroupget.pk))
							crosstuple.insert(1, (groupdeltas[0][0], groupdeltas[0][1]))
							crosstuple.sort()
							if crosstuple[0][1] == firstgroupget.pk:
								lowgrp = CreateGroup.objects.filter(pk = crosstuple[1][1])
								lowgrp.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								groupdeltas.clear()
								crosstuple.clear()
								break
						else:
							crgetgr = CreateGroup.objects.get(user = getuserloop)
							crgrppointer = group_point_account(crgetgr, 150)
							vrgrpoint = group_point_account(firstgroupget, 150)
							if vrgrpoint > crgrppointer:
								crgropuserloop.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								listerstuple.clear()
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								break
					else:
						chuserget = User.objects.get(pk = getuserloop)
						loser_message_informations(firstgroupget)
						winner_message_infotmations(firstgroupget, chuserget)
						firstgroupget.user = chuserget
						listerstuple.clear()
						break
				loopcount += 1
		elif getwhgroup.exists() and countgetwhgroup > 1:
			#gruplardan en büyük puanlısını bul gerisini sil kalan grupla işlem yap
			grcoude = 0
			while grcoude < countgetwhgroup:
				firtergetwhgroup = getwhgroup[grcoude]
				pointaccountfirt = group_point_account(firtergetwhgroup, 150)
				tuplefirtgr = (pointaccountfirt, firtergetwhgroup.pk)
				addgroupsort.append(tuplefirtgr)
				grcoude += 1
			addgroupsort.sort()
			sortaddgrcounts = len(addgroupsort)
			deltel = 1
			while deltel < sortaddgrcounts:
				grpkdelsget = addgroupsort[deltel][1]
				lowdelgrp = CreateGroup.objects.filter(pk = grpkdelsget)
				lowdelgrp.delete()
				deltel += 1
			getwhgroup = CreateGroup.objects.filter(pk = addgroupsort[0][1])
			addgroupsort.clear()
			for ff in getwhgroup:
				fasd = ff.pk
			groupsjoinersget = GroupJoin.objects.filter(togroup = fasd, joinstatus = "JOINED")
			countgroupsjoinersget = groupsjoinersget.count()
			firstgroupget = CreateGroup.objects.get(pk = fasd)
			conter = 0
			while conter < countgroupsjoinersget:
				firstuserget = groupsjoinersget[conter].fromuser
				postpoint = PostCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for a in postpoint:
					getpostpo = a.counter
				if getpostpo:
					ccgetpostpo = getpostpo*9#+
				else:
					getpostpo = 0
				postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for b in postreqdelpoint:
					getreqdelpo = b.counter
				if getreqdelpo:
					ccgetreqdelpo = getreqdelpo*2#-
				else:
					ccgetreqdelpo = 0
				selfpostdelpoint = PostDelCount.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for c in selfpostdelpoint:
					getselfposdelpont = c.counter
				if getselfposdelpont:
					ccgetselfposdelpont = getselfposdelpont*3#-
				else:
					ccgetselfposdelpont = 0
				userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for d in userreqdelpoint:
					usedelpont = d.counter
				if usedelpont:
					ccusedelpont = usedelpont*3#-
				else:
					ccusedelpont = 0
				uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for e in uservoteposipoint:
					usevotpositpo = e.counter
				if usevotpositpo:
					ccusevotpositpo = usevotpositpo*1#+
				else:
					ccusevotpositpo = 0
				uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for f in uservotenegpoint:
					usvotnegpr = f.counter
				if usvotnegpr:
					ccusvotnegpr = usvotnegpr*1#-
				else:
					ccusvotnegpr = 0
				userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for g in userdelposivactpoint:
					usdelpoactpo = g.counter
				if usdelpoactpo:
					ccusdelpoactpo = usdelpoactpo*2#+
				else:
					ccusdelpoactpo = 0
				userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = firstuserget, whichgroup = firstgroupget, createdate__gt = startdate)
				for h in userdelnegativactpoint:
					usedelnegactpos = h.counter
				if usedelnegactpos:
					ccusedelnegactpos = usedelnegactpos*2#-
				else:
					ccusedelnegactpos = 0
				usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
				tupleuserdegree = (usertotataccount, firstuserget.pk)
				listerstuple.append(tupleuserdegree)
				conter += 1
			listerstuple.sort()
			liscountes = len(listerstuple)
			loopcount = 0
			while loopcount < liscountes:
				getuserloop = listerstuple[loopcount][1]
				if getuserloop == grouppresident.pk:
					loopcount += 1
					continue
				else:
					getuserloop = listerstuple[loopcount][1]
					crgropuserloop = CreateGroup.objects.filter(user = getuserloop)
					if crgropuserloop.exists():
						if crgropuserloop.count() > 1:
							ggcount = 0
							while ggcount < crgropuserloop.count():
								firstwhgget = crgropuserloop[ggcount]
								samefirstwhgget = CreateGroup.objects.get(pk = firstwhgget.pk)
								getgrouppoints = group_point_account(samefirstwhgget, 150)
								whgrdegree = (getgrouppoints, samefirstwhgget.pk)
								groupdeltas.append(whgrdegree)
								ggcount += 1
							groupdeltas.sort()
							contgroupdelt = len(groupdeltas)
							delcont = 1
							while delcont < contgroupdelt:
								getdelgrp = CreateGroup.objects.filter(pk=groupdeltas[delcont][1])
								if getdelgrp.exists():
									getdelgrp.delete()
								else:
									break
								delcont += 1
							crossgrpoint = group_point_account(firstgroupget, 150)
							crosstuple.insert(0, (crossgrpoint, firstgroupget.pk))
							crosstuple.insert(1, (groupdeltas[0][0], groupdeltas[0][1]))
							crosstuple.sort()
							if crosstuple[0][1] == firstgroupget.pk:
								lowgrp = CreateGroup.objects.filter(pk = crosstuple[1][1])
								lowgrp.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								groupdeltas.clear()
								crosstuple.clear()
								break
						else:
							crgetgr = CreateGroup.objects.get(user = getuserloop)
							crgrppointer = group_point_account(crgetgr, 150)
							vrgrpoint = group_point_account(firstgroupget, 150)
							if vrgrpoint > crgrppointer:
								crgropuserloop.delete()
								chuserget = User.objects.get(pk = getuserloop)
								loser_message_informations(firstgroupget)
								winner_message_infotmations(firstgroupget, chuserget)
								firstgroupget.user = chuserget
								listerstuple.clear()
								break
							else:
								lowgrp = CreateGroup.objects.filter(pk = firstgroupget.pk)
								lowgrp.delete()
								listerstuple.clear()
								break
					else:
						chuserget = User.objects.get(pk = getuserloop)
						loser_message_informations(firstgroupget)
						winner_message_infotmations(firstgroupget, chuserget)
						firstgroupget.user = chuserget
						listerstuple.clear()
						break
				loopcount += 1
		else:
			pass
	
	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		joinercontrol = GroupJoin.objects.filter(togroup = selectgroup.id, fromuser = self.request.user.id, joinstatus=JOINED)
		return joinercontrol
		
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		if not self.object.exists():
			return HttpResponse(json.dumps({'error':'you dont to use polls'}), content_type = "application/json")
		else:
			post_form = ExportUserVoterForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.exporttype = post_form.cleaned_data['exporttype']
				post_form.exportgrouppk = post_form.cleaned_data['exportgrouppk']
				post_form.exportup = post_form.cleaned_data['exportup']
				post_form.exportdown = post_form.cleaned_data['exportdown']
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))
	
	def form_valid(self, form):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		post_form = form
		voteridget = int(post_form.exporttype)
		forpostgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		groupostcount = GroupPostses(user=self.request.user.id, creategrouppost=forpostgroup).count()
		pollcontrol = ExportUser.objects.filter(pk = voteridget, groupwhich = post_form.exportgrouppk, requestoruser = self.request.user.id)
		if pollcontrol.exists():
			return HttpResponse(json.dumps({'error':'you vote requestor'}), content_type = "application/json")
		elif groupostcount < 150:
			return HttpResponse(json.dumps({'error':'your posted count 150 down'}), content_type = "application/json")
		else:
			getvoteruser = get_object_or_404(ExportUser, pk = voteridget)
			filtergetvoteruser = ExportUser.objects.filter(pk = voteridget)
			if getvoteruser.votes.exists(self.request.user.id):
				return HttpResponse(json.dumps({'error':'you vote already'}), content_type = "application/json")
			elif post_form.exportup == 'true':
				getvoteruser.votes.up(self.request.user.id)
				votercount = getvoteruser.votes.count()
				selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
				countjoiner = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus='JOINED').count()
				getcountjoiner = countjoiner/2
				now = datetime.datetime.now().month
				getvoterusertime = getvoteruser.createdates
				getvoterusertime = getvoterusertime.month
				getcontroltime = now - getvoterusertime
				if getcontroltime > 7 and filtergetvoteruser.exists():
					getvoteruser.delete()
				elif votercount > getcountjoiner and filtergetvoteruser.exists():
					blockuserget = GroupJoin.objects.filter(togroup=selectgroup.id, fromuser=getvoteruser.user.id)
					if selectgroup.user == getvoteruser.user and getvoteruser.exportstatus == 'OPEN':
						valcountjoiner = countjoiner*90/100
						if votercount > valcountjoiner:
							blockuserget.update(joinstatus='BLOCKED')
							getvoteruser.exportstatus = "CLOSED"
							getvoteruser.save(update_fields=['exportstatus'])
							#başkan seçim başlangıç
							most_now_time = datetime.datetime.now()
							startdate = most_now_time - datetime.timedelta(days=120)
							userstartcontrol = CreateGroup.objects.filter(pk=forpostgroup.pk, grouppostcounter__createdate__gt=startdate, togroupjoin__createdates__lte=startdate)
							startcontrolmostpost = userstartcontrol.annotate(the_most_post_count = Max('grouppostcounter__counter')).filter(the_most_post_count__gt=300).order_by('the_most_post_count')[:6]
							leastpostdel = userstartcontrol.annotate(the_least_post_delete_req=Min('grouppostrequestdelcounter__counter')).filter(the_least_post_delete_req__lte=20).order_by('the_least_post_delete_req')[:6]
							ownpostdel = userstartcontrol.annotate(self_post_delete=Min('groupdelcount__counter')).filter(self_post_delete__lte=20).order_by('self_post_delete')[:6]
							leastuserdel = userstartcontrol.annotate(least_user_delete=Min('groupuserdelcounter__counter')).filter(least_user_delete__lte).order_by('least_user_delete')[:6]
							leastposivoteuser = userstartcontrol.annotate(least_possitive_vote_post=Min('grouppositivecounter__counter')).order_by('least_possitive_vote_post')[:6]
							maxnegativvoteuser = userstartcontrol.annotate(most_negative_vote_post=Max('groupnegativecounter__counter')).order_by('most_negative_vote_post')[:6]
							leastposvuserdel = userstartcontrol.annotate(least_possitive_vote_user_delete=Min('usergrouppositivecounter__counter')).order_by('least_possitive_vote_user_delete')[:6]
							maxnegativeuserstay = userstartcontrol.annotate(most_negative_vote_user_stay=Max('usergroupnegativecounter__counter')).order_by('most_negative_vote_user_stay')[:6]
							iplus = 0
							changecreategroupuser = False
							while iplus<6:
								firststartcontrolmostpost = startcontrolmostpost[iplus]
								for i in  firststartcontrolmostpost:
									getusermostpost = i.user
								leastpostdeli = 0
								while leastpostdeli < 6 :
									firstleastpostdel = leastpostdel[leastpostdeli]
									for f in firstleastpostdel:
										getleastpostdel = f.user
									if getusermostpost == getleastpostdel:
										owni = 0
										while owni < 6:
											firstownpostdel = ownpostdel[owni]
											for ow in firstownpostdel:
												getowuser = ow.user
											if getusermostpost == getowuser:
												lessuseri = 0
												while lessuseri < 6:
													firstleastuserdel = leastuserdel[lessuseri]
													for g in firstleastuserdel:
														getleastuserdel = g.user
													if getusermostpost == getleastuserdel:
														leastpostvvoti = 0
														while leastpostvvoti < 6:
															firstleastposivoteuser = leastposivoteuser[leastpostvvoti]
															for h in firstleastposivoteuser:
																getleastposivoteuser = h.user
															if getusermostpost == getleastposivoteuser:
																maxnegtvvotuseri = 0
																while maxnegtvvotuseri < 6:
																	firstmaxnegativvoteuser = maxnegativvoteuser[maxnegtvvotuseri]
																	for zi in firstmaxnegativvoteuser:
																		getmaxnegativvoteuser = zi.user
																	if getusermostpost == getmaxnegativvoteuser:
																		leastpostvusercci = 0
																		while leastpostvusercci < 6:
																			firstleastposvuserdel = leastposvuserdel[leastpostvusercci]
																			for ffl in firstleastposvuserdel:
																				getleastposvuserdel = ffl.user
																			if getusermostpost == getleastposvuserdel:
																				maxnegativeuserstaycci = 0
																				while maxnegativeuserstaycci < 6:
																					firstmaxnegativeuserstay = maxnegativeuserstay[maxnegativeuserstaycci]
																					for kkl in firstmaxnegativeuserstay:
																						getmaxnegativeuserstay = kkl.user
																					if getusermostpost == getmaxnegativeuserstay:
																						changecreategroupuser = True
																						break
																					else:
																						maxnegativeuserstaycci += 1
																						continue
																				break
																			else:
																				leastpostvusercci += 1
																				continue
																		break
																	else:
																		maxnegtvvotuseri += 1
																		continue
																break
															else:
																leastpostvvoti += 1
																continue
														break
													else:
														lessuseri += 1
														continue
												break
											else:
												owni += 1
												continue
										break
									else:
										leastpostdeli += 1
										continue
								iplus += 1
							groupgetforuserchange = CreateGroup.objects.filter(pk=getid, slug=getslug)
							if changecreategroupuser == True:
								#point start
								postcountcontrol = UserDeletePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
								if postcountcontrol.exists():
									for gcount in postcountcontrol:
										getcount = gcount.counter
									if getcount == '' or getcount == None:
										postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
									else:
										postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
								else:
									createpostcounter = UserDeletePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
									createpostcounter.save()
								#point stop
								#ek başla
								availusercont = CreateGroup.objects.filter(user = getusermostpost)
								if availusercont.exists():
									countavailusercont = availusercont.count()
									availcount = 0
									while availcount < countavailusercont:
										getavailusercont = availusercont[availcount]
										havegroupusersget = GroupJoin.objects.filter(togroup = getavailusercont.pk, joinstatus = 'JOINED')
										counthavegroupusersget = havegroupusersget.count()
										couhavus = 0
										while couhavus < counthavegroupusersget:
											onegroupjoinget = havegroupusersget[couhavus]
											useronegroupjoin = onegroupjoinget.fromuser.pk
											postpoint = PostCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for a in postpoint:
												getpostpo = a.counter
											if getpostpo:
												ccgetpostpo = getpostpo*9#+
											else:
												getpostpo = 0
											postreqdelpoint = PostRequestDeleteCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for b in postreqdelpoint:
												getreqdelpo = b.counter
											if getreqdelpo:
												ccgetreqdelpo = getreqdelpo*2#-
											else:
												ccgetreqdelpo = 0
											selfpostdelpoint = PostDelCount.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for c in selfpostdelpoint:
												getselfposdelpont = c.counter
											if getselfposdelpont:
												ccgetselfposdelpont = getselfposdelpont*3#-
											else:
												ccgetselfposdelpont = 0
											userreqdelpoint = UserRequestDeleteCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for d in userreqdelpoint:
												usedelpont = d.counter
											if usedelpont:
												ccusedelpont = usedelpont*3#-
											else:
												ccusedelpont = 0
											uservoteposipoint = UserVotePositiveActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for e in uservoteposipoint:
												usevotpositpo = e.counter
											if usevotpositpo:
												ccusevotpositpo = usevotpositpo*1#+
											else:
												ccusevotpositpo = 0
											uservotenegpoint = UserVoteNegativeActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for f in uservotenegpoint:
												usvotnegpr = f.counter
											if usvotnegpr:
												ccusvotnegpr = usvotnegpr*1#-
											else:
												ccusvotnegpr = 0
											userdelposivactpoint = UserDeletePositiveActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for g in userdelposivactpoint:
												usdelpoactpo = g.counter
											if usdelpoactpo:
												ccusdelpoactpo = usdelpoactpo*2#+
											else:
												ccusdelpoactpo = 0
											userdelnegativactpoint = UserDeleteNegativeActivityCounter.objects.filter(user = useronegroupjoin, whichgroup = getavailusercont.pk, createdate__gt = firtedtimer)
											for h in userdelnegativactpoint:
												usedelnegactpos = h.counter
											if usedelnegactpos:
												ccusedelnegactpos = usedelnegactpos*2#-
											else:
												ccusedelnegactpos = 0
											usertotataccount = ccgetpostpo-ccgetreqdelpo-ccgetselfposdelpont-ccusedelpont+ccusevotpositpo-ccusvotnegpr+ccusdelpoactpo-ccusedelnegactpos
											tupleuserdegree = (usertotataccount, useronegroupjoin)
											sortlistadd.append(tupleuserdegree)
											couhavus += 1
										sortlistadd.sort()
										sortlistcountsd = len(sortlistadd)
										####### bir kişiyi sahip yapabilmek için başkan seçilenin eski grubuna başkası atandı ama bu atanan kişinin sahip olduğu bir grup varsa o ne olacak ona yarın bak
										if sortlistcountsd == 1 and getavailusercont != groupgetforuserchange:
											delnpresident = "Your group is delete"+getavailusercont.groupname
											deletknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = delnpresident)
											getavailusercont.delete()
										elif sortlistcountsd > 1 and getavailusercont == groupgetforuserchange and sortlistadd[0][1] != getusermostpost.pk:
											oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
											#self.second_group_have_president(oldgroupchangeuser)
											second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
											getavailusercont.user = oldgroupchangeuser
											self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
											self.loser_message_informations(getusermostpost)
										elif sortlistcountsd > 1 and getavailusercont == groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
											oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
											#self.second_group_have_president(oldgroupchangeuser)
											second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
											getavailusercont.user = oldgroupchangeuser
											self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
											self.loser_message_informations(getusermostpost)
										elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
											oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
											#self.second_group_have_president(oldgroupchangeuser)
											second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
											getavailusercont.user = oldgroupchangeuser
											self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
											self.loser_message_informations(getusermostpost)
										elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] != getusermostpost.pk:
											oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
											#self.second_group_have_president(oldgroupchangeuser)
											second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
											getavailusercont.user = oldgroupchangeuser
											self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
											self.loser_message_informations(getusermostpost)
										else:
											if sortlistadd[0][1] == getusermostpost.pk:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
											else:
												oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
												#self.second_group_have_president(oldgroupchangeuser)
												second_group_have_president_user.delay(oldgroupchangeuser, winner_message_infotmations, protect_message_informations, loser_message_informations)
												getavailusercont.user = oldgroupchangeuser
												self.winner_message_infotmations(getavailusercont, oldgroupchangeuser)
												self.loser_message_informations(getusermostpost)
												#######
										sortlistadd.clear()
										availcount += 1
									#ek bitir
									newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
									#grup başkanı olan ve başkanlığı kaybolan bilgilendirilir bu kos blogunu yaz
									winpresident = "You win this group's president"+forpostgroup.groupname
									presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = winpresident)
									losepresidentmessage = "You lose this group's president"+forpostgroup.groupname
									losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = losepresidentmessage)
									return HttpResponse(json.dumps({'warn':'user blocked'}), content_type = "application/json")
								else:
									newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
									#grup başkanı olan ve başkanlığı kaybolan bilgilendirilir bu kos blogunu yaz
									winpresident = "You win this group's president"+forpostgroup.groupname
									presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = getusermostpost, messagechar = winpresident)
									losepresidentmessage = "You lose this group's president"+forpostgroup.groupname
									losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = losepresidentmessage)
									return HttpResponse(json.dumps({'warn':'user blocked'}), content_type = "application/json")
							else:
								#point start
								postcountcontrol = UserDeletePositiveActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
								if postcountcontrol.exists():
									for gcount in postcountcontrol:
										getcount = gcount.counter
									if getcount == '' or getcount == None:
										postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
									else:
										postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
								else:
									createpostcounter = UserDeletePositiveActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
									createpostcounter.save()
								#point stop
								newgrouppresident = groupgetforuserchange.update(updates = datetime.datetime.now())
								#grup başkanı başkanlığını korouduğu bilgisi verilir
								changemessage = "You stay group president"+forpostgroup.groupname
								statuspresident, created = MessageBoxDef.objects.get_or_create(user = forpostgroup.user, messagechar = changemessage)
								return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
							#başkan seçim bitimi
						else:
							#point start
							postcountcontrol = UserDeletePositiveActivity.objects.filter(user = self.request.user, whichgroup = getid)
							if postcountcontrol.exists():
								for gcount in postcountcontrol:
									getcount = gcount.counter
								if getcount == '' or getcount == None:
									postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
								else:
									postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
							else:
								createpostcounter = UserDeletePositiveActivity(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
								createpostcounter.save()
							#point stop
							return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
					else:
						#point start
						postcountcontrol = UserDeletePositiveActivity.objects.filter(user = self.request.user, whichgroup = getid)
						if postcountcontrol.exists():
							for gcount in postcountcontrol:
								getcount = gcount.counter
							if getcount == '' or getcount == None:
								postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
							else:
								postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
						else:
							createpostcounter = UserDeletePositiveActivity(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
							createpostcounter.save()
						#point stop
						if getvoteruser.exportstatus == 'OPEN':
							blockuserget.update(joinstatus='BLOCKED')
							getvoteruser.exportstatus = "CLOSED"
							getvoteruser.save(update_fields=['exportstatus'])
							return HttpResponse(json.dumps({'warn':'user blocked'}), content_type = "application/json")
						else:
							return HttpResponse(json.dumps({'warn':'user already blocked or an error'}), content_type = "application/json")
				else:
					#point start
					postcountcontrol = UserDeletePositiveActivity.objects.filter(user = self.request.user, whichgroup = getid)
					if postcountcontrol.exists():
						for gcount in postcountcontrol:
							getcount = gcount.counter
						if getcount == '' or getcount == None:
							postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
						else:
							postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
					else:
						createpostcounter = UserDeletePositiveActivity(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
						createpostcounter.save()
					#point stop
					return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
			elif post_form.exportdown == 'true':
				#point start
				postcountcontrol = UserDeleteNegativeActivityCounter.objects.filter(user = self.request.user, whichgroup = getid)
				if postcountcontrol.exists():
					for gcount in postcountcontrol:
						getcount = gcount.counter
					if getcount == '' or getcount == None:
						postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
					else:
						postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
				else:
					createpostcounter = UserDeleteNegativeActivityCounter(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
					createpostcounter.save()
				#point stop
				getvoteruser.votes.down(self.request.user.id)
				votercount = getvoteruser.votes.count()
				return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'you do wrong think'}), content_type = "application/json")
	
	
	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class MessageShowLists(ListView, DeleteView, FormMixin):
	model = MessageBoxDef
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "creategroup/show_messagebox.html"
	template_name_suffix = '_messagebox'
	ordering = ['messagedate']
	context_object_name = 'messagebox_list'
	form_class = MessageBoxDefForm
	paginate_by = 10
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
			delete_posts = self.object
		except:
			self.object = None
		if self.object == None:
			return redirect ('groupname')
		context = self.get_context_data(object=self.object)
		return self.render_to_response(context)
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object
	
	def deletes_ajax(self, form, pk):
		pkwh = pk
		self.object = self.get_object()
		deleteobject = self.object.filter(pk=pkwh)
		self.object.delete()
		return HttpResponse(json.dumps({'success':'silindi'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			processtyper = request.POST['processtyper']
			pkwh = request.POST['whichmessage']
			instanceobject = self.get_object()
			if processtyper == 'READUNREAD':
				delorreadchange = request.POST['readunreadcontrol']
				if delorreadchange == 'READ':
					post_form = MessageBoxDefForm(self.request.POST or None, self.request.FILES or None, instance = instanceobject)
					if post_form.is_valid():
						return self.form_unread_ajax(post_form, pkwh)
					else:
						return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
				else:
					post_form = MessageBoxDefForm(self.request.POST or None, self.request.FILES or None, instance = instanceobject)
					if post_form.is_valid():
						return self.form_read_ajax(post_form, pkwh)
					else:
						return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
			else:
				form_name = 'deleteformname'
				post_form = MessageBoxDefForm(self.request.POST or None, self.request.FILES or None, instance = instanceobject)
				if post_form.is_valid():
					return self.form_valid_ajax(post_form, pkwh)
				else:
					return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	
	def form_read_ajax(self, form, pk):
		post_form = form
		pkwh = pk
		self.object = self.get_object()
		changeobject = self.object.filter(pk=pkwh)
		changeobject.update(readunreadcontrol='READ')
		return HttpResponse(json.dumps({'complete':'READ'}), content_type = "application/json")
		
	def form_unread_ajax(self, form, pk):
		post_form = form
		pkwh = pk
		self.object = self.get_object()
		changeobject = self.object.filter(pk=pkwh)
		changeobject.update(readunreadcontrol='UNREAD')
		return HttpResponse(json.dumps({'complete':'UNREAD'}), content_type = "application/json")
	
	def form_valid_ajax(self, form, pk):
		postform = form
		pkwh = pk
		if self.request.is_ajax():
			return self.deletes_ajax(postform, pkwh)
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT Silindi'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def get_context_data(self, **kwargs):
		context = super(MessageShowLists, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		context['form'] = self.get_form_class()
		context['currentusername'] = self.request.user.username
		return context
	
	def get_queryset(self):
		queryset = MessageBoxDef.objects.filter(user=self.request.user)
		return queryset

@method_decorator(decorators, name='dispatch')
class ExportUserList(ListView, SingleObjectMixin, FormMixin):
	model = ExportUser
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/exportuser_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = ExportUserVoterForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(ExportUserList, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		usergroupown = selectgroup.user
		delegateuserget = BeDelegate.objects.filter(involvolvedgroup= selectgroup.id, delegateuser=self.request.user.id)
		joinercontrol = GroupJoin.objects.filter(togroup=selectgroup.id, fromuser=self.request.user.id, joinstatus="JOINED")
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = ExportUser.objects.filter(groupwhich=selectgroup.id, exportstatus = "OPEN")
				return queryset
			elif usergroupown != self.request.user and delegateuserget.exists() or joinercontrol.exists():
				queryset = ExportUser.objects.filter(groupwhich=selectgroup.id, exportstatus = "OPEN")
				return queryset
			else:
				queryset=None
				return queryset
		else:
			queryset=None
			return queryset


@method_decorator(decorators, name='dispatch')
class JoinGroupShowJoiner(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/joiner_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinGroupShowJoiner, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		usergroupown = selectgroup.user
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="JOINED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == True:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="JOINED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="JOINED")
				joinercont = queryset.filter(fromuser=self.request.user.id)
				if joinercont.exists():
					return queryset
				else:
					queryset=None
					return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinGroupShowBlock(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/block_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinGroupShowBlock, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		usergroupown = selectgroup.user
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="BLOCKED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == True:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="BLOCKED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="BLOCKED")
				joinercont = queryset.filter(fromuser=self.request.user.id)
				if joinercont.exists():
					return queryset
				else:
					queryset=None
					return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinGroupShowUNBlock(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/unlock_block_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinGroupShowUNBlock, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		usergroupown = selectgroup.user
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="UNBLOCKED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == True:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="UNBLOCKED")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="UNBLOCKED")
				joinercont = queryset.filter(fromuser=self.request.user.id)
				if joinercont.exists():
					return queryset
				else:
					queryset=None
					return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinGroupShowWaiting(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/waiting_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinGroupShowWaiting, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		usergroupown = selectgroup.user
		if selectgroup:
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="SENDEDREQUEST")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == True:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="SENDEDREQUEST")
				return queryset
			elif usergroupown != self.request.user and selectgroup.followacceptcontrol == False:
				queryset = GroupJoin.objects.filter(togroup=selectgroup.id, joinstatus="SENDEDREQUEST")
				joinercont = queryset.filter(fromuser=self.request.user.id)
				if joinercont.exists():
					return queryset
				else:
					queryset=None
					return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinUserShowJoiner(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/user_joiner_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinUserShowJoiner, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = User.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			if selectuser.id == self.request.user.id:
				context['list_exams'] = file_exams
				context['selectuser'] = selectuser
				context['form'] = self.get_form_class()
			else:
				context['selectuser'] = "you aren't yourself"
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = get_object_or_404(User, pk = getid, slug = getslug)
		userown = selectuser.id
		if selectuser:
			if userown == self.request.user.id:
				queryset = GroupJoin.objects.filter(fromuser=userown, joinstatus="JOINED")
				return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinUserShowWaiter(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/user_waiter_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinUserShowJoiner, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = User.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			if selectuser.id == self.request.user.id:
				context['list_exams'] = file_exams
				context['selectuser'] = selectuser
				context['form'] = self.get_form_class()
			else:
				context['selectuser'] = "you aren't yourself"
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = get_object_or_404(User, pk = getid, slug = getslug)
		userown = selectuser.id
		if selectuser:
			if userown == self.request.user.id:
				queryset = GroupJoin.objects.filter(fromuser=userown, joinstatus="SENDEDREQUEST")
				return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class JoinUserShowBlocked(ListView, SingleObjectMixin, FormMixin):
	model = GroupJoin
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/user_blocked_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_joiners'
	paginate_by = 10
	object=None
	success_url = None
	form_class = GroupJoinForm
	#takipçi listesi
	
	def get_context_data(self, **kwargs):
		context = super(JoinUserShowJoiner, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = User.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			if selectuser.id == self.request.user.id:
				context['list_exams'] = file_exams
				context['selectuser'] = selectuser
				context['form'] = self.get_form_class()
			else:
				context['selectuser'] = "you aren't yourself"
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectuser = get_object_or_404(User, pk = getid, slug = getslug)
		userown = selectuser.id
		if selectuser:
			if userown == self.request.user.id:
				queryset = GroupJoin.objects.filter(fromuser=userown, joinstatus="BLOCKED")
				return queryset
			else:
				queryset=None
				return queryset

@method_decorator(decorators, name='dispatch')
class CreateGroupPosts(CreateView, ListView):
	context_object_name = 'create_posts'
	form_class = GroupPostsesForm
	http_method_names = [u'get', u'post', u'put']
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	model = GroupPostses
	#prefix = "createpostform"
	template_name = "creategroup/newpost_create.html"
	template_name_suffix = '_create'
	#new adding
	object_list = GroupPostses.objects.all()
	ordering = ['createdates']
	paginate_by = 10
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(CreateGroupPosts, self).dispatch(request, *args, **kwargs)
	def get_object(self, queryset=None):
		if queryset is None:
			queryset = self.get_queryset()
		try:
			self.object = queryset
		except queryset.model.DoesNotExist:
			raise Http404("error models filter")
		return self.object
	def get_queryset(self):
		whichgrouppost = self.get_group_which()
		if self.model.objects.filter(user=self.request.user, creategrouppost = whichgrouppost).exists():
			self.queryset = self.model.objects.filter(user=self.request.user, creategrouppost = whichgrouppost)
		return self.queryset
	
	def get_group_which(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#groupwhich = CreateGroup.objects.get(pk = getid, slug = getslug)
		groupwhich = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		return groupwhich
	
	def get(self, request, *args, **kwargs):
		whichgroup = self.get_group_which()
		if not whichgroup:
			return HttpResponseRedirect('department/create/new/')
		form_class = self.get_form_class()
		form_name = 'createpostone'
		#prefix = self.get_prefix()
		form = self.get_form(form_class)
		#try:
			#mydata = self.get_object()
			#whichgroup = self.get_group_which()
		#except self.model.DoesNotExist:
			#mydata = None
		mydata = self.get_object()
		context = self.get_context_data(object=mydata, form=form, whichgroup=whichgroup)
		return render(request, self.template_name, context)
	
	def get_context_data(self, **kwargs):
		context = super(CreateGroupPosts, self).get_context_data(**kwargs)
		if kwargs['object']:
			paginator = Paginator(kwargs['object'], self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
		context['mydata'] = file_exams
		context['form'] = kwargs['form']
		context['whichgroup'] = kwargs['whichgroup']
		startdate = datetime.datetime.now() - datetime.timedelta(minutes=30)
		if self.model.objects.filter(user=self.request.user, createdates__gt = startdate).count() >= 20:
			context['captchacontrol'] = 'True'
		return context
	
	def put(self, request, *args, **kwargs):
		form_name = 'createpostone'
		if request.FILES.get('multiphoto', '') != '':
			filescontvids = ControlPhotoExt(request.FILES['multiphoto'])
			filescontvids = filescontvids.mpfourfile()
			if filescontvids == True:
				print('doğru')
				data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('multiphoto', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
				filedata = {'multiphoto': request.FILES.get('multiphoto', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
			else:
				print('yanlis')
				data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
				filedata = {'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
		else:
			print('göte geldik')
			data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
			filedata = {'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
		profile_form = GroupPostsesForm(data, filedata)
		if profile_form.is_valid():
			profile_form.feeling = profile_form.cleaned_data['feeling']
			profile_form.postgrouplabels = profile_form.cleaned_data['postgrouplabels']
			profile_form.postsgroupwrite = profile_form.cleaned_data['postsgroupwrite']
			profile_form.multiphoto = profile_form.cleaned_data['multiphoto']
			profile_form.multifiles = profile_form.cleaned_data['multifiles']
			profile_form.grouppknum = profile_form.cleaned_data['grouppknum']
			profile_form.groupslugchar = profile_form.cleaned_data['groupslugchar']
			return self.form_valid_ajax(profile_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	
	def form_valid_ajax(self, form):
		profile_form = form
		groupwhichget = CreateGroup.objects.get(pk = profile_form.grouppknum, slug = profile_form.groupslugchar)
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.creategrouppost = groupwhichget
		go_form.save()
		profile_form.save_m2m()
		#adding new
		whgrgetid = GroupPostses.objects.get(id=go_form.pk)
		mygetlistitemco = len(self.request.FILES.getlist('multifiles'))
		if mygetlistitemco > 0:
			locounts = 0
			trucontrolist = []
			while locounts < mygetlistitemco:
				getpicsort = self.request.FILES.getlist('multifiles')[locounts]
				picextxont = ControlPhotoExt(getpicsort).imageorfile()
				if picextxont == True:
					ForGroupPostPhotos.objects.create(user= whgrgetid.user, whichgroup=whgrgetid, multifiles=getpicsort)
				locounts += 1
		#adding finish
		#whichgrouppost = self.get_group_which()
		try:
			whichgrouppost = self.get_group_which()
		except CreateGroup.DoesNotExist:
			whichgrouppost = groupwhichget
		groupypk = whichgrouppost.pk
		groupyslug = whichgrouppost.slug
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug, creategrouppost = whichgrouppost)
		jsondata = postlist.values('pk', 'slug', 'feeling', 'postsgroupwrite')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		#adding label code start
		taglist = []
		for taggitlist in postlist:
			photourls = taggitlist.multiphoto
			mygrname = taggitlist.creategrouppost.groupname
			ajaxdate = taggitlist.createdates
			for tag in taggitlist.postgrouplabels.all():
				taglist.append(tag.name)
		getdatadict['postgrouplabels'] = taglist
		getdatadict['groupnameajax'] = mygrname
		getdatadict['createdates'] = f"{ajaxdate:%d %m %Y %H:%M}"
		if photourls:
			getdatadict['multiphoto'] = photourls.url
		else:
			getdatadict['multiphoto'] = False
		#adding label code finish
		getdatadict['valuepk'] = groupypk
		getdatadict['valueslug'] = groupyslug
		#adding new
		getimageforsort = ForGroupPostPhotos.objects.filter(whichgroup = whgrgetid)
		myimagelist = []
		for i in getimageforsort:
			forurl = i.multifiles
			myimagelist.append(forurl.url)
		getdatadict['multifiles'] = myimagelist
		#adding finish
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			#point start
			postcountcontrol = PostCounter.objects.filter(user = self.request.user, whichgroup = groupypk)
			if postcountcontrol.exists():
				for gcount in postcountcontrol:
					getcount = gcount.counter
				if getcount == '' or getcount == None:
					postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
				else:
					postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
			else:
				createpostcounter = PostCounter(user = self.request.user, whichgroup = whichgrouppost, updatedate = datetime.datetime.now())
				createpostcounter.save()
			#point stop
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'sent incorrectly but still registered'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = None
		try:
			whichgrouppost = self.get_group_which()
			#groupdata = CreateGroup.objects.get(pk = whichgrouppost.pk, slug = whichgrouppost.slug)
			groupdata = get_object_or_404(CreateGroup, pk = whichgrouppost.pk, slug = whichgrouppost.slug)
		except CreateGroup.DoesNotExist:
			getidxx = request.POST['grouppknum']
			getslugyy = request.POST['groupslugchar']
			#groupdata = CreateGroup.objects.get(pk = getidxx, slug = getslugyy)
			groupdata = get_object_or_404(CreateGroup, pk = getidxx, slug = getslugyy)
		if not groupdata:
			return HttpResponseRedirect('department/create/new/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				#recaptcha control
				if request.POST.get('recaptcha', '') != '':
					recaptcha_response = request.POST['recaptcha']
					recapturl = 'https://www.google.com/recaptcha/api/siteverify'
					recapvalues = {
						'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
						'response': recaptcha_response
					}
					recapdata = urllib.parse.urlencode(recapvalues).encode()
					recapreq =  urllib.request.Request(recapturl, data=recapdata)
					recapresponse = urllib.request.urlopen(recapreq)
					recapresult = json.loads(recapresponse.read().decode())
					if recapresult['success']:
						return self.put(request, *args, **kwargs)
					else:
						return HttpResponse(json.dumps({'error':'captcha error'}), content_type = "application/json")
				else:
					return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class CreateGroupPostsUpdateViews(UpdateView):
	context_object_name = 'update_group'
	form_class = GroupPostsesForm
	http_method_names = [u'get', u'post', u'put']
	model = GroupPostses
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/group_posts_update.html"
	template_name_suffix = '_update'
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = self.model.objects.get(pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get(self, request, *args, **kwargs):
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		#try:
			#mydata = self.get_object()
		#except self.model.DoesNotExist:
			#mydata = None
		mydata = self.get_object()
		context = self.get_context_data(object=mydata, form=form)
		return render(request, self.template_name, context)
	
	def get_context_data(self, **kwargs):
		context = super(CreateGroupPosts, self).get_context_data(**kwargs)
		context['mydata'] = kwargs['object']
		context['form'] = kwargs['form']
		return context
	
	def put(self, request, *args, **kwargs):
		form_name = 'createpostone'
		instanceobject = self.get_object()
		if request.FILES.get('multiphoto', '') != '':
			filescontvids = ControlPhotoExt(request.FILES['multiphoto'])
			filescontvids = filescontvids.mpfourfile()
			if filescontvids == True:
				data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('multiphoto', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
				filedata = {'multiphoto': request.FILES.get('multiphoto', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
			else:
				data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
				filedata = {'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
		else:
			data = {'grouppknum': request.POST.get('grouppknum', self.kwargs['pk']), 'groupslugchar': request.POST.get('groupslugchar', self.kwargs['slug']), 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
			filedata = {'multiphoto': request.FILES.get('doesnotexist', ''), 'multifiles': request.FILES.getlist('doesnotexist', '')}
		#data = {'grouppknum': request.POST['grouppknum'], 'groupslugchar': request.POST['groupslugchar'], 'feeling': request.POST['feeling'], 'postgrouplabels': request.POST['postgrouplabels'], 'postsgroupwrite': request.POST['postsgroupwrite'], 'multiphoto': request.FILES.get('multiphoto', ''), 'multifiles': request.FILES.get('multifiles', '')}
		profile_form = GroupPostsesForm(data, filedata, instance = instanceobject)#instance sorun yaratırsa sil
		if profile_form.is_valid():
			groupgetpk = request.POST['valuepk']
			groupgetslug = request.POST['valueslug']
			profile_form.feeling = profile_form.cleaned_data['feeling']
			profile_form.postgrouplabels = profile_form.cleaned_data['postgrouplabels']
			profile_form.postsgroupwrite = profile_form.cleaned_data['postsgroupwrite']
			profile_form.multiphoto = profile_form.cleaned_data['multiphoto']
			profile_form.multifiles = profile_form.cleaned_data['multifiles']
			profile_form.grouppknum = profile_form.cleaned_data['grouppknum']
			profile_form.groupslugchar = profile_form.cleaned_data['groupslugchar']
			return self.form_valid_ajax(profile_form, groupgetpk, groupgetslug)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	
	def form_valid_ajax(self, form, pk, slug):
		profile_form = form
		groupxpk = pk
		groupxslug = slug
		groupwhichget = CreateGroup.objects.get(pk = groupxpk, slug = groupxslug)
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.creategrouppost = groupwhichget
		go_form.save()
		profile_form.save_m2m()
		#adding new
		whgrgetid = GroupPostses.objects.get(id=go_form.pk)
		mygetlistitemco = len(self.request.FILES.getlist('multifiles'))
		if mygetlistitemco > 0:
			multifilescount = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid).count()
			multifilescount = multifilescount-1
			while True:
				deletephtos = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[multifilescount]
				deletephtos.delete()
				multifilescount -= 1
				if multifilescount == 0:
					deletephtos = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[multifilescount]
					deletephtos.delete()
					break
			locounts = 0
			trucontrolist = []
			while locounts < mygetlistitemco:
				getpicsort = self.request.FILES.getlist('multifiles')[locounts]
				picextxont = ControlPhotoExt(getpicsort).imageorfile()
				if picextxont == True:
					ForGroupPostPhotos.objects.create(user= whgrgetid.user, whichgroup=whgrgetid, multifiles=getpicsort)
					'''
					if multifilescount == len(self.request.FILES.getlist('multifiles')):
						formultifilesupdate = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[locounts]
						formultifilesupdate.multifiles=getpicsort
						formultifilesupdate.save()
					elif multifilescount > len(self.request.FILES.getlist('multifiles')):
						if len(self.request.FILES.getlist('multifiles')) == locounts+1:
							formultifilesupdate = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[locounts]
							formultifilesupdate.multifiles=getpicsort
							formultifilesupdate.save()
							cdi = locounts
							while cdi < multifilescount-cdi:
								deletefilt = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[cdi]
								deletefilt.delete()
								cdi += 1
						else:
							formultifilesupdate = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[locounts]
							formultifilesupdate.multifiles=getpicsort
							formultifilesupdate.save()
					elif multifilescount < len(self.request.FILES.getlist('multifiles')):
						if multifilescount > locounts:
							formultifilesupdate = ForGroupPostPhotos.objects.filter(user= whgrgetid.user, whichgroup=whgrgetid)[locounts]
							formultifilesupdate.multifiles=getpicsort
							formultifilesupdate.save()
						else:
							ForGroupPostPhotos.objects.create(user= whgrgetid.user, whichgroup=whgrgetid, multifiles=getpicsort)
					else:
						ForGroupPostPhotos.objects.create(user= whgrgetid.user, whichgroup=whgrgetid, multifiles=getpicsort)
					'''
				locounts += 1
		#adding finish
		whichgrouppost = groupwhichget
		groupypk = whichgrouppost.pk
		groupyslug = whichgrouppost.slug
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug, creategrouppost = whichgrouppost)
		jsondata = postlist.values('pk', 'slug', 'feeling', 'postsgroupwrite')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		#adding label code start
		taglist = []
		for taggitlist in postlist:
			photourls = taggitlist.multiphoto
			ajaxdate = taggitlist.createdates
			mygrname = taggitlist.creategrouppost.groupname
			for tag in taggitlist.postgrouplabels.all():
				taglist.append(tag.name)
		getdatadict['postgrouplabels'] = taglist
		getdatadict['groupnameajax'] = mygrname
		getdatadict['createdates'] = f"{ajaxdate:%d %m %Y %H:%M}"
		if photourls:
			getdatadict['multiphoto'] = photourls.url
		else:
			getdatadict['multiphoto'] = False
		#adding label code finish
		getdatadict['valuepk'] = groupypk
		getdatadict['valueslug'] = groupyslug
		#adding new
		getimageforsort = ForGroupPostPhotos.objects.filter(whichgroup = whgrgetid)
		myimagelist = []
		for i in getimageforsort:
			forurl = i.multifiles
			myimagelist.append(forurl.url)
		getdatadict['multifiles'] = myimagelist
		#adding finish
		#adding new
		getimageforsort = ForGroupPostPhotos.objects.filter(whichgroup = whgrgetid)
		myimagelist = []
		for i in getimageforsort:
			forurl = i.multifiles
			myimagelist.append(forurl.url)
		getdatadict['multifiles'] = myimagelist
		#adding finish
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'sent incorrectly but still registered'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		groupdata = CreateGroup.objects.get(pk = request.POST['grouppknum'], slug = request.POST['groupslugchar'])
		if not groupdata:
			return HttpResponseRedirect('department/create/new/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'error':'ajax olarak gönder'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class CreateGroupPostsDeleteView(DeleteView):
	model = GroupPostses
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "creategroup/newposts_delete.html"
	template_name_suffix = "_delete"
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
			delete_posts = self.object
		except:
			self.object = None
		if self.object == None:
			return redirect ('groupname')
		context = self.get_context_data(object=self.object)
		return self.render_to_response(context)
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object
	
	def deletes_ajax(self, form):
		self.object = self.get_object()
		self.object.delete()
		return HttpResponse(json.dumps({'success':'silindi'}), content_type = "application/json")
	
	def put(self, request, *args, **kwargs):
		form_name = 'deleteformname'
		instanceobject = self.get_object()
		#data = {'feeling': self.request.POST['feeling']}
		post_form = GroupPostsesForm(self.request.POST or None, self.request.FILES or None, instance = instanceobject)
		if post_form.is_valid():
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	def form_valid_ajax(self, form):
		postform = form
		if self.request.is_ajax():
			#point start
			instanceobject = self.get_object()
			postcountcontrol = PostDelCount.objects.filter(user = self.request.user, whichgroup = instanceobject.creategrouppost.id)
			if postcountcontrol.exists():
				for gcount in postcountcontrol:
					getcount = gcount.counter
				if getcount == '' or getcount == None:
					postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
				else:
					postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
			else:
				createpostcounter = PostDelCount(user = self.request.user, whichgroup = instanceobject.creategrouppost, updatedate = datetime.datetime.now())
				createpostcounter.save()
			#point stop
			return self.deletes_ajax(postform)
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT Silindi'}), content_type = "application/json")
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		groupdata = CreateGroup.objects.get(pk = request.POST['valuepk'], slug = request.POST['valueslug'])
		if not groupdata:
			return HttpResponseRedirect('department/create/new/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")

#Grouppostes votes
@method_decorator(decorators, name='dispatch')
class GroupPostVoterProcess(FormView, ModelFormMixin, DeletionMixin):
	template_name = None
	success_url = None
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	model=GroupPostses
	form_class = GroupPostVoterForm
	http_method_names = [u'get', u'post', u'put']

	def get_context_data(self, **kwargs):
		context['form'] = self.get_form_class()
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		joinercontrol = GroupJoin.objects.filter(togroup = selectgroup.id, fromuser = self.request.user.id, joinstatus=JOINED)
		return joinercontrol

	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not User.objects.filter(pk = self.request.user.id).exists():
			return HttpResponseRedirect('profiles/new/')
		if not self.object.exists():
			return HttpResponse(json.dumps({'error':'you dont to use polls'}), content_type = "application/json")
		else:
			post_form = GroupPostVoterForm(request.POST, self.request.FILES)
			if post_form.is_valid():
				post_form.exporttype = post_form.cleaned_data['exporttypepost']
				post_form.exportgrouppk = post_form.cleaned_data['exportgrouppkpost']
				post_form.exportup = post_form.cleaned_data['exportuppost']
				post_form.exportdown = post_form.cleaned_data['exportdownpost']
				return self.form_valid(post_form)
			else:
				form_name = 'processform'
				return HttpResponse(self.form_invalid(**{form_name: post_form}))

	def form_valid(self, form):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		post_form = form
		voteridget = int(post_form.exporttype)
		forpostgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		getvoteruser = GroupPostses.objects.get(pk = voteridget)
		if getvoteruser.votes.exists(self.request.user.id):
			return HttpResponse(json.dumps({'error':'you vote already'}), content_type = "application/json")
		elif post_form.exportup == 'true':
			#point start
			postcountcontrol = PostPositiveVotes.objects.filter(user = self.request.user, whichgroup = getid)
			if postcountcontrol.exists():
				for gcount in postcountcontrol:
					getcount = gcount.counter
				if getcount == '' or getcount == None:
					postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
				else:
					postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
			else:
				createpostcounter = PostPositiveVotes(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
				createpostcounter.save()
			#point stop
			getvoteruser.votes.up(self.request.user.id)
			votercount = getvoteruser.votes.count()
			return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
		elif post_form.exportdown == 'true':
			#point start
			postcountcontrol = PostNegativeVotes.objects.filter(user = self.request.user, whichgroup = getid)
			if postcountcontrol.exists():
				for gcount in postcountcontrol:
					getcount = gcount.counter
				if getcount == '' or getcount == None:
					postcountcontrol.update(counter = 1, updatedate = datetime.datetime.now())
				else:
					postcountcontrol.update(counter = getcount+1, updatedate = datetime.datetime.now())
			else:
				createpostcounter = PostNegativeVotes(user = self.request.user, whichgroup = forpostgroup, updatedate = datetime.datetime.now())
				createpostcounter.save()
			#point stop
			getvoteruser.votes.down(self.request.user.id)
			votercount = getvoteruser.votes.count()
			return HttpResponse(json.dumps({'count':votercount}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'you do wrong think'}), content_type = "application/json")


	def form_invalid(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

#group post label own list
#owngr aşağıdaki kod yalnızca o gruba ait label başlıklı içerikleri listeler
@method_decorator(decorators, name='dispatch')
class OwnGrPostLabelList(ListView):
	model = GroupPostses
	template_name = 'creategroup/owngrlistpostlabel_postlist.html'
	template_name_suffix = '_postlist'
	ordering = ['createdates']
	context_object_name = 'post_list'
	paginate_by = 10

	def get_context_data(self, **kwargs):
		context = super(PostLabelList, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		getgroupname = self.kwargs['groupname']
		getpostlabel = self.kwargs['postlabel']
		owngrp = CreateGroup.objects.filter(groupname=getgroupname)
		for gt in owngrp:
			grpid = gt.id
		queryset = GroupPostses.objects.filter(creategrouppost=grpid, postgrouplabels=getpostlabel)
		return queryset

#group post label list
@method_decorator(decorators, name='dispatch')
class PostLabelList(ListView):
	model = GroupPostses
	template_name = 'creategroup/listpostlabel_postlist.html'
	template_name_suffix = '_postlist'
	ordering = ['createdates']
	context_object_name = 'post_list'
	paginate_by = 10

	def get_context_data(self, **kwargs):
		context = super(PostLabelList, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		#getgroupname = self.kwargs['groupname']
		getpostlabel = self.kwargs['postlabel']
		flwgt = GroupJoin.objects.filter(fromuser=self.request.user, joinstatus=JOINED)
		grplst = []
		owngrp = CreateGroup.objects.filter(user=self.request.user)
		if owngrp.exists():
			for xn in owngrp:
				idgrp = xn.id
		else:
			idgrp = None
		for addx in flwgt:
			grplst.append(addx.togroup.pk)
		if len(grplst) == 1:
			fltgt = Q(creategrouppost=grplst[0]) | Q(creategrouppost=idgrp)
			queryset = GroupPostses.objects.filter(creategrouppost=fltgt, postgrouplabels=getpostlabel)
		elif len(grplst) > 1:
			cntr = 0
			while cntr < len(grplst):
				if cntr != 0:
					qobject = qobject | Q(creategrouppost=grplst[cntr])
				else:
					qobject = Q(creategrouppost=grplst[cntr]) | Q(creategrouppost=idgrp)
				cntr += 1
			queryset = GroupPostses.objects.filter(qobject[0])
		else:
			queryset = GroupPostses.objects.filter(creategrouppost=idgrp, postgrouplabels=getpostlabel)
		return queryset

#Group Label List
@method_decorator(decorators, name='dispatch')
class GroupLabelList(ListView):
	model = CreateGroup
	template_name = 'creategroup/listgrouplabel_grouplist.html'
	template_name_suffix = '_grouplist'
	ordering = ['createdates']
	context_object_name = 'group_list'
	paginate_by = 10

	def get_context_data(self, **kwargs):
		context = super(GroupLabelList, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		#getgroupname = self.kwargs['groupname']
		getgrouplabel = self.kwargs['grouplabel']
		queryset = CreateGroup.objects.filter(grouplabels=getgrouplabel)
		return queryset

#Group Posts for Following Group of User
#ana sayfa
@method_decorator(decorators, name='dispatch')
class PostsListUser(ListView):
	model = GroupPostses
	template_name = 'creategroup/listpostsavaile_listerpst.html'
	template_name_suffix = '_listerpst'
	ordering = ['createdates']
	context_object_name = 'list_posts'
	paginate_by = 10
	object=None
	success_url = None

	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object

	def get_queryset(self):
		query = GroupJoin.objects.filter(fromuser=self.request.user.id, joinstatus="JOINED")
		return query

	def get_context_data(self, **kwargs):
		context = super(PostsListUser, self).get_context_data(**kwargs)
		self.object = self.get_object()
		getquerycurrent = self.get_queryset()
		whichfollowid = []
		for flw in getquerycurrent:
			whichfollowid.append(flw.togroup.id)
		if len(whichfollowid) == 1:
			list_mypost = GroupPostses.objects.filter(creategrouppost = whichfollowid[0])
		elif len(whichfollowid) > 1:
			cntr = 0
			while cntr < len(whichfollowid):
				if cntr != 0:
					qobject = qobject | Q(creategrouppost=whichfollowid[cntr])
				else:
					qobject = Q(creategrouppost=whichfollowid[cntr])
				cntr += 1
			list_mypost = GroupPostses.objects.filter(qobject[0])
		else:
			list_mypost = None
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
		else:
			context['list_exams_nothing'] = "Absent Data"
		return context



#GroupPostses sended posts lists
@method_decorator(decorators, name='dispatch')
class GroupsPostLister(ListView, SingleObjectMixin, FormMixin):
	model = GroupPostses
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/createpostsavaile_lister.html"
	template_name_suffix = '_lister'
	ordering = ['createdates']
	context_object_name = 'list_posts'
	paginate_by = 10
	object=None
	success_url = None
	form_class = ExportUserForm
	
	def get_context_data(self, **kwargs):
		context = super(GroupsPostLister, self).get_context_data(**kwargs)
		self.object = self.get_object()
		list_mypost = self.get_queryset()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		if list_mypost != None:
			paginator = Paginator(list_mypost, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
			except EmptyPage:
				file_exams = paginator.page(paginator.num_pages)
			context['list_exams'] = file_exams
			context['selectgroup'] = selectgroup
			context['form'] = self.get_form_class()
		else:
			context['list_exams_nothing'] = "Absent Data"
			context['selectgroup'] = selectgroup
		return context
	
	def get_form_class(self):
		return self.form_class
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#selectgroup = CreateGroup.objects.get(pk= getid, slug=getslug)
		selectgroup = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		controlselectgroup = CreateGroup.objects.filter(pk=getid, slug=getslug)
		usergroupown = selectgroup.user
		delegateuserget = BeDelegate.objects.filter(involvolvedgroup= selectgroup.id, delegateuser=self.request.user.id)
		joinercontrol = GroupJoin.objects.filter(togroup=selectgroup.id, fromuser=self.request.user.id, joinstatus="JOINED")
		if controlselectgroup.exists():
			if usergroupown == self.request.user and selectgroup.followacceptcontrol == True or selectgroup.followacceptcontrol == False:
				queryset = GroupPostses.objects.filter(creategrouppost=selectgroup.id)
				return queryset
			elif usergroupown != self.request.user and delegateuserget.exists() or joinercontrol.exists():
				queryset = GroupPostses.objects.filter(creategrouppost=selectgroup.id)
				return queryset
			else:
				queryset=None
				return queryset
		else:
			queryset=None
			return queryset


#annoucement codes

@method_decorator(decorators, name='dispatch')
class AnnouncementsPosts(CreateView, ListView):
	context_object_name = 'create_posts'
	form_class = AnnouncementsForm
	http_method_names = [u'get', u'post', u'put']
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	model = Announcements
	template_name = "creategroup/annocement_create.html"
	template_name_suffix = '_create'
	#new adding
	object_list = Announcements.objects.all()
	ordering = ['createdates']
	paginate_by = 10
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(AnnouncementsPosts, self).dispatch(request, *args, **kwargs)
	def get_object(self, queryset=None):
		if queryset is None:
			queryset = self.get_queryset()
		try:
			self.object = queryset
		except queryset.model.DoesNotExist:
			raise Http404("error models filter")
		return self.object
	def get_queryset(self):
		whichgrouppost = self.get_group_which()
		if self.model.objects.filter(user=self.request.user, creategrouppost = whichgrouppost).exists():
			self.queryset = self.model.objects.filter(user=self.request.user, creategrouppost = whichgrouppost)
		return self.queryset
	
	def get_group_which(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		#groupwhich = CreateGroup.objects.get(pk = getid, slug = getslug)
		groupwhich = get_object_or_404(CreateGroup, pk = getid, slug = getslug)
		return groupwhich
	
	def get(self, request, *args, **kwargs):
		whichgroup = self.get_group_which()
		if not whichgroup:
			return HttpResponseRedirect('department/create/new/')
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		mydata = self.get_object()
		context = self.get_context_data(object=mydata, form=form, whichgroup=whichgroup)
		return render(request, self.template_name, context)
	
	def get_context_data(self, **kwargs):
		context = super(AnnouncementsPosts, self).get_context_data(**kwargs)
		groupwhich = kwargs['whichgroup']
		usercontvo = CreateGroup.objects.filter(user=self.request.user.id)
		for usrsv in usercontvo:
			grpcntvo = usrsv.pk
		delegatecontrol = BeDelegate.objects.filter(involvolvedgroup=groupwhich.id, delegateuser=self.request.user.id)
		if delegatecontrol.exists():
			for dlgusr in delegatecontrol:
				vsdfusrid = dlgusr.delegateuser.id
		else:
			vsdfusrid = ''
		if grpcntvo == self.kwargs['pk'] or vsdfusrid == self.request.user.id:
			context['reqshowcont'] = 'True'
		else:
			context['reqshowcont'] = 'False'
		if delegatecontrol.exists():
			context['form'] = kwargs['form']
			if kwargs['object']:
				paginator = Paginator(kwargs['object'], self.paginate_by)
				page = self.request.GET.get('page')
				try:
					file_exams = paginator.page(page)
				except PageNotAnInteger:
					file_exams = paginator.page(1)
			context['mydata'] = file_exams
			context['whichgroup'] = groupwhich
			return context
		else:
			context['formabsent'] = None
			if kwargs['object']:
				paginator = Paginator(kwargs['object'], self.paginate_by)
				page = self.request.GET.get('page')
				try:
					file_exams = paginator.page(page)
				except PageNotAnInteger:
					file_exams = paginator.page(1)
				context['mydata'] = file_exams
			context['whichgroup'] = groupwhich
			return context
	
	def put(self, request, *args, **kwargs):
		form_name = 'createpostone'
		data = {'grouppknum': request.POST['grouppknum'], 'groupslugchar': request.POST['groupslugchar'], 'postsgroupwrite': request.POST['postsgroupwrite']}
		profile_form = AnnouncementsForm(data, self.request.FILES)
		if profile_form.is_valid():
			profile_form.postsgroupwrite = profile_form.cleaned_data['postsgroupwrite']
			profile_form.grouppknum = profile_form.cleaned_data['grouppknum']
			profile_form.groupslugchar = profile_form.cleaned_data['groupslugchar']
			return self.form_valid_ajax(profile_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	
	def form_valid_ajax(self, form):
		profile_form = form
		if CreateGroup.objects.filter(pk = profile_form.grouppknum, slug = profile_form.groupslugchar).exists():
			groupwhichget = CreateGroup.objects.get(pk = profile_form.grouppknum, slug = profile_form.groupslugchar)
			delegatecontrol = BeDelegate.objects.filter(involvolvedgroup=groupwhichget.id, delegateuser=self.request.user.id)
			if delegatecontrol.exists() or groupwhichget.user == self.request.user:
				go_form = profile_form.save(commit = False)
				is_valid = True
				go_form.user = self.request.user
				go_form.creategrouppost = groupwhichget
				go_form.save()
				#whichgrouppost = self.get_group_which()
				try:
					whichgrouppost = self.get_group_which()
				except CreateGroup.DoesNotExist:
					whichgrouppost = groupwhichget
				groupypk = whichgrouppost.pk
				groupyslug = whichgrouppost.slug
				postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug, creategrouppost = whichgrouppost)
				jsondata = postlist.values('pk', 'slug', 'postsgroupwrite')
				dictbe = [dict(item) for item in jsondata]
				for getdict in dictbe:
					getdatadict = getdict
				getdatadict['valuepk'] = groupypk
				getdatadict['valueslug'] = groupyslug
				for gtusr in postlist:
					usrnmgt = gtusr.user.username
					crtdtsgt = gtusr.createdates
				getdatadict['writers'] = usrnmgt
				getdatadict['createdatesgt'] = f"{crtdtsgt:%d %m %Y}"
				jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
				if not postlist:
					return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
				if self.request.is_ajax():
					return HttpResponse(jsongetdatas, content_type = "application/json")
				else:
					return HttpResponse(json.dumps({'error':'invalid method but recorded'}), content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'you re not delegate or user'}), content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'there is no such group'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = None
		try:
			whichgrouppost = self.get_group_which()
			groupdata = CreateGroup.objects.get(pk = whichgrouppost.pk, slug = whichgrouppost.slug)
		except CreateGroup.DoesNotExist:
			getidxx = request.POST['grouppknum']
			getslugyy = request.POST['groupslugchar']
			groupdata = CreateGroup.objects.get(pk = getidxx, slug = getslugyy)
		if not groupdata:
			return HttpResponseRedirect('department/create/new/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class AnnouncementsPostsUpdateViews(UpdateView):
	context_object_name = 'update_group'
	form_class = AnnouncementsForm
	http_method_names = [u'get', u'post', u'put']
	model = Announcements
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = "creategroup/announcement_posts_update.html"
	template_name_suffix = '_update'
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = self.model.objects.get(pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
		except:
			self.object = None
		if self.object == None:
			return redirect ('groupname')
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		mydata = self.get_object()
		groupcontget = self.object.creategrouppost
		context = self.get_context_data(object=mydata, form=form, groupwh=groupcontget)
		return render(request, self.template_name, context)
	
	def get_context_data(self, **kwargs):
		context = super(AnnouncementsPostsUpdateViews, self).get_context_data(**kwargs)
		groupidwh = kwargs['groupwh']
		whusr = kwargs['object'] 
		delegecont = BeDelegate.objects.filter(involvolvedgroup=groupidwh.id, delegateuser=self.request.user.id)
		if delegecont.exists() and whusr.user== self.request.user.id or groupidwh.user == self.request.user.id:
			context['mydata'] = kwargs['object']
			context['form'] = kwargs['form']
		else:
			context['mydata'] = None
			context['form'] = None
		return context
	
	def put(self, request, *args, **kwargs):
		form_name = 'createpostone'
		instanceobject = self.get_object()
		data = {'grouppknum': request.POST['grouppknum'], 'groupslugchar': request.POST['groupslugchar'], 'postsgroupwrite': request.POST['postsgroupwrite']}
		profile_form = AnnouncementsForm(data, self.request.FILES, instance = instanceobject)
		if profile_form.is_valid():
			groupgetpk = request.POST['valuepk']
			groupgetslug = request.POST['valueslug']
			profile_form.postsgroupwrite = profile_form.cleaned_data['postsgroupwrite']
			profile_form.grouppknum = profile_form.cleaned_data['grouppknum']
			profile_form.groupslugchar = profile_form.cleaned_data['groupslugchar']
			return self.form_valid_ajax(profile_form, groupgetpk, groupgetslug)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: profile_form}))
	
	def form_valid_ajax(self, form, pk, slug):
		profile_form = form
		groupxpk = pk
		groupxslug = slug
		groupwhichget = CreateGroup.objects.get(pk = groupxpk, slug = groupxslug)
		go_form = profile_form.save(commit = False)
		is_valid = True
		go_form.user = self.request.user
		go_form.creategrouppost = groupwhichget
		go_form.save()
		whichgrouppost = groupwhichget
		groupypk = whichgrouppost.pk
		groupyslug = whichgrouppost.slug
		postlist = self.model.objects.filter(user = self.request.user, slug = go_form.slug, creategrouppost = whichgrouppost)
		jsondata = postlist.values('pk', 'slug', 'postsgroupwrite')
		dictbe = [dict(item) for item in jsondata]
		for getdict in dictbe:
			getdatadict = getdict
		getdatadict['valuepk'] = groupypk
		getdatadict['valueslug'] = groupyslug
		for gtusr in postlist:
			usrnmgt = gtusr.user.username
			crtdtsgt = gtusr.createdates
		getdatadict['writers'] = usrnmgt
		getdatadict['createdates'] = crtdtsgt
		jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default = self.myconverter)
		if not postlist:
			return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
		if self.request.is_ajax():
			return HttpResponse(jsongetdatas, content_type = "application/json")
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT YAPILDI'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		groupdata = get_object_or_404(CreateGroup, pk = request.POST['grouppknum'], slug = request.POST['groupslugchar'])
		delegatecontrol = BeDelegate.objects.filter(involvolvedgroup=groupdata.id, delegateuser=self.request.user.id)
		if groupdata.user != self.object.user and not delegatecontrol.exists():
			return HttpResponse(json.dumps({'posttypeerror':'this post do not have or you are not delegate'}), content_type = "application/json")
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

@method_decorator(decorators, name='dispatch')
class AnnouncementsPostsDeleteView(DeleteView, FormMixin):
	model = Announcements
	form_class = AnnouncementsForm
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = "creategroup/annocement_delete.html"
	template_name_suffix = "_delete"
	success_url = None
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def get(self, request, *args, **kwargs):
		try:
			self.object = self.get_object()
			delete_posts = self.object
		except:
			self.object = None
		if self.object == None:
			return redirect ('groupname')
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		groupcontget = self.object.creategrouppost
		context = self.get_context_data(object=self.object, form=form, groupwh=groupcontget)
		return self.render_to_response(context)
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object
	
	def deletes_ajax(self, form):
		self.object = self.get_object()
		self.object.delete()
		return HttpResponse(json.dumps({'success':'silindi'}), content_type = "application/json")
	
	def put(self, request, *args, **kwargs):
		form_name = 'deleteformname'
		instanceobject = self.get_object()
		post_form = AnnouncementsForm(self.request.POST or None, self.request.FILES or None, instance = instanceobject)
		if post_form.is_valid():
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	def form_valid_ajax(self, form):
		postform = form
		if self.request.is_ajax():
			return self.deletes_ajax(postform)
		else:
			return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT Silindi'}), content_type = "application/json")
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		groupdata = get_object_or_404(CreateGroup, pk = request.POST['valuepk'], slug = request.POST['valueslug'])
		delegatecontrol = BeDelegate.objects.filter(involvolvedgroup=groupdata.id, delegateuser=self.request.user.id)
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		if groupdata.user != self.object.user:
			return HttpResponse(json.dumps({'posttypeerror':'this post do not have'}), content_type = "application/json")
		if not delegatecontrol.exists():
			return HttpResponse(json.dumps({'posttypeerror':'you are not delegate'}), content_type = "application/json")
		else:
			if 'application/x-www-form-urlencoded' == request.POST['postesttype']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' == request.POST['postesttype']:
				return HttpResponse(json.dumps({'posttypeerror':'ajax olarak gönder'}), content_type = "application/json")
	
	def get_initial(self):
		get_object = self.get_object()
		postsgroupwrite = get_object.postsgroupwrite
		initial = {'postsgroupwrite':postsgroupwrite}
		return initial
	
	def get_context_data(self, **kwargs):
		context = super(AnnouncementsPostsDeleteView, self).get_context_data(**kwargs)
		initial = self.get_initial()
		groupidwh = kwargs['groupwh']
		whusr = kwargs['object'] 
		delegecont = BeDelegate.objects.filter(involvolvedgroup=groupidwh.id, delegateuser=self.request.user.id)
		if delegecont.exists() and whusr.user== self.request.user.id or groupidwh.user == self.request.user.id:
			context['delete_posts'] = kwargs['object']
			#context['profile_form'] = kwargs['form']
			context['profile_form'] = AnnouncementsForm(initial=initial)
		else:
			context['delete_posts'] = None
			context['profile_form'] = None
		return context

#Announce detail post
#@method_decorator(decorators, name='dispatch')
#class AnnounceDetailPosts(DetailView, FormView):
@method_decorator(decorators, name='dispatch')
class AnnounceDetailPosts(DetailView):
	context_object_name = 'detail_posts'
	model = Announcements
	slug_url_kwarg = 'slug'
	pk_url_kwarg = 'pk'
	template_name = "creategroup/announcepost_detail.html"
	template_name_suffix = '_detail'
	#form_class = EnfafiloCommentForm
	http_method_names = [u'get', u'post', u'put']
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	def get(self, request, *args, **kwargs):
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		return render(self.request, self.template_name, context)
	'''
	def put(self, request, *args, **kwargs):
		form_name = 'createcomment'
		content_get_type = ContentType.objects.get_for_model(self.object)
		data = {'commentcontent': request.POST['commentcontent'], \
			'commentappear': request.POST['commentappear'], \
			'feeling': request.POST['feeling'], \
			'publishselect': request.POST['publishselect'], \
			'content_type': request.POST['content_type'], \
			'object_id': request.POST['object_id'], \
			'publishposts': request.POST['publishposts']}
		post_form = EnfafiloCommentForm(data, instance = content_get_type)
		if post_form.is_valid():
			post_form.commentcontent = post_form.cleaned_data['commentcontent']
			post_form.commentappear = post_form.cleaned_data['commentappear']
			post_form.feeling = post_form.cleaned_data['feeling']
			post_form.publishselect = post_form.cleaned_data['publishselect']
			#ctype = post_form.cleaned_data['content_type']
			#content_type = ContentType.objects.get_for_id(ctype)
			post_form.content_type = content_get_type
			post_form.object_id = post_form.cleaned_data['object_id']
			post_form.publishposts = post_form.cleaned_data['publishposts']
			try:
				parent_id = int(request.POST.get('parent_id'))
			except:
				parent_id = None
			try:
				secondparent_id = int(request.POST.get('secondparent_id'))
			except:
				secondparent_id = None
			try:
				thirdparent_id = int(request.POST.get('thirdparent_id'))
			except:
				thirdparent_id = None
			parent_obj = None
			secondparent_obj = None
			thirdparent_obj = None
			if parent_id != None:
				parent_qs = EnfafiloComment.objects.filter(id=parent_id)
				if parent_qs.exists():
					parent_obj = parent_qs.first()
			if secondparent_id != None:
				secondparent_qs = EnfafiloComment.objects.filter(id=secondparent_id)
				if secondparent_qs.exists():
					secondparent_obj = secondparent_qs.first()
			if thirdparent_id != None:
				thirdparent_qs = EnfafiloComment.objects.filter(id=thirdparent_id)
				if thirdparent_qs.exists():
					thirdparent_obj = thirdparent_qs.first()
			post_form.parent = parent_obj
			post_form.secondparent = secondparent_obj
			post_form.thirdparent = thirdparent_obj
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def form_valid_ajax(self, form):
		post_form = form
		is_valid = True
		post_form.user = self.request.user
		new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user,  \
			commentcontent = post_form.commentcontent, \
			content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			secondparent = post_form.secondparent, thirdparent = post_form.thirdparent, commentappear = post_form.commentappear, publishselect = post_form.publishselect, feeling = post_form.feeling, \
			publishposts = post_form.publishposts)
		if created:
			commentajax = EnfafiloComment.objects.filter(id = new_comment.id)
			jsondata = commentajax.values('pk', 'commentcontent', 'feeling', 'publishposts')
			dictbe = [dict(item) for item in jsondata]
			for getdict in dictbe:
				getdatadict = getdict
			jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default= self.myconverter)
			if not commentajax:
				return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
			if self.request.is_ajax():
				return HttpResponse(jsongetdatas, content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT YAPILDI'}), content_type ="application/json")
		else:
			return HttpResponse(json.dumps({'error':'yorum yaratılmadı'}), content_type ="application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not self.object:
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' in request.META['CONTENT_TYPE']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' in request.META['CONTENT_TYPE']:
				form_name = 'createcomment'
				content_get_type = ContentType.objects.get_for_model(self.object)
				post_form = EnfafiloCommentForm(request.POST, self.request.FILES, instance = content_get_type)
				if post_form.is_valid():
					post_form.commentcontent = post_form.cleaned_data['commentcontent']
					post_form.commentappear = post_form.cleaned_data['commentappear']
					post_form.feeling = post_form.cleaned_data['feeling']
					post_form.publishselect = post_form.cleaned_data['publishselect']
					#ctype = post_form.cleaned_data['content_type']
					#content_type = ContentType.objects.get_for_id(ctype)
					post_form.content_type = content_get_type
					post_form.object_id = post_form.cleaned_data['object_id']
					post_form.publishposts = post_form.cleaned_data['publishposts']
					try:
						parent_id = int(request.POST.get('parent_id'))
					except:
						parent_id = None
					try:
						secondparent_id = int(request.POST.get('secondparent_id'))
					except:
						secondparent_id = None
					try:
						thirdparent_id = int(request.POST.get('thirdparent_id'))
					except:
						thirdparent_id = None
					parent_obj = None
					secondparent_obj = None
					thirdparent_obj = None
					if parent_id != None:
						parent_qs = EnfafiloComment.objects.filter(id=parent_id)
						if parent_qs.exists():
							parent_obj = parent_qs.first()
					if secondparent_id != None:
						secondparent_qs = EnfafiloComment.objects.filter(id=secondparent_id)
						if secondparent_qs.exists():
							secondparent_obj = secondparent_qs.first()
					if thirdparent_id != None:
						thirdparent_qs = EnfafiloComment.objects.filter(id=thirdparent_id)
						if thirdparent_qs.exists():
							thirdparent_obj = thirdparent_qs.first()
					post_form.parent = parent_obj
					post_form.secondparent = secondparent_obj
					post_form.thirdparent = thirdparent_obj
					return self.form_valid(post_form)
				else:
					return HttpResponse(self.form_invalid(**{form_name: post_form}))
			else:
				return HttpResponse("Buraya bir form hatalı sayfası koy")
	def form_valid(self, form):
		post_form = form
		is_valid = True
		post_form.user = self.request.user
		new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user, \
			commentcontent = post_form.commentcontent, \
			content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			secondparent = post_form.secondparent, thirdparent = post_form.thirdparent, commentappear = post_form.commentappear, publishselect = post_form.publishselect, feeling = post_form.feeling, \
			publishposts = post_form.publishposts)
		if created:
			return redirect('postscontent', self.object.user.username, self.object.pk, self.object.slug)
		else:
			return HttpResponse("hatalı gönderim sayfasına gitsin")
	
	def form_invalid(self, **kwargs):
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		return render(self.request, self.template_name, context)#bunu düzelt
	'''
	
	def get_context_data(self, **kwargs):
		context = super(AnnounceDetailPosts, self).get_context_data(**kwargs)
		context['detail_posts'] = kwargs['object']
		detaildatas = kwargs['object']
		followcnt = GroupJoin.objects.filter(togroup = detaildatas.creategrouppost.id, fromuser = self.request.user, joinstatus="JOINED")
		if followcnt.exists():
			context['followcnt'] = True
		else:
			context['followcnt'] = False
		delegecntg = BeDelegate.objects.filter(involvolvedgroup = detaildatas.creategrouppost.id, delegateuser = self.request.user)
		if delegecntg.exists():
			context['delegecntg'] = True
		else:
			context['delegecntg'] = False
		#form_class = self.get_form_class()
		#form = self.get_form(form_class)
		#context['form'] = form
		#contenttypeid = ContentType.objects.get_for_model(kwargs['object'])
		#context['contenttypeid'] = contenttypeid.id
		#commentcontent = EnfafiloComment.objects.filter(commentenfafilo__id = kwargs['object'].id)
		#context['commentcontent'] = commentcontent
		#if 'createcomment' not in context:
			#context['form'] = self.form_class()
		return context
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		getusername = self.kwargs['username']
		user = get_object_or_404(User, username = getusername)
		queryset = self.model.objects.get(pk = getid, user = user, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
#posts detail and comment
@method_decorator(decorators, name='dispatch')
class DetailPosts(DetailView, FormView, ListView):
	context_object_name = 'detail_posts'
	model = GroupPostses
	slug_url_kwarg = 'slug'
	pk_url_kwarg = 'pk'
	template_name = "creategroup/post_detail.html"
	template_name_suffix = '_detail'
	form_class = EnfafiloCommentForm
	http_method_names = [u'get', u'post', u'put']
	#new adding
	object_list = EnfafiloComment.objects.all()
	ordering = ['createposts']
	paginate_by = 50
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	def get(self, request, *args, **kwargs):
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		return render(self.request, self.template_name, context)
	
	def put(self, request, *args, **kwargs):
		form_name = 'createcomment'
		content_get_type = ContentType.objects.get_for_model(self.object)
		#data = {'commentcontent': request.POST.get('commentcontent', ''), \
			#'commentappear': request.POST.get('commentappear', ''), \
			#'feeling': request.POST.get('feeling', ''), \
			#'publishselect': request.POST.get('publishselect', ''), \
			#'content_type': request.POST.get('content_type', ''), \
			#'object_id': request.POST.get('object_id', ''), \
			#'publishposts': request.POST.get('publishposts', '')
			#}
		data = {'commentcontent': request.POST.get('commentcontent', ''), \
			'content_type': request.POST.get('content_type', ''), \
			'object_id': request.POST.get('object_id', '') \
			}
		post_form = EnfafiloCommentForm(data, instance = content_get_type)
		if post_form.is_valid():
			post_form.commentcontent = post_form.cleaned_data['commentcontent']
			#post_form.commentappear = post_form.cleaned_data['commentappear']
			#post_form.feeling = post_form.cleaned_data['feeling']
			#post_form.publishselect = post_form.cleaned_data['publishselect']
			#ctype = post_form.cleaned_data['content_type']
			#content_type = ContentType.objects.get_for_id(ctype)
			post_form.content_type = content_get_type
			post_form.object_id = post_form.cleaned_data['object_id']
			#post_form.publishposts = post_form.cleaned_data['publishposts']
			try:
				parent_id = int(request.POST.get('parent_id'))
			except:
				parent_id = None
			try:
				secondparent_id = int(request.POST.get('secondparent_id'))
			except:
				secondparent_id = None
			try:
				thirdparent_id = int(request.POST.get('thirdparent_id'))
			except:
				thirdparent_id = None
			parent_obj = None
			secondparent_obj = None
			thirdparent_obj = None
			if parent_id != None:
				parent_qs = EnfafiloComment.objects.filter(id=parent_id)
				if parent_qs.exists():
					parent_obj = parent_qs.first()
			if secondparent_id != None:
				secondparent_qs = EnfafiloComment.objects.filter(id=secondparent_id)
				if secondparent_qs.exists():
					secondparent_obj = secondparent_qs.first()
			if thirdparent_id != None:
				thirdparent_qs = EnfafiloComment.objects.filter(id=thirdparent_id)
				if thirdparent_qs.exists():
					thirdparent_obj = thirdparent_qs.first()
			post_form.parent = parent_obj
			post_form.secondparent = secondparent_obj
			post_form.thirdparent = thirdparent_obj
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")
	
	def form_valid_ajax(self, form):
		post_form = form
		is_valid = True
		post_form.user = self.request.user
		try:
			parent_id = int(self.request.POST.get('parent_id'))
		except:
			parent_id = None
		#new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user, \
			#commentcontent = post_form.commentcontent, \
			#content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			#secondparent = post_form.secondparent, thirdparent = post_form.thirdparent, commentappear = post_form.commentappear, publishselect = post_form.publishselect, feeling = post_form.feeling, \
			#publishposts = post_form.publishposts)
		if parent_id != None:
			whoiscom = EnfafiloComment.objects.filter(id = parent_id).first()
		else:
			whoiscom = get_object_or_404(GroupPostses, id=post_form.object_id)
		if self.request.POST.get('isfiveanswers', '') == '':
			whoiscom = whoiscom
		else:
			five_parent_id = int(self.request.POST.get('isfiveanswers', ''))
			whoiscom = EnfafiloComment.objects.filter(id = five_parent_id).first()
		new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user, \
			commentcontent = post_form.commentcontent, \
			content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			secondparent = post_form.secondparent, thirdparent = post_form.thirdparent,  \
			whoto = whoiscom.user)
		if created:
			commentmessage = f"{new_comment.user.username} write comment about you, comment is: {new_comment.commentcontent}"
			messages_new_comment, msgcreated = MessageBoxDef.objects.get_or_create(user = whoiscom.user, messagechar = commentmessage)
			commentajax = EnfafiloComment.objects.filter(id = new_comment.id)
			#jsondata = commentajax.values('pk', 'slug', 'commentcontent', 'feeling', 'publishposts')
			jsondata = commentajax.values('pk', 'slug', 'commentcontent', 'updateposts')
			dictbe = [dict(item) for item in jsondata]
			for getdict in dictbe:
				getdatadict = getdict
			for pareget in commentajax:
				prntid = pareget.parent
				scnprntid = pareget.secondparent
				thrdprntid = pareget.thirdparent
				getusername = pareget.user.username
				getupdateposts = pareget.updateposts
			getdatadict['parent'] = prntid
			getdatadict['secondparent'] = scnprntid
			getdatadict['thirdparent'] = thrdprntid
			getdatadict['username'] = getusername
			getdatadict['updateposts'] = f"{getupdateposts:%d %m %Y}"
			getdatadict['whois'] = whoiscom.user.username
			jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default= self.myconverter)
			if not commentajax:
				return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
			if self.request.is_ajax():
				return HttpResponse(jsongetdatas, content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT YAPILDI'}), content_type ="application/json")
		else:
			return HttpResponse(json.dumps({'error':'yorum yaratılmadı'}), content_type ="application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		if not self.object:
			return HttpResponseRedirect('/')
		else:
			if 'application/x-www-form-urlencoded' in request.META['CONTENT_TYPE']:
				return self.put(request, *args, **kwargs)
			if 'multipart/form-data' in request.META['CONTENT_TYPE']:
				form_name = 'createcomment'
				content_get_type = ContentType.objects.get_for_model(self.object)
				post_form = EnfafiloCommentForm(request.POST, self.request.FILES, instance = content_get_type)
				if post_form.is_valid():
					post_form.commentcontent = post_form.cleaned_data['commentcontent']
					##post_form.commentappear = post_form.cleaned_data['commentappear']
					##post_form.feeling = post_form.cleaned_data['feeling']
					##post_form.publishselect = post_form.cleaned_data['publishselect']
					#ctype = post_form.cleaned_data['content_type']
					#content_type = ContentType.objects.get_for_id(ctype)
					post_form.content_type = content_get_type
					post_form.object_id = post_form.cleaned_data['object_id']
					##post_form.publishposts = post_form.cleaned_data['publishposts']
					try:
						parent_id = int(request.POST.get('parent_id'))
					except:
						parent_id = None
					try:
						secondparent_id = int(request.POST.get('secondparent_id'))
					except:
						secondparent_id = None
					try:
						thirdparent_id = int(request.POST.get('thirdparent_id'))
					except:
						thirdparent_id = None
					parent_obj = None
					secondparent_obj = None
					thirdparent_obj = None
					if parent_id != None:
						parent_qs = EnfafiloComment.objects.filter(id=parent_id)
						if parent_qs.exists():
							parent_obj = parent_qs.first()
					if secondparent_id != None:
						secondparent_qs = EnfafiloComment.objects.filter(id=secondparent_id)
						if secondparent_qs.exists():
							secondparent_obj = secondparent_qs.first()
					if thirdparent_id != None:
						thirdparent_qs = EnfafiloComment.objects.filter(id=thirdparent_id)
						if thirdparent_qs.exists():
							thirdparent_obj = thirdparent_qs.first()
					post_form.parent = parent_obj
					post_form.secondparent = secondparent_obj
					post_form.thirdparent = thirdparent_obj
					return self.form_valid(post_form)
				else:
					return HttpResponse(self.form_invalid(**{form_name: post_form}))
			else:
				return HttpResponse("Buraya bir form hatalı sayfası koy")
	def form_valid(self, form):
		post_form = form
		is_valid = True
		post_form.user = self.request.user
		#new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user, \
			#commentcontent = post_form.commentcontent, \
			#content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			#secondparent = post_form.secondparent, thirdparent = post_form.thirdparent, commentappear = post_form.commentappear, publishselect = post_form.publishselect, feeling = post_form.feeling, \
			#publishposts = post_form.publishposts)
		new_comment, created = EnfafiloComment.objects.get_or_create(user = post_form.user, \
			commentcontent = post_form.commentcontent, \
			content_type = post_form.content_type, object_id = post_form.object_id, parent = post_form.parent, \
			secondparent = post_form.secondparent, thirdparent = post_form.thirdparent,  \
			)
		if created:
			return redirect('postscontent', self.object.user.username, self.object.pk, self.object.slug)
		else:
			return HttpResponse("hatalı gönderim sayfasına gitsin")
	
	def form_invalid(self, **kwargs):
		#self.object = self.get_object()
		#context = self.get_context_data(object=self.object)
		#return render(self.request, self.template_name, context)#bunu düzelt
		return HttpResponse(json.dumps({'error':'this form is error'}), content_type = "application/json")
	
	def get_context_data(self, **kwargs):
		context = super(DetailPosts, self).get_context_data(**kwargs)
		detaildatas = kwargs['object']
		context['detail_posts'] = kwargs['object']
		form_class = self.get_form_class()
		form = self.get_form(form_class)
		context['form'] = form
		contenttypeid = ContentType.objects.get_for_model(kwargs['object'])
		context['contenttypeid'] = contenttypeid.id
		commentcontent = EnfafiloComment.objects.filter(groupcommentenfafilo__id = kwargs['object'].id)
		#context['commentcontent'] = commentcontent
		#new
		if commentcontent:
			paginator = Paginator(commentcontent, self.paginate_by)
			page = self.request.GET.get('page')
			try:
				file_exams = paginator.page(page)
			except PageNotAnInteger:
				file_exams = paginator.page(1)
		context['commentcontent'] = file_exams
		#new end
		if 'createcomment' not in context:
			context['form'] = self.form_class()
		followcnt = GroupJoin.objects.filter(togroup = detaildatas.creategrouppost.id, fromuser = self.request.user, joinstatus="JOINED")
		if followcnt.exists():
			context['followcnt'] = True
		else:
			context['followcnt'] = False
		delegecntg = BeDelegate.objects.filter(involvolvedgroup = detaildatas.creategrouppost.id, delegateuser = self.request.user)
		if delegecntg.exists():
			context['delegecntg'] = True
		else:
			context['delegecntg'] = False
		return context
	
	def get_queryset(self):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		getusername = self.kwargs['username']
		user = get_object_or_404(User, username = getusername)
		#queryset = self.model.objects.get(pk = getid, user = user, slug = getslug)
		queryset = get_object_or_404(self.model, pk = getid, user = user, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object

class CommentDeletes(DeleteView):
	model = EnfafiloComment
	pk_url_kwarg = 'pk'
	slug_url_kwarg = 'slug'
	slug_field = 'slug'
	template_name = None
	template_name_suffix = None

	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)

	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = get_object_or_404(self.model, pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
			if self.object:
				return self.object
			else:
				self.object = None
				return self.object

	def deletes_ajax(self, form):
		#self.object = self.get_object()
		self.object.delete()
		return HttpResponse(json.dumps({'success':'deleted this post'}), content_type = "application/json")

	def put(self, request, *args, **kwargs):
		form_name = 'deletecommentformname'
		instanceobject = self.get_object()
		#data = {'feeling': self.request.POST['feeling']}
		self.object = self.model.objects.get(pk = request.POST['postgetid'], slug = request.POST['btnpostslug'])
		post_form = EnfafiloDeleteCommentForm(self.request.POST or None, self.request.FILES or None)
		if post_form.is_valid():
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))

	def form_valid_ajax(self, form):
		postform = form
		if self.request.is_ajax():
			return self.deletes_ajax(postform)
		else:
			return HttpResponse(json.dumps({'error':'dont ajax but this post delete'}), content_type = "application/json")

	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'this form is error'}), content_type = "application/json")

	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		commentcont = EnfafiloComment.objects.filter(pk = int(request.POST['valuepk']), slug = request.POST['valueslug'])
		if not commentcont.exists():
			return HttpResponseRedirect('/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			return self.put(request, *args, **kwargs)

class EditCommentPosts(UpdateView):
	context_object_name = None
	form_class = EnfafiloCommentForm
	http_method_names = [u'get', u'post', u'put']
	model = EnfafiloComment
	pk_url_kwarg = 'pk'
	slug_field = 'slug'
	slug_url_kwarg = 'slug'
	template_name = None
	template_name_suffix = '_update'
	
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		if request.method.lower() in self.http_method_names:
			handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
		else:
			handler = self.http_method_not_allowed
		self.request = request
		self.args = args
		self.kwargs = kwargs
		return handler(request, *args, **kwargs)
	
	def myconverter(self, o):
		if isinstance(o, datetime.datetime):
			return o.__str__()
	
	def get_queryset(self, **kwargs):
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		queryset = self.model.objects.get(pk = getid, slug = getslug)
		return queryset
	
	def get_object(self, queryset=None):
		if queryset is None:
			self.object = self.get_queryset()
		return self.object
	
	def get(self, request, *args, **kwargs):
		form_class = self.get_form_class()
		form_name = 'createpostone'
		form = self.get_form(form_class)
		mydata = self.get_object()
		context = self.get_context_data(object=mydata, form=form)
		return self.render_to_response(context)
	
	def get_context_data(self, **kwargs):
		context = super(EditCommentPosts, self).get_context_data(**kwargs)
		context['mydata'] = kwargs['object']
		context['form'] = kwargs['form']
		return context
	
	def put(self, request, *args, **kwargs):
		#aşağıdaki satırı güncelliyoru
		##contentinstance = GroupPostses.objects.get(pk = request.POST['postidgets'], slug = request.POST['postsluggets'], user = int(request.POST['postsusrgets']))
		self.object = self.model.objects.get(pk = request.POST['pstsid'], slug = request.POST['pstslg'])
		#instanceobject = self.get_object()
		form_name = 'createcomment'
		##content_get_type = ContentType.objects.get_for_model(contentinstance)
		content_get_type = ContentType.objects.get(id = request.POST['content_type'])
		##data = {'commentcontent': request.POST.get('commentcontent', ''), \
			##'commentappear': request.POST.get('commentappear', ''), \
			##'feeling': request.POST.get('feeling', ''), \
			##'publishselect': request.POST.get('publishselect', ''), \
			##'content_type': request.POST.get('content_type', ''), \
			##'object_id': request.POST.get('object_id', ''), \
			##'publishposts': request.POST.get('publishposts', '')}
		data = {'commentcontent': request.POST.get('commentcontent', ''), \
			'content_type': request.POST.get('content_type', ''), \
			'object_id': request.POST.get('object_id', '') \
			}
		post_form = EnfafiloCommentForm(data, instance = content_get_type)
		if post_form.is_valid():
			post_form.commentcontent = post_form.cleaned_data['commentcontent']
			#post_form.commentappear = post_form.cleaned_data['commentappear']
			#post_form.feeling = post_form.cleaned_data['feeling']
			#post_form.publishselect = post_form.cleaned_data['publishselect']
			#ctype = post_form.cleaned_data['content_type']
			#content_type = ContentType.objects.get_for_id(ctype)
			post_form.content_type = content_get_type
			post_form.object_id = post_form.cleaned_data['object_id']
			#post_form.publishposts = post_form.cleaned_data['publishposts']
			return self.form_valid_ajax(post_form)
		else:
			return HttpResponse(self.form_invalid_ajax(**{form_name: post_form}))
	
	def form_valid_ajax(self, form):
		post_form = form
		is_valid = True
		post_form.user = self.request.user
		foripob = self.object
		'''
		try:
			parent_id = int(self.request.POST.get('parent_id'))
		except:
			parent_id = None
		if parent_id != None:
			whoiscom = EnfafiloComment.objects.filter(id = parent_id).first()
		else:
			whoiscom = get_object_or_404(GroupPostses, id=post_form.object_id)
		'''
		'''
		update_comment = EnfafiloComment.objects.update(user = post_form.user, \
			commentcontent = post_form.commentcontent, \
			content_type = post_form.content_type, object_id = post_form.object_id, commentappear = post_form.commentappear, publishselect = post_form.publishselect, feeling = post_form.feeling, \
			publishposts = post_form.publishposts)
		'''
		foripob.user = post_form.user
		foripob.commentcontent = post_form.commentcontent
		foripob.content_type = post_form.content_type
		foripob.object_id = post_form.object_id
		foripob.updateposts = datetime.datetime.now()
		##foripob.whoto = whoiscom.user
		#foripob.commentappear = post_form.commentappear
		#foripob.publishselect = post_form.publishselect
		#foripob.feeling = post_form.feeling
		#foripob.publishposts = post_form.publishposts
		foripob.save()
		filtgetcomment = EnfafiloComment.objects.filter(pk = foripob.id)
		#if update_comment == True:
		if foripob:
			for updtcm in filtgetcomment:
				upcomid = updtcm.id
			commentajax = EnfafiloComment.objects.filter(id = upcomid)
			jsondata = commentajax.values('pk', 'slug', 'commentcontent', 'updateposts')
			dictbe = [dict(item) for item in jsondata]
			for getdict in dictbe:
				getdatadict = getdict
			for pareget in commentajax:
				prntid = pareget.parent
				scnprntid = pareget.secondparent
				thrdprntid = pareget.thirdparent
				getusername = pareget.user.username
				getupdateposts = pareget.updateposts
				whocommname = pareget.whoto
			getdatadict['parent'] = prntid
			getdatadict['secondparent'] = scnprntid
			getdatadict['thirdparent'] = thrdprntid
			getdatadict['username'] = getusername
			##getdatadict['whois'] = whoiscom.user.username
			getdatadict['updateposts'] = f"{getupdateposts:%d %m %Y}"
			getdatadict['whois'] = whocommname.username
			jsongetdatas = json.dumps(getdatadict, encoding='utf-8', separators=(',', ':'), sort_keys=True, default= self.myconverter)
			if not commentajax:
				return HttpResponse(json.dumps({'error':'absent post'}), content_type = "application/json")
			if self.request.is_ajax():
				return HttpResponse(jsongetdatas, content_type = "application/json")
			else:
				return HttpResponse(json.dumps({'error':'AJAX DEĞİL AMA KAYIT YAPILDI'}), content_type ="application/json")
		else:
			return HttpResponse(json.dumps({'error':'yorum yaratılmadı'}), content_type ="application/json")
	
	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		getid = self.kwargs['pk']
		getslug = self.kwargs['slug']
		commentcont = EnfafiloComment.objects.filter(pk = getid, slug = getslug)
		if not commentcont.exists():
			return HttpResponseRedirect('/')
		if not User.objects.filter(pk = self.request.user.id):
			return HttpResponseRedirect('/')
		else:
			return self.put(request, *args, **kwargs)
	
	def form_invalid_ajax(self, **kwargs):
		return HttpResponse(json.dumps({'error':'Formda hata var bir denetle'}), content_type = "application/json")

#the most PostCounter have1
@method_decorator(decorators, name='dispatch')
class TheMostPostCounter(ListView):
	model = PostCounter
	template_name = "creategroup/thepost_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostPostCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = PostCounter.objects.all()
		return queryset


#the most PostRequestDeleteCounter have
@method_decorator(decorators, name='dispatch')
class TheMostPostRequestDeleteCounter(ListView):
	model = PostRequestDeleteCounter
	template_name = "creategroup/thepostreqdel_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostPostRequestDeleteCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = PostRequestDeleteCounter.objects.all()
		return queryset

#the most PostDelCount have
@method_decorator(decorators, name='dispatch')
class TheMostPostDelCount(ListView):
	model = PostDelCount
	template_name = "creategroup/thepostdelco_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostPostDelCount, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = PostDelCount.objects.all()
		return queryset

#the most UserRequestDeleteCounter have
@method_decorator(decorators, name='dispatch')
class TheMostUserRequestDeleteCounter(ListView):
	model = UserRequestDeleteCounter
	template_name = "creategroup/thepostreqdelco_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostUserRequestDeleteCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = UserRequestDeleteCounter.objects.all()
		return queryset

#the most UserVotePositiveActivityCounter have
@method_decorator(decorators, name='dispatch')
class TheMostUserVotePositiveActivityCounter(ListView):
	model = UserVotePositiveActivityCounter
	template_name = "creategroup/thepostvoposactco_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostUserVotePositiveActivityCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = UserVotePositiveActivityCounter.objects.all()
		return queryset

#the most UserVoteNegativeActivityCounter have
@method_decorator(decorators, name='dispatch')
class TheMostUserVoteNegativeActivityCounter(ListView):
	model = UserVoteNegativeActivityCounter
	template_name = "creategroup/thepostvotnegactco_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostUserVoteNegativeActivityCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = UserVoteNegativeActivityCounter.objects.all()
		return queryset

#the most UserDeletePositiveActivityCounter have
@method_decorator(decorators, name='dispatch')
class TheMostUserDeletePositiveActivityCounter(ListView):
	model = UserDeletePositiveActivityCounter
	template_name = "creategroup/thepostdelpoaccou_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostUserDeletePositiveActivityCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = UserDeletePositiveActivityCounter.objects.all()
		return queryset

#the most UserDeleteNegativeActivityCounter have
@method_decorator(decorators, name='dispatch')
class TheMostUserDeleteNegativeActivityCounter(ListView):
	model = UserDeleteNegativeActivityCounter
	template_name = "creategroup/thepostdelnefaccoun_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostUserDeleteNegativeActivityCounter, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = UserDeleteNegativeActivityCounter.objects.all()
		return queryset

#the most PostPositiveVotes have
@method_decorator(decorators, name='dispatch')
class TheMostPostPositiveVotes(ListView):
	model = PostPositiveVotes
	template_name = "creategroup/thepostpositvots_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostPostPositiveVotes, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = PostPositiveVotes.objects.all()
		return queryset

#the most PostNegativeVotes have
@method_decorator(decorators, name='dispatch')
class TheMostPostNegativeVotes(ListView):
	model = PostNegativeVotes
	template_name = "creategroup/thepostposnegtvots_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheMostPostNegativeVotes, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = PostNegativeVotes.objects.all()
		return queryset

#the community degree
@method_decorator(decorators, name='dispatch')
class TheCommunityDegreeList(ListView):
	model = GroupDegree
	template_name = "creategroup/thefirstcommunity_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheCommunityDegreeList, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = GroupDegree.objects.all()
		return queryset

#the community first counter
@method_decorator(decorators, name='dispatch')
class TheCommunityFirstCounterList(ListView):
	model = GroupFirstCount
	template_name = "creategroup/thecommunityfirstcounter_countlist.html"
	template_name_suffix = '_countlist'
	ordering = ['counter']
	context_object_name = 'count_list'
	paginate_by = 10
	
	def get_context_data(self, **kwargs):
		context = super(TheCommunityFirstCounterList, self).get_context_data(**kwargs)
		list_mypost = self.get_queryset()
		paginator = Paginator(list_mypost, self.paginate_by)
		page = self.request.GET.get('page')
		try:
			file_exams = paginator.page(page)
		except PageNotAnInteger:
			file_exams = paginator.page(1)
		except EmptyPage:
			file_exams = paginator.page(paginator.num_pages)
		context['list_exams'] = file_exams
		return context
	
	def get_queryset(self):
		queryset = GroupFirstCount.objects.all()
		return queryset

@method_decorator(decorators, name='dispatch')
class GroupSearchView(SearchView):
	template_name = 'creategroup/group_search.html'
	form_class = GroupSearchForm
	object_list = CreateGroup.objects.all()
	paginate_by = 10
	#queryset = SearchQuerySet().filter(groupname=xxx)

	def dispatch(self, *args, **kwargs):
		return super(GroupSearchView, self).dispatch(*args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return self.render_to_response(context)

	"""
	 queryset = SearchQuerySet().autocomplete(groupname_auto=self.request.POST('q'))[:5]
     #queryset = SearchQuerySet().autocomplete(groupname_auto=request.GET.get('q', '')).models(CreateGroup, GroupPostses, Announcements).filter()
     #queryset = SearchQuerySet().spelling_suggestion(request.GET.get('q', ''))
    """

	def get_queryset(self):
		#queryset = super(GroupSearchView, self).get_queryset()
		#queryset = SearchQuerySet().autocomplete(groupname_auto=self.request.GET.get('q', ''))[:5]
		queryset = SearchQuerySet()
		return queryset
	
	def post(self, request, *args, **kwargs):
    	#selected = request.POST['q']
		form = GroupSearchForm(self.request.POST)
		if form.is_valid():
			return self.form_valid(form)
		else:
			return self.form_invalid(form)
	

	def form_valid(self, form):
		if self.request.is_ajax():
			if self.request.method == 'GET':
				if form.data != {}:
					#queries = SearchQuerySet().autocomplete(groupname_auto=form['q'])[:5]
					if self.request.GET.get('whichsearch') == 'for_group':
						queries = self.get_queryset().autocomplete(groupname_auto=self.request.GET.get('q', ''))[:5]
					else:
						queries = self.get_queryset().autocomplete(aboutgroup_auto=self.request.GET.get('q', ''))[:5]
					suggestions = [result.groupname for result in queries]
					results=[]
					for suggs in suggestions:
						suggs_json={}
						suggs_json['label']=suggs
						suggs_json['value']=suggs
						results.append(suggs_json)
					the_data = json.dumps(results)
				else:
					the_data = json.dumps({'results': 'absent data'})
			elif self.request.method == 'POST':
				if form.data != {}:
					#queries = SearchQuerySet().autocomplete(groupname_auto=form['q'])[:5]
					if self.request.POST.get('whichsearch') == 'for_group':
						queries = self.get_queryset().autocomplete(groupname_auto=self.request.POST.get('q', ''))[:5]
					else:
						queries = self.get_queryset().autocomplete(aboutgroup_auto=self.request.POST.get('q', ''))[:5]
					suggestions = [result.groupname for result in queries]
					results=[]
					for suggs in suggestions:
						#highligt start
						##highlight = Highlighter(self.request.POST.get('q', ''))
						##highlightsuggs = highlight.highlight(suggs)
						#highlight stop
						suggs_json={}
						suggs_json['label']=suggs#highlightsuggs
						suggs_json['value']=suggs
						results.append(suggs_json)
					the_data = json.dumps(results)
				else:
					the_data = json.dumps({'results': 'absent data'})
			else:
				the_data = json.dumps({'results': 'error method'})
			return  HttpResponse(the_data, content_type='application/json')
		else:
			#direkt butona basınca post yöntemi
			if self.request.method == 'GET':
				if form.data != {}:
					#queries = SearchQuerySet().autocomplete(groupname_auto=form['q'])[:5]
					if self.request.GET.get('whichsearch') == 'for_group':
						queries = self.get_queryset().filter(groupname_auto=self.request.GET.get('q', ''))
					else:
						queries = self.get_queryset().filter(aboutgroup_auto=self.request.GET.get('q', ''))
					paginator = Paginator(queries, self.paginate_by)
					page = self.request.GET.get('page')
					try:
						file_exams = paginator.page(page)
					except PageNotAnInteger:
						file_exams = paginator.page(1)
					except EmptyPage:
						file_exams = paginator.page(paginator.num_pages)
					the_data = {'results':file_exams}
				else:
					the_data = {'results': 'absent data'}
			elif self.request.method == 'POST':
				if form.data != {}:
					#queries = SearchQuerySet().autocomplete(groupname_auto=form['q'])[:5]
					if self.request.POST.get('whichsearch') == 'for_group':
						queries = self.get_queryset().filter(groupname_auto=self.request.POST.get('q', ''))
					else:
						queries = self.get_queryset().filter(aboutgroup_auto=self.request.POST.get('q', ''))
					paginator = Paginator(queries, self.paginate_by)
					page = self.request.GET.get('page')
					try:
						file_exams = paginator.page(page)
					except PageNotAnInteger:
						file_exams = paginator.page(1)
					except EmptyPage:
						file_exams = paginator.page(paginator.num_pages)
					the_data = {'results':file_exams}
				else:
					the_data = {'results': 'absent data'}
			else:
				the_data = {'results':'error method'}
			return  render(self.request, self.template_name, the_data)

	def form_invalid(self, form):
		if self.request.is_ajax():
			the_data = json.dumps({'results': 'the search error'})
			return  HttpResponse(the_data, content_type='application/json')
		else:
			return  HttpResponse({'the_datax': 'ajax değil'}, content_type='application/json')


	def get_context_data(self, *args, **kwargs):
		context = super(GroupSearchView, self).get_context_data(*args, **kwargs)
		likepostjoin = GroupJoin.objects.filter(fromuser=self.request.user, joinstatus="JOINED").order_by('createdates')
		if likepostjoin.exists():
			likepostjoin = likepostjoin[0]
			likepostgroup = GroupPostses.objects.filter(creategrouppost=likepostjoin.togroup).order_by('createdates')
			if likepostgroup.exists():
				likepostgroup = likepostgroup[0]
				likeentry = SearchQuerySet().models(GroupPostses).more_like_this(likepostgroup)[:25]
				context['likethis'] = likeentry
				#context['search'] = GroupSearchForm(self.request.GET).search()
		return context
'''
@method_decorator(decorators, name='dispatch')
class GroupSearchListView(SearchView):
	template_name = "creategroup/group_list_search.html"
	queryset = SearchQuerySet()
	form_class = GroupSearchForm

	def get_queryset(self):
		queryset = self.queryset
		return queryset

	def post(self, request, *args, **kwargs):
		form = GroupSearchForm(self.request.POST)
		if form.is_valid():
			return self.form_valid(form)
		else:
			return self.form_invalid(form)

	def form_invalid(self, form):
		the_data = json.dumps({'results': 'the search error'})
		return  HttpResponse(the_data, content_type='application/json')
'''


@method_decorator(decorators, name='dispatch')
class SearchDetailView(TemplateView):
    template_name = "creategroup/group_search.html"

    def get_context_data(self, *args, **kwargs):
    	context = super(SearchDetailView, self).get_context_data(*args, **kwargs)
    	likepostjoin = GroupJoin.objects.filter(fromuser=self.request.user, joinstatus="JOINED").order_by('createdates')
    	if likepostjoin.exists():
    		likepostjoin = likepostjoin[0]
	    	likepostgroup = GroupPostses.objects.filter(creategrouppost=likepostjoin.togroup).order_by('createdates')
	    	if likepostgroup.exists():
	    		likepostgroup = likepostgroup[0]
    			likeentry = SearchQuerySet().models(GroupPostses).more_like_this(likepostgroup)[:25]
    			context['likethis'] = likeentry
    			context['search'] = GroupSearchForm(self.request.GET).search()
    	return context





