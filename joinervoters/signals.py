from django.db.models.signals import post_save
from django.dispatch import receiver
from joinervoters.models import User
from joinervoters.models import MessageBoxDef, GroupPostses

from channels.layers import get_channel_layer

from asgiref.sync import async_to_sync

#from django.contrib.auth.signals import user_logged_in, user_logged_out
import logging
import datetime
from allauth.account.signals import user_logged_in, user_logged_out

@receiver(post_save, sender=MessageBoxDef)
def create_notify(sender, instance, **kwargs):
	obj = MessageBoxDef.objects.get(pk=instance.pk)
	userwhoget = User.objects.get(pk=obj.user.id)
	usernameget = userwhoget.username
	notifycontent = obj.messagechar
	#for consumers following code
	layer = get_channel_layer()
	notify_name = 'notify'
	async_to_sync(layer.group_send)(notify_name, {'type': 'events_notify', 'content': usernameget, 'another': notifycontent})


@receiver(post_save, sender=GroupPostses)
def recaptcha_control(sender, instance, **kwargs):
	obj = GroupPostses.objects.get(pk=instance.pk)
	userwhoget = User.objects.get(pk=obj.user.id)
	usernameget = userwhoget.username
	startdate = datetime.datetime.now() - datetime.timedelta(minutes=20)
	if GroupPostses.objects.filter(user=userwhoget, createdates__gte = startdate).count() >= 2:
		posttype = 'add'
		#for consumers following code
		layer = get_channel_layer()
		postcontrol = 'postcontrol'
		async_to_sync(layer.group_send)(postcontrol, {'type': 'events_postcontrol', 'content': usernameget, 'another': posttype})


error_log=logging.getLogger('error')
@receiver(user_logged_out)
def log_user_logged_out(sender, user, request, **kwargs):
	try:
		login_logout_logs = User.objects.filter(id=user.id)
		if login_logout_logs.exists():
			login_logout_logs.update(logout_time=datetime.datetime.now())
		else:
			error_log.error("logged error: {}".format(request))
	except Exception:
		error_log.error("log_user_logged_out request: {}".format(request))