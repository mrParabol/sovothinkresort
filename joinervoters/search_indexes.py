import datetime
from haystack import indexes
from joinervoters.models import CreateGroup, GroupPostses


class CreateGroupIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    groupname = indexes.CharField(model_attr='groupname', faceted=True, boost=1.125)
    aboutgroup = indexes.CharField(model_attr='aboutgroup')
    groupname_auto = indexes.EdgeNgramField(model_attr='groupname')
    aboutgroup_auto = indexes.EdgeNgramField(model_attr='aboutgroup')
    createdates = indexes.DateTimeField(model_attr='createdates')
    suggestions = indexes.FacetCharField()
    postsgroupcreateannounce = indexes.MultiValueField()
    postsgroupcreate = indexes.MultiValueField()
    grouplabels = indexes.MultiValueField()

    def get_model(self):
        return CreateGroup

    def index_queryset(self, using=None):
        return self.get_model().objects.all()

    def prepare(self, obj):
        prepared_data = super(CreateGroupIndex, self).prepare(obj)
        prepared_data['suggestions'] = prepared_data['text']
        return prepared_data

    def prepare_grouplabels(self, obj):
        return [tag.name for tag in obj.grouplabels.all()]

    def prepare_postsgroupcreateannounce(self, obj):
        return [post.postsgroupwrite for post in obj.postsgroupcreateannounce.all().order_by('createdates')]

    def prepare_postsgroupcreate(self, obj):
        return [post.postsgroupwrite for post in obj.postsgroupcreate.all().order_by('createdates')]