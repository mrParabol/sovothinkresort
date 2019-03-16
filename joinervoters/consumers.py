from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from channels.generic.websocket import JsonWebsocketConsumer

class NotifyConsumer(JsonWebsocketConsumer):
	def connect(self):
		self.notify_name = 'notify'
		async_to_sync(self.channel_layer.group_add)(self.notify_name, self.channel_name)
		self.accept()
	
	def disconnect(self, close_code):
		async_to_sync(self.channel_layer.group_discard)(self.notify_name, self.channel_name)
		self.close()
	
	def receive_json(self, content, **kwargs):
		self.send_json({'type': 'events_notify', 'content': content['content'], 'another': content['another']})
	
	def events_notify(self, event):
		#event instead content (self, content) :: content['content']
		self.send_json({'content': event['content'], 'another': event['another']})

class PostControlConsumer(JsonWebsocketConsumer):
	def connect(self):
		self.postcontrol = 'postcontrol'
		async_to_sync(self.channel_layer.group_add)(self.postcontrol, self.channel_name)
		self.accept()
	
	def disconnect(self, close_code):
		async_to_sync(self.channel_layer.group_discard)(self.postcontrol, self.channel_name)
		self.close()
	
	def receive_json(self, content, **kwargs):
		self.send_json({'type': 'events_postcontrol', 'content': content['content'], 'another': content['another']})
	
	def events_postcontrol(self, event):
		#event instead content (self, content) :: content['content']
		self.send_json({'content': event['content'], 'another': event['another']})
