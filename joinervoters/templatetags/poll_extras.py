from django import template
from joinervoters.models import ForGroupPostPhotos, ExportUser, DeletePostviaVotes, GroupJoin, BeDelegate, CreateGroup, User, EnfafiloComment, ProfilePhoto

register = template.Library()

@register.simple_tag
def photo_show_list(ids):
	ids = int(ids)
	review = photoslist = ForGroupPostPhotos.objects.filter(whichgroup=ids)
	rwcount = review.count()
	phurllist = []
	if rwcount > 0:
		for phrw in review:
			if phrw.multifiles:
				getph = phrw.multifiles.url
				phurllist.append(getph)
		return phurllist
	else:
		return ["false"]

@register.simple_tag
def my_tag(ids):
	ids = int(ids)
	cntreview = ExportUser.objects.filter(pk=ids)
	if cntreview.exists():
		review = ExportUser.objects.get(pk=ids)
		countget = review.votes.count()
		if countget:
			return countget
		else:
			countget = 0
			return countget
	else:
		countget = 0
		return countget


@register.simple_tag
def my_post_tag(ids):
	ids = int(ids)
	review = DeletePostviaVotes.objects.get(pk=ids)
	countget = review.votes.count()
	if countget:
		return countget
	else:
		countget = 0
		return countget

@register.simple_tag
def joinercontroler(ids):
	ids = int(ids)
	review = GroupJoin.objects.filter(pk=ids).exists()
	if review:
		return True
	else:
		return False

@register.simple_tag
def delegatecontroller(ids):
	ids = int(ids)
	review = BeDelegate.objects.filter(pk=ids).exists()
	if review:
		return True
	else:
		return False

@register.simple_tag
def userexported(ids):
	ids = int(ids)
	review = ExportUser.objects.filter(pk=ids).exists()
	if review:
		return True
	else:
		return False

@register.simple_tag
def postexported(ids):
	ids = int(ids)
	review = DeletePostviaVotes.objects.filter(pk=ids).exists()
	if review:
		return True
	else:
		return False

@register.simple_tag
def postexportedgetid(ids):
	ids = int(ids)
	review = DeletePostviaVotes.objects.filter(pk=ids)
	if review.exists():
		for i in review:
			getpk = i.pk
		return getpk
	else:
		return False

@register.simple_tag
def userexportedgetid(ids):
	ids = int(ids)
	review = ExportUser.objects.filter(pk=ids)
	if review.exists():
		for i in review:
			getpk = i.pk
		return getpk
	else:
		return False

@register.simple_tag
def delegatecnt(requestoruserpk, exportgrouppk):
	requestoruserpk = int(requestoruserpk)
	exportgrouppk =int(exportgrouppk)
	userdetail = User.objects.get(pk = requestoruserpk)
	groupdetail = CreateGroup.objects.get(pk = exportgrouppk)
	cntjoindetail = GroupJoin.objects.filter(togroup = groupdetail, fromuser = userdetail)
	if cntjoindetail.exists():
		joindetail = GroupJoin.objects.get(togroup = groupdetail, fromuser = userdetail)
	else:
		joindetail = None
	detaildelegate = BeDelegate.objects.filter(involvolvedgroup = groupdetail.id, delegateuser = requestoruserpk, joineruser = joindetail)
	if detaildelegate.exists():
		return True
	else:
		return False
	
