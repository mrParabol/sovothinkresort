from django.db import models
from datetime import datetime
import time
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete
from django.utils.text import slugify
from django.urls import reverse
from django.conf import settings
from allauth.account.models import EmailAddress
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from ckeditor_uploader.fields import RichTextUploadingField
from django.dispatch import receiver
import os
from taggit.managers import TaggableManager
from vote.models import VoteModel

# Create your models here.

def searchuserpicpath (instance, filenamepic):
	fileextpic = os.path.splitext(filenamepic)[-1]
	filenamepic = os.path.splitext(filenamepic)[0]
	fileregistername = os.path.join('userpicpath', str(instance.id), str(instance.id)+filenamepic+fileextpic)
	return fileregistername

class User(AbstractUser):
	MALE = "MALE"
	FEMALE = "FEMALE"
	INTERSEX = "INTERSEX"
	SELECT_GENDER = ((MALE, "MALE"), (FEMALE, "FEMALE"), (INTERSEX, "INTERSEX"))
	birthday = models.DateField(null = True, blank = True, default=datetime.now().strftime("%Y-%m-%d"))
	gender = models.CharField("Gender", choices = SELECT_GENDER, max_length=10, default = "UNSELECT")
	feeling = models.CharField(null = True, blank = True, max_length=50)
	slug = models.SlugField(max_length=140, unique=True, default='newer')
	aboutyourself = models.TextField(null = True, blank = True)
	logout_time = models.DateTimeField(blank=True, null=True)
	
	#@models.permalink
	def get_absolute_url(self):
		return reverse('joinervoters_profiles', kwargs = {'username': self.username, 'slug': self.slug})
	
	def _get_unique_slug(self):
		slug = slugify(self.username)
		unique_slug = slug
		num = 1
		adderror = self.date_joined
		while User.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}-{}'.format(slug, num, adderror)
			num += 1
		return unique_slug
	
	def save(self, *args, **kwargs):
		if not self.slug or self.slug=='newer':
			self.slug = self._get_unique_slug()
		super().save()

class ProfilePhoto(models.Model):
	user = models.OneToOneField (User, unique = True, null = True, blank = True, on_delete = models.CASCADE, related_name = 'profilephotom')
	bigphoto = models.ImageField(upload_to = searchuserpicpath, null = True, blank = True, default='{}/defaultpic/pinbabe.jpg'.format(settings.MEDIA_ROOT))
	uploaded_at = models.DateTimeField(auto_now_add=True)
	
	class Meta:
		verbose_name_plural = u"profilephoto"
		verbose_name = u"photoprofiles"


class BackPhoto(models.Model):
	user = models.OneToOneField (User, unique = True, null = True, blank = True, on_delete = models.CASCADE, related_name = 'backprofilephotom')
	miniphoto = models.ImageField(upload_to = searchuserpicpath, null = True, blank = True, default='{}/defaultpic/pinbabe.jpg'.format(settings.MEDIA_ROOT))
	pic_uploaded_at = models.DateTimeField(auto_now_add=True)
	
	class Meta:
		verbose_name_plural = u"backphoto"
		verbose_name = u"backphotoprofiles"

#grup kodları
class CommentQuerySet(models.QuerySet):
	def filter_comment(self):
		return self.filter()
class CommentPublishManager(models.Manager):
	def get_queryset(self):
		return CommentQuerySet(self.model, using=self._db)
	def appear_comment(self, appearance):
		return self.get_queryset().filter_comment(commentappear=appearance)
	def reply_choices(self, replyselect):
		return self.get_queryset().filter_comment(publishselect=replyselect)
	def appear_reply_choice(self, appearance, replyselect):
		return self.get_queryset().filter_comment(commentappear=appearance, publishselect=replyselect)


