# joinervoters/routing.py
from django.urls import path, include, re_path

from joinervoters.consumers import NotifyConsumer, PostControlConsumer

websocket_urlpatterns = [
    re_path(r'^ws/notify/(?P<notify_name>[^/]+)/$', NotifyConsumer),
    re_path(r'^ws/postcontrol/(?P<postcontrol>[^/]+)/$', PostControlConsumer),
]
