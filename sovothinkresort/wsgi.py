#!/usr/bin/env python3.6
"""
WSGI config for sovothinkresort project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os
import site
import sys

from django.core.wsgi import get_wsgi_application

site.addsitedir('/usr/local/lib/python3.6/dist-packages')
sys.path.append('/var/www')
sys.path.append('/var/www/sovothinkresort')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sovothinkresort.settings")

application = get_wsgi_application()