class EnfafiloComment(VoteModel, models.Model):
	COMMENTEDON = "COMMENTEDON"
	COMMMENTCONFİRMEDFRİENS = "COMMMENTCONFİRMEDFRİENS"
	USEYOURFRİENDSETTİNGS = "USEYOURFRİENDSETTİNGS"
	COMMONFRIENDS = "COMMONFRIENDS"
	APPEARCOMMENT_CHOICES = (
	    (COMMENTEDON, 'commentedon'),
	    (COMMMENTCONFİRMEDFRİENS, 'commentconfirmedfriends'),
	    (USEYOURFRİENDSETTİNGS, 'useyourfriendsettings'),
	    (COMMONFRIENDS, "commonfriend")
	)
	FRIENDSFRIENDSCANREPLY = "FRIENDSFRIENDSCANREPLY"
	ONLYFRIEND = "ONLYFRIEND"
	REPLYCOMMONFRIENDS = "REPLYCOMMONFRIENDS"
	SEEFRIENDSEVERYONE = "SEEFRIENDSEVERYONE"
	REPLY_CHOICES = (
	    (FRIENDSFRIENDSCANREPLY, "friendsfriendscanreply"),
	    (ONLYFRIEND, "onlyfriend"),
	    (REPLYCOMMONFRIENDS, "replycommonfriends"),
	    (SEEFRIENDSEVERYONE, "seefriendseveryone")
	)
	user = models.ForeignKey(User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'commentuser')
	whoto = models.ForeignKey(User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'commentwhoto')
	commentcontent = RichTextUploadingField (blank=True, default='')
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
	object_id = models.PositiveIntegerField(null=True)
	content_object = GenericForeignKey('content_type', 'object_id')
	parent = models.ForeignKey("self", null=True, blank=True, on_delete = models.CASCADE, related_name='replies')
	secondparent = models.ForeignKey("self", null=True, blank=True, on_delete = models.CASCADE, related_name='secondreplies')
	thirdparent = models.ForeignKey("self", null=True, blank=True, on_delete = models.CASCADE, related_name='thirdreplies')
	slug = models.SlugField(max_length=140, unique=True)
	#commentappear = models.CharField("Appear", choices = APPEARCOMMENT_CHOICES, max_length=50, default = COMMENTEDON)
	#publishselect = models.CharField("PublishChoices", choices = REPLY_CHOICES, max_length=50, default = ONLYFRIEND)
	#feeling = models.CharField(null = True, blank = True, max_length=50)
	createposts = models.DateField(default = datetime.now)
	updateposts = models.DateField(default = datetime.now)
	#publishposts = models.DateTimeField(default = datetime.now)
	objects = models.Manager()
	commentpublishfilter = CommentPublishManager()
	def __str__(self):
		return "{} have the comment contents".format(self.user.username)
	def _get_unique_slug(self):
		slug = slugify(self.createposts)
		unique_slug = slug
		num = 1
		addate = slugify(self.createposts)
		while EnfafiloComment.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}-{}'.format(slug, num, addate)
			num += 1
		return unique_slug
	class Meta:
		ordering = ['-createposts']
		verbose_name_plural = u"Comment Posts"
		verbose_name = u"Comments"
	#@models.permalink
	def get_absolute_url(self):
		return reverse('commentposts', kwargs = {'id': self.id, 'slug': self.slug})
	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()


def searchgrouppicpath (instance, filenamepic):
	fileextpic = os.path.splitext(filenamepic)[-1]
	filenamepic = os.path.splitext(filenamepic)[0]
	fileregistername = os.path.join('grouppicpath', str(instance.id), str(instance.user.id)+filenamepic+fileextpic)
	return fileregistername

class CreateGroup(models.Model):
	user = models.OneToOneField (User, unique = True, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouponeuser')
	groupname = models.CharField(max_length=255, blank=True, null=True)
	bigphoto = models.ImageField(upload_to = searchgrouppicpath, null = True, blank = True)
	miniphoto = models.ImageField(upload_to = searchgrouppicpath, null = True, blank = True)
	aboutgroup = RichTextUploadingField ()
	createdates = models.DateField(auto_now_add = True)
	updates = models.DateField(auto_now_add = True)
	followacceptcontrol = models.BooleanField (default = True)
	grouplabels = TaggableManager()
	slug = models.SlugField(max_length=140, unique=True)
	
	def __str__(self):
		return '{:s} have group'.format(self.user.username)
	def _get_unique_slug(self):
		slug = slugify(str(self.groupname).lower())
		unique_slug = slug
		num = 1
		addate = slugify(self.createdates)
		while CreateGroup.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}-{}'.format(slug, num, addate)
			num += 1
		return unique_slug
	
	class Meta:
		ordering = ['-createdates']
		verbose_name_plural = u"Group Name"
		verbose_name = u"Group"
	#@models.permalink
	def get_absolute_url(self):
		return reverse('groupshowlist', kwargs = {'pk': self.id, 'slug': self.slug})
	
	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()