'''
@register.simple_tag
def commentadding(objectid, contenttype, parentid):
	objid = int(objectid)
	cnttype = int(contenttype)
	prntid = int(parentid)
	review = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
	if review.exists():
		#for i in review:
			#karsi = i.id
			#print(f"{karsi} kendi asıl nosunun karsiligi {prntid} içeriği {i.commentcontent}")
		return review
	else:
		return False
'''
'''
@register.simple_tag
def commentadding(objectid, contenttype, parentid):
	listreturn = []
	objid = int(objectid)
	cnttype = int(contenttype)
	prntid = int(parentid)
	review = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
	if review.exists():
		for dtg in review:
			fsrtid = dtg.id
			fsrtslug = dtg.slug
			writer = dtg.user.username
			contentget = dtg.commentcontent
			crtdt = dtg.updateposts
		listadding = [{'id':fsrtid, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
		listreturn.append(listadding)
		prntid = fsrtid
		while True:
			scncnt = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
			if scncnt.exists():
				datascnt = scncnt.count()
				if datascnt > 1:
					myvalue = 0
					while myvalue < datascnt:
						datacounter = scncnt[myvalue]
						fsrtid = datacounter.id
						fsrtslug = datacounter.slug
						writer = datacounter.user.username
						contentget = datacounter.commentcontent
						crtdt = datacounter.updateposts
						listadding = [{'id':fsrtid, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
						listreturn.append(listadding)
						prntid = fsrtid
						myvalue += 1
				else:
					for dtlcnt in scncnt:
						fsrtid = dtlcnt.id
						fsrtslug = dtlcnt.slug
						writer = dtlcnt.user.username
						contentget = dtlcnt.commentcontent
						crtdt = dtlcnt.updateposts
					listadding = [{'id':fsrtid, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
					listreturn.append(listadding)
					prntid = fsrtid
					continue
			else:
				break
		return listreturn
	else:
		return False
'''
@register.simple_tag
def commentadding(objectid, contenttype, parentid):
	listreturn = []
	objid = int(objectid)
	cnttype = int(contenttype)
	prntid = int(parentid)
	review = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
	if review.exists():
		for dtg in review:
			fsrtid = dtg.id
			fsrtslug = dtg.slug
			writer = dtg.user.username
			contentget = dtg.commentcontent
			crtdt = dtg.updateposts
			whos = dtg.whoto
		listadding = [{'id':fsrtid, 'whoto':whos, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
		listreturn.append(listadding)
		prntid = fsrtid
		while True:
			scncnt = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
			if scncnt.exists():
				datascnt = scncnt.count()
				if datascnt > 1:
					myvalue = 0
					while myvalue < datascnt:
						datacounter = scncnt[myvalue]
						fsrtid = datacounter.id
						fsrtslug = datacounter.slug
						writer = datacounter.user.username
						contentget = datacounter.commentcontent
						crtdt = datacounter.updateposts
						whost = datacounter.whoto
						listadding = [{'id':fsrtid, 'whoto':whost, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
						listreturn.append(listadding)
						prntid = fsrtid
						twoscncnt = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, secondparent = None, thirdparent = None, content_type = cnttype)
						for cs in twoscncnt:
							for lstg in listadding:
								if lstg['id'] != cs.id and cs.id != prntid:
									fsrtid = cs.id
									fsrtslug = cs.slug
									writer = cs.user.username
									contentget = cs.commentcontent
									crtdt = cs.updateposts
									whoss = cs.whoto
									listadding = [{'id':fsrtid, 'whoto':whoss, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
									listreturn.append(listadding)
									#three cnt yi recursive fonksiyon yapabilirsin
									mostnewdata = fsrtid
									while True:
										threecnt = EnfafiloComment.objects.filter(object_id = objid, parent = mostnewdata, secondparent = None, thirdparent = None, content_type = cnttype)
										if threecnt.exists() and threecnt.count() > 1:
											lastcounter = 0
											secondchanger = 0
											while lastcounter < threecnt.count():
												getdatanewer = threecnt[lastcounter]
												if getdatanewer.id != mostnewdata and getdatanewer.id != fsrtid:
													fsrtid = getdatanewer.id
													fsrtslug = thi.slug
													writer = getdatanewer.user.username
													contentget = getdatanewer.commentcontent
													crtdt = getdatanewer.updateposts
													whosz = getdatanewer.whoto
													listadding = [{'id':fsrtid, 'whoto':whosz, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
													listreturn.append(listadding)
													#mostnewdata = fsrtid
													lastcounter += 1
													continue
												else:
													lastcounter += 1
													continue
										elif threecnt.exists() and threecnt.count() == 1:
											for thi in threecnt:
												#if thi.id != mostnewdata and thi.id != lstg['id']:
												if thi.id != mostnewdata:
													fsrtid = thi.id
													fsrtslug = thi.slug
													writer = thi.user.username
													contentget = thi.commentcontent
													crtdt = thi.updateposts
													whosh = thi.whoto
													listadding = [{'id':fsrtid, 'whoto':whosh, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
													listreturn.append(listadding)
													mostnewdata = fsrtid
											continue
										else:
											break
									#recursive hatırlatması
						myvalue += 1
				else:
					for dtlcnt in scncnt:
						fsrtid = dtlcnt.id
						fsrtslug = dtlcnt.slug
						writer = dtlcnt.user.username
						contentget = dtlcnt.commentcontent
						crtdt = dtlcnt.updateposts
						whosb = dtlcnt.whoto
					listadding = [{'id':fsrtid, 'whoto':whosb, 'slug':fsrtslug, 'writer':writer, 'contentget':contentget, 'crtdt':crtdt}]
					listreturn.append(listadding)
					prntid = fsrtid
					continue
			else:
				break
		return listreturn
	else:
		return False



@register.simple_tag
def shcont(objectid, contenttype, parentid):
	objid = int(objectid)
	cnttype = int(contenttype)
	prntid = int(parentid)
	review = EnfafiloComment.objects.filter(object_id = objid, parent = prntid, content_type = cnttype)
	if review.exists():
		return True
	else:
		return False

@register.simple_tag
def getphotolink(usernameget):
	user = User.objects.get(username=usernameget)
	photoavatar = ProfilePhoto.objects.filter(user=user.id)
	if photoavatar.exists():
		for gtph in photoavatar:
			myphoto = gtph.bigphoto.url
	else:
		myphoto = '/media/defaultimages/1asuk2018-05-15-203455.jpg'
	return myphoto

@register.simple_tag
def joinstatusshow(usernameget, groupidget):
	groupidget = int(groupidget)
	cntjoinst = GroupJoin.objects.filter(togroup=groupidget, fromuser=usernameget)
	if cntjoinst.exists():
		getcntjoinst = GroupJoin.objects.get(togroup=groupidget, fromuser=usernameget)
		jnsts = getcntjoinst
		return jnsts
	else:
		jnsts = "Not Joiner"
		return jnsts
