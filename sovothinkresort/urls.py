"""sovothinkresort URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from joinervoters.views import GroupSearchView
from joinervoters.models import User, CreateGroup, GroupPostses, GroupJoin, EnfafiloComment
from joinervoters.views import TheCommunityDegreeList, OwnGrPostLabelList, PostLabelList, GroupLabelList, PostsListUser, SearchDetailView, AnnounceDetailPosts, TheMostPostNegativeVotes, TheMostPostPositiveVotes, TheMostUserDeleteNegativeActivityCounter, TheMostUserDeletePositiveActivityCounter, TheMostUserVoteNegativeActivityCounter, TheMostUserVotePositiveActivityCounter, TheMostUserRequestDeleteCounter, TheMostPostDelCount, TheMostPostRequestDeleteCounter, TheMostPostCounter, EditCommentPosts, CommentDeletes, DetailPosts, DeletePostviaVotesView, GroupsPostLister, GroupPostVoterProcess, DeletePostVoterProcess, DeletePostVoterList, MessageShowLists, AnnouncementsPostsDeleteView, AnnouncementsPostsUpdateViews, AnnouncementsPosts, ExportUserVoterProcess, ExportUserList, ExportUserProcess, JoinGroupShowUNBlock, JoinUserShowWaiter, JoinUserShowJoiner, JoinGroupShowWaiting, JoinGroupShowBlock, JoinerRelationsProcess, UserDetailShow, UserProfileUpdate, UserDeleteView, JoinGroupShowJoiner, GroupListShow, CreateGroupPostsUpdateViews, CreateGroupPostsDeleteView, CreateGroupPosts, GroupDetailShow, CreateGroupDeleteView, CreateGroupViews, CreateGroupUpdateViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('searchdetail', SearchDetailView.as_view(), name="search_detail"),
    path('search/autocomplete', GroupSearchView.as_view(), name="haystack_groupsearch"),
    path('themostpostcounters', TheMostPostCounter.as_view(), name="themostpostcountername"),
    path('theposreqdelcounters', TheMostPostRequestDeleteCounter.as_view(), name="theposreqdelcountersname"),
    path('themostposdelco', TheMostPostDelCount.as_view(), name="themostposdelconame"),
    path('themostuserreqdelcoo', TheMostUserRequestDeleteCounter.as_view(), name="themostuserreqdelcooname"),
    path('themostuservotposact', TheMostUserVotePositiveActivityCounter.as_view(), name="themostuservotposactname"),
    path('mostuservotenegact', TheMostUserVoteNegativeActivityCounter.as_view(), name="mostuservotenegactname"),
    path('mostuserdelpositact', TheMostUserDeletePositiveActivityCounter.as_view(), name="mostuserdelpositactname"),
    path('mostuserdelnegactcount', TheMostUserDeleteNegativeActivityCounter.as_view(), name="mostuserdelnegactcountname"),
    path('themostpostposivots', TheMostPostPositiveVotes.as_view(), name="themostpostposivotsname"),
    path('themostpostnegatvots', TheMostPostNegativeVotes.as_view(), name="themostpostnegatvotsname"),
    path('thecommunitydegrees', TheCommunityDegreeList.as_view(), name="thecommunitydegreename"),
    path('userdetail/<int:pk>/<slug:slug>/update', UserProfileUpdate.as_view(), name="updateuserajax"),
    path('userdetail/<int:pk>/<slug:slug>/delete', UserDeleteView.as_view(), name="deleteuserajax"),
    path('userdetail/<int:pk>/<slug:slug>/detail', UserDetailShow.as_view(), name="joinervoters_profiles"),
    path('group/<int:pk>/<slug:slug>/showjoinerlist/', JoinGroupShowJoiner.as_view(), name="showjoinerslist"),
    path('group/<int:pk>/<slug:slug>/usershowjoinerlist/', JoinUserShowJoiner.as_view(), name="usershowjoinerslist"),
    path('group/<int:pk>/<slug:slug>/usershowwaiterlist/', JoinUserShowWaiter.as_view(), name="usershowwaiterslist"),
    path('group/<int:pk>/<slug:slug>/showblocklist/', JoinGroupShowBlock.as_view(), name="showblockslist"),
    path('group/<int:pk>/<slug:slug>/showunlockblocklist/', JoinGroupShowUNBlock.as_view(), name="showunlockblockslist"),
    path('group/<int:pk>/<slug:slug>/showwaitlist/', JoinGroupShowWaiting.as_view(), name="showwaitingslist"),
    path('group/list/<username>/', GroupListShow.as_view(), name="grouplist"),
    path('group/posts/<int:pk>/<slug:slug>/update/', CreateGroupPostsUpdateViews.as_view(), name="updategrouppostsajax"),
    path('group/posts/<int:pk>/<slug:slug>/delete/', CreateGroupPostsDeleteView.as_view(), name="deletepostsgroup"),
    path('groupost/<int:pk>/<slug:slug>/create/post', CreateGroupPosts.as_view(), name="creategrouppostsajax"),
    path('group/<int:pk>/<slug:slug>/list/', GroupDetailShow.as_view(), name="groupshowlist"),
    path('group/<int:pk>/<slug:slug>/delete/', CreateGroupDeleteView.as_view(), name="deletegroup"),
    path('group/<int:pk>/<slug:slug>/exportuserlist/', ExportUserList.as_view(), name="exportuserlist"),
    path('group/<int:pk>/<slug:slug>/deletvoterlist/', DeletePostVoterList.as_view(), name="deletvoterlist"),
    path('group/<int:pk>/messageboxlist/', MessageShowLists.as_view(), name="messagelistanddel"),
    path('group/create/now', CreateGroupViews.as_view(), name="creategroupajax"),
    path('relationprocess/<int:pk>/<slug:slug>/', JoinerRelationsProcess.as_view(), name="relateprocess"),
    path('relationpollprocess/<int:pk>/<slug:slug>/', ExportUserVoterProcess.as_view(), name="relatevoterprocess"),
    path('postvoteprocrelate/<int:pk>/<slug:slug>/', GroupPostVoterProcess.as_view(), name="postvoterproc"),
    path('grouppostlistpage/<int:pk>/<slug:slug>/', GroupsPostLister.as_view(), name="postslistpage"),
    path('deletevoteprocess/<int:pk>/<slug:slug>/', DeletePostVoterProcess.as_view(), name="deletevoteprocess"),
    path('requestdeleteviadelegate/<int:pk>/<slug:slug>/', ExportUserProcess.as_view(), name="requestdeleteviadelegate"),
    path('group/<int:pk>/<slug:slug>/update/', CreateGroupUpdateViews.as_view(), name="updategroupajax"),
    path('group/postsannounce/<int:pk>/<slug:slug>/update/', AnnouncementsPostsUpdateViews.as_view(), name="updategrouppostsajaxannounce"),
    path('group/postsannounce/<int:pk>/<slug:slug>/delete/', AnnouncementsPostsDeleteView.as_view(), name="deletepostsgroupannounce"),
    path('groupostannounce/<int:pk>/<slug:slug>/create/post', AnnouncementsPosts.as_view(), name="creategrouppostsajaxannounce"),
    path('deletepostcreater/<int:pk>/<slug:slug>/', DeletePostviaVotesView.as_view(), name="deletecreateposter"),
    path('postsdtl/<username>/<int:pk>/<slug:slug>/detail/', DetailPosts.as_view(), name="postscontent"),
    path('comment/<int:pk>/<slug:slug>/edit/', EditCommentPosts.as_view(), name="commentpostscontentedit"),
    path('comment/<int:pk>/<slug:slug>/delete/', CommentDeletes.as_view(), name="commentdeleteproc"),
    path('announcepostsdtl/<username>/<int:pk>/<slug:slug>/detail/', AnnounceDetailPosts.as_view(), name="announcepostscontent"),
    path('', PostsListUser.as_view(), name="mainpageshow"),
    path('<grouplabel>/relatedgroup/', GroupLabelList.as_view(), name="grouplabellist"),
    path('<postlabel>/relatedposts/', PostLabelList.as_view(), name="postlabellist"),
    path('<groupname>/<postlabel>/onlygrouplabel', OwnGrPostLabelList.as_view(), name="owngrpostlabellist"),
    re_path(r'^accounts/', include('allauth.urls')),
    re_path(r'^search/', include('haystack.urls')),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