class GroupPostses(VoteModel, models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postsgrouponeuser')
	creategrouppost = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postsgroupcreate')
	slug = models.SlugField(max_length=140, unique=True)
	#createdates = models.DateField(auto_now_add = True)
	createdates = models.DateTimeField(auto_now_add=True, blank=True)
	updates = models.DateField(auto_now_add = True)
	feeling = models.CharField(null = True, blank = True, max_length=50)
	postsgroupwrite = RichTextUploadingField ()
	multiphoto = models.FileField(upload_to = searchgrouppicpath, null = True, blank = True)
	multifiles = models.ImageField(upload_to=searchgrouppicpath, null = True, blank = True)
	postgrouplabels = TaggableManager() #buraya kullanıcı direk etiket girmeyecek, hangi etiket altında yazıyorsa o etiket buraya işlenecek.
	comments = GenericRelation(EnfafiloComment, related_query_name = 'groupcommentenfafilo')
	
	def __str__(self):
		return "{} have the group posts".format(self.user.username)
	def _get_unique_slug(self):
		slug = slugify(self.creategrouppost.groupname)
		unique_slug = slug
		num = 1
		addate = slugify(self.createdates)
		while GroupPostses.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}-{}'.format(slug, num, addate)
			num += 1
		return unique_slug
	
	class Meta:
		ordering = ['-createdates']
		verbose_name_plural = u"Group Posts"
		verbose_name = u"Group Post"

	def get_absolute_url(self):
		return reverse('postscontent', kwargs = {'username': self.user.username, 'pk': self.id, 'slug': self.slug})
	
	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()

class ForGroupPostPhotos(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'forimageuser')
	whichgroup = models.ForeignKey (GroupPostses, null = True, blank = True, on_delete = models.CASCADE, related_name = 'forpostgroupimage')
	multifiles = models.ImageField(upload_to=searchgrouppicpath, null = True, blank = True)
		

class Announcements(VoteModel, models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postsgrouponeuserannounce')
	creategrouppost = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postsgroupcreateannounce')
	slug = models.SlugField(max_length=140, unique=True)
	createdates = models.DateField(auto_now_add = True)
	updates = models.DateField(auto_now_add = True)
	postsgroupwrite = RichTextUploadingField ()
	#comments = GenericRelation(EnfafiloComment, related_query_name = 'groupcommentannounce')
	
	def __str__(self):
		return "{} have the group announce".format(self.user.username)
	def _get_unique_slug(self):
		slug = slugify(self.creategrouppost.groupname)
		unique_slug = slug
		num = 1
		addate = slugify(self.createdates)
		while Announcements.objects.filter(slug=unique_slug).exists():
			unique_slug = '{}-{}-{}'.format(slug, num, addate)
			num += 1
		return unique_slug
	
	class Meta:
		ordering = ['-createdates']
		verbose_name_plural = u"Group Announces"
		verbose_name = u"Group Announces"
	
	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()

class GroupJoin(models.Model):
	JOINED = "JOINED"
	UNJOİNED = "UNJOINED"
	SENDEDREQUEST = "SENDEDREQUEST"
	BLOCKED = "BLOCKED"
	UNBLOCKED = "UNBLOCKED"
	togroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'togroupjoin')
	fromuser = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'fromfollowrequest')
	SELECT_JOIN = ((JOINED, "JOINED"), (UNJOİNED, "UNJOINED"), (BLOCKED, "BLOCKED"), (UNBLOCKED, "UNBLOCKED"), (SENDEDREQUEST, "SENDEDREQUEST"))
	joinstatus = models.CharField("Type", choices = SELECT_JOIN, max_length=20, default = UNJOİNED)
	createdates = models.DateTimeField(auto_now_add = True)
	
	def __str__(self):
		return "{} join to group".format(self.togroup.groupname)
	
	class Meta:
		ordering = ['-createdates']

class BeDelegate(models.Model):
	ADVISOR = "ADVISOR"
	CHIEFADVISOR = "CHIEFADVISOR"
	ASISTANTADVISOR = "ASISTANTADVISOR"
	CHIEFAUTHOR = "CHIEFAUTHOR"
	CHIEFREADER = "CHIEFREADER"
	SELECT_STATUS = ((ADVISOR, "ADVISOR"), (CHIEFADVISOR, "CHIEFADVISOR"), (ASISTANTADVISOR, "ASISTANTADVISOR"), (CHIEFAUTHOR, "CHIEFAUTHOR"), (CHIEFREADER, "CHIEFREADER"))
	involvolvedgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'togroupinvolved')
	delegateuser = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'delegateuserget')
	joineruser = models.ForeignKey (GroupJoin, null = True, blank = True, on_delete = models.CASCADE, related_name = 'joinernumget')
	userstatusingroup = models.CharField("Typeofgroupuser", choices = SELECT_STATUS, max_length=20, default = "NORMAL")
	createdates = models.DateField(auto_now_add = True)
	
	def __str__(self):
		return "{} join to delegate".format(self.involvolvedgroup.groupname)
	
	class Meta:
		ordering = ['-createdates']

