from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _

class JoinervotersConfig(AppConfig):
    name = 'joinervoters'
    verbose_name = _('joinervoters')

    def ready(self):
    	import joinervoters.signals