class GroupDegree(models.Model):
	LEADERGROUP = "LEADERGROUP"
	SECONDGROUP = "SECONDGROUP"
	THIRDGROUP = "THIRDGROUP"
	FOURTHGROUP = "FOURTHGROUP"
	FIFTHGROUP = "FIFTHGROUP"
	SELECT_STATUS = (("LEADERGROUP", LEADERGROUP), ("SECONDGROUP", SECONDGROUP), ("THIRDGROUP", THIRDGROUP), ("FOURTHGROUP", FOURTHGROUP), ("FIFTHGROUP", FIFTHGROUP))
	groupget = models.OneToOneField (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'groupdegreeget')
	groupstatus = models.CharField("Typegroup", choices = SELECT_STATUS, max_length=20, default = "NORMAL")
	indexgroup = models.IntegerField(null=True, blank=True)
	grouptotalpoint = models.BigIntegerField(null=True, blank=True)
	createdates = models.DateField(auto_now_add = True)
	
	def __str__(self):
		return "{} group degree".format(self.groupget.groupname)
	
	class Meta:
		ordering = ['indexgroup']

class GroupFirstCount(models.Model):
	groupget = models.OneToOneField (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'groupfirstcounter')
	counter = models.IntegerField(null=True, blank=True)
	createdates = models.DateField(auto_now_add = True)
	
	def __str__(self):
		return "{} group counter".format(self.groupget.groupname)
	
	class Meta:
		ordering = ['counter']

class ExportUser(VoteModel, models.Model):
	OPEN = "OPEN"
	CLOSED = "CLOSED"
	SELECT_STATUS = (("OPEN", OPEN), ("CLOSED", CLOSED))
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'exportselfuser')
	groupwhich = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouprequestexport')
	requestoruser = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'exportrequestor')
	createdates = models.DateField(auto_now_add = True)
	exportstatus = models.CharField("TypeExport", choices = SELECT_STATUS, max_length=20, default = "OPEN")
	
	def __str__(self):
		return "{} group degree".format(self.groupwhich.groupname)
	
	class Meta:
		ordering = ['-createdates']

class DeletePostviaVotes(VoteModel, models.Model):
	OPEN = "OPEN"
	CLOSED = "CLOSED"
	SELECT_STATUS = (("OPEN", OPEN), ("CLOSED", CLOSED))
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'deleteselfuser')
	groupwhich = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouprequestdelete')
	groupdelpost = models.ForeignKey (GroupPostses, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouppostdelete')
	delrequestoruser = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'deleterequestor')
	deletestatus = models.CharField("TypeDelete", choices = SELECT_STATUS, max_length=20, default = "OPEN")
	createdates = models.DateField(auto_now_add = True)
	
	def __str__(self):
		return "{} group degree".format(self.groupwhich.groupname)
	
	class Meta:
		ordering = ['-createdates']

#data counter models start
class PostCounter(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postcounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouppostcounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class PostRequestDeleteCounter(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postdeletecounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouppostrequestdelcounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class PostDelCount(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postdelcount')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'groupdelcount')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class UserRequestDeleteCounter(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'userdelreqcounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'groupuserdelcounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class UserVotePositiveActivityCounter(models.Model):
	#post silinsin kalsın
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'positivityvotecounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'grouppositivecounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class UserVoteNegativeActivityCounter(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'negativityvotecounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'groupnegativecounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class UserDeletePositiveActivityCounter(models.Model):
	#kişi silinsin kalsın
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'userpositivityvotecounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'usergrouppositivecounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class UserDeleteNegativeActivityCounter(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'usernegativityvotecounter')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'usergroupnegativecounter')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class PostPositiveVotes(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postpositivevotesuser')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postpositivevotesgroup')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class PostNegativeVotes(models.Model):
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postnegativevotesuser')
	whichgroup = models.ForeignKey (CreateGroup, null = True, blank = True, on_delete = models.CASCADE, related_name = 'postnegativevotesgroup')
	counter =  models.IntegerField(null=True)
	createdate = models.DateField(auto_now_add = True)
	updatedate = models.DateField(null = True)

class MessageBoxDef(models.Model):
	READ = "READ"
	UNREAD = "UNREAD"
	SELECT_STATUS = (("READ", READ), ("UNREAD", UNREAD))
	user = models.ForeignKey (User, null = True, blank = True, on_delete = models.CASCADE, related_name = 'messageuserbox')
	messagechar = models.CharField(null = True, blank = True, max_length=255)
	readunreadcontrol = models.CharField("ReadUnread", choices = SELECT_STATUS, max_length=20, default = "UNREAD")
	messagedate = models.DateField(auto_now_add = True)
	
	def __str__(self):
		return "{} messages".format(self.user.username)
	
	class Meta:
		ordering = ['-messagedate']










