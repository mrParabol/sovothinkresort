from joinervoters.models import GroupFirstCount, MessageBoxDef, PostCounter, PostRequestDeleteCounter, PostDelCount, UserRequestDeleteCounter, UserVotePositiveActivityCounter, UserVoteNegativeActivityCounter, Announcements, GroupDegree, BeDelegate, DeletePostviaVotes, ExportUser, User, CreateGroup, GroupPostses, GroupJoin, EnfafiloComment, ProfilePhoto, BackPhoto
from django.db.models import Max, Min, Count, Avg, FloatField, Q
from datetime import datetime
import time
from django.contrib.auth.models import User

def winner_message_infotmations(whgrpget, whusrget):
	winpresident = "You win this group's president"+whgrpget.groupname
	presidentknowlesge, created = MessageBoxDef.objects.get_or_create(user = whusrget, messagechar = winpresident)

def protect_message_informations(whgrpget):
	protectmessage = "You protect your president, concurgulations"+whgrpget.groupname
	protectpresident, protectedv = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = protectmessage)

def loser_message_informations(whgrpget):
	#whgrpget kaybeden grubu get olarak aldım ve bunun kişisine (sahibine) .user deyerek mesaj göndersim.
	losepresidentmessage = "You lose this group's president"+whgrpget.groupname
	losepresident, losecreated = MessageBoxDef.objects.get_or_create(user = whgrpget.user, messagechar = losepresidentmessage)

def group_point_account(groupx, daysay):
	groupfirstget = groupx
	getgroup = CreateGroup.objects.filter(pk = groupx.pk)
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=daysay)
	ordertwohundredget = getgroup.filter(togroupjoin__joinstatus='JOINED').annotate(countjoiner=Count('togroupjoin__joinstatus'))
	joingrpoint = ordertwohundredget.countjoiner*5
	postpoint = PostCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	postpointcount = postpoint.count()*9#+
	postreqdelpoint = PostRequestDeleteCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	postreqdelpointcount = postreqdelpoint.count()*2#-
	postdelcountpoint = PostDelCount.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	postdelcountpointcounted = postdelcountpoint.count()*3#-
	userreqdelpoint = UserRequestDeleteCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	userreqdelpointcounted = userreqdelpoint.count()*3#-
	postdelposvotepoint = UserVotePositiveActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	postdelposvotepointcounted = postdelposvotepoint.count()*1#+
	postdelnegativpoint = UserVoteNegativeActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	postdelnetivpointcounted = postdelnegativpoint.count()*1#-
	userdelvotepospoint = UserDeletePositiveActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	userdelvotepospointcounted = userdelvotepospoint.count()*2#+
	userdelvotnegativ = UserDeleteNegativeActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
	userdelvotnegativcounted = userdelvotnegativ.count()*2#-
	grouptotalaccount = postpointcount+joingrpoint-postreqdelpointcount-postdelcountpointcounted-userreqdelpointcounted+postdelposvotepointcounted-postdelnetivpointcounted+userdelvotepospointcounted-userdelvotnegativcounted
	return grouptotalaccount
	

def second_group_have_president(grouppresident):
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
		firstgroupget = Create.objects.get(pk = fasd)
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
		firstgroupget = Create.objects.get(pk = fasd)
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

def president_selection ():
	forpostgrouppk = CreateGroup.objects.all()
	forpostgroupcount = forpostgrouppk.count()
	sortlistadd = []
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=120)
	firtedtimer = most_now_time - datetime.timedelta(days=150)
	groupcountstar = 0
	if forpostgroupcount > 0:
		while groupcountstar < forpostgroupcount:
			getforpostgrouppk = forpostgrouppk[groupcountstar].pk
			userstartcontrol = CreateGroup.objects.filter(pk=getforpostgrouppk, grouppostcounter__createdate__gt=startdate, togroupjoin__createdates__lte=startdate)
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
			groupgetforuserchange = CreateGroup.objects.filter(pk=getforpostgrouppk)
			if changecreategroupuser == True:
				#burada yeni başkanın *(getusermostpost)şu an aktif sahip olduğu bir grup varsa ordaki sahipliği grup içinden hak edene devir olma işlemini yap
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
							second_group_have_president(oldgroupchangeuser)
							getavailusercont.user = oldgroupchangeuser
							winner_message_infotmations(getavailusercont, oldgroupchangeuser)
							loser_message_informations(getusermostpost)
						elif sortlistcountsd > 1 and getavailusercont == groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
							oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
							second_group_have_president(oldgroupchangeuser)
							getavailusercont.user = oldgroupchangeuser
							winner_message_infotmations(getavailusercont, oldgroupchangeuser)
							loser_message_informations(getusermostpost)
						elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] == getusermostpost.pk:
							oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
							second_group_have_president(oldgroupchangeuser)
							getavailusercont.user = oldgroupchangeuser
							winner_message_infotmations(getavailusercont, oldgroupchangeuser)
							loser_message_informations(getusermostpost)
						elif sortlistcountsd > 1 and getavailusercont != groupgetforuserchange and sortlistadd[0][1] != getusermostpost.pk:
							oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
							second_group_have_president(oldgroupchangeuser)
							getavailusercont.user = oldgroupchangeuser
							winner_message_infotmations(getavailusercont, oldgroupchangeuser)
							loser_message_informations(getusermostpost)
						else:
							if sortlistadd[0][1] == getusermostpost.pk:
								oldgroupchangeuser = User.objects.get(pk = sortlistadd[1][1])
								second_group_have_president(oldgroupchangeuser)
								getavailusercont.user = oldgroupchangeuser
								winner_message_infotmations(getavailusercont, oldgroupchangeuser)
								loser_message_informations(getusermostpost)
							else:
								oldgroupchangeuser = User.objects.get(pk = sortlistadd[0][1])
								second_group_have_president(oldgroupchangeuser)
								getavailusercont.user = oldgroupchangeuser
								winner_message_infotmations(getavailusercont, oldgroupchangeuser)
								loser_message_informations(getusermostpost)
								#######
						sortlistadd.clear()
						availcount += 1
					#ek bitir
					loser_message_informations(forpostgrouppk[groupcountstar])
					newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
					#grup başkanı olan ve başkanlığı kaybolan bilgilendirilir bu kos blogunu yaz
					presidentnewchange = 'president change'
					winner_message_infotmations(forpostgrouppk[groupcountstar], getusermostpost)
					return presidentnewchange
				else:
					loser_message_informations(forpostgrouppk[groupcountstar])
					newgrouppresident = groupgetforuserchange.update(user = getusermostpost, updates = datetime.datetime.now())
					#grup başkanı olan ve başkanlığı kaybolan bilgilendirilir bu kos blogunu yaz
					presidentnewchange = 'president change'
					winner_message_infotmations(forpostgrouppk[groupcountstar], getusermostpost)
					return presidentnewchange
			else:
				newgrouppresident = groupgetforuserchange.update(updates = datetime.datetime.now())
				notpresidentchange = 'president not change'
				#grup başkanı başkanlığını korouduğu bilgisi verilir
				protect_message_informations(forpostgrouppk[groupcountstar])
				return notpresidentchange
		groupcountstar += 1
	else:
		return "group not available"

def group_leadership ():
	fullgroupget = CreateGroup.objects.all()
	groupcount = fullgroupget.count()
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=180)
	sortlistadd = []
	ordertwohundredget = CreateGroup.objects.filter(togroupjoin__joinstatus='JOINED').annotate(countjoiner=Count('togroupjoin__joinstatus')).filter(countjoiner__gt=500).order_by('countjoiner')[:200]
	if fullgroupget.exists() and ordertwohundredget.exists():
		say = 0
		while say < 200:
			try:
				groupfirstget = ordertwohundredget[say]
				postpoint = PostCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				postpointcount = postpoint.count()*9#+
				postreqdelpoint = PostRequestDeleteCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				postreqdelpointcount = postreqdelpoint.count()*2#-
				postdelcountpoint = PostDelCount.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				postdelcountpointcounted = postdelcountpoint.count()*3#-
				userreqdelpoint = UserRequestDeleteCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				userreqdelpointcounted = userreqdelpoint.count()*3#-
				postdelposvotepoint = UserVotePositiveActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				postdelposvotepointcounted = postdelposvotepoint.count()*1#+
				postdelnegativpoint = UserVoteNegativeActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				postdelnetivpointcounted = postdelnegativpoint.count()*1#-
				userdelvotepospoint = UserDeletePositiveActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				userdelvotepospointcounted = userdelvotepospoint.count()*2#+
				userdelvotnegativ = UserDeleteNegativeActivityCounter.objects.filter(whichgroup=groupfirstget, createdate__gt=startdate)
				userdelvotnegativcounted = userdelvotnegativ.count()*2#-
				grouptotalaccount = postpointcount-postreqdelpointcount-postdelcountpointcounted-userreqdelpointcounted+postdelposvotepointcounted-postdelnetivpointcounted+userdelvotepospointcounted-userdelvotnegativcounted
				tuplegroupadd = (grouptotalaccount, groupfirstget.pk)
				sortlistadd.append(tuplegroupadd)
			except:
				break
			say += 1
		sortlistadd.sort()
		listcountadd = len(sortlistadd)
		plusser = 0
		totalcreatecounter = Create.objects.all().count()
		while plusser < listcountadd:
			getgrouppointandid = sortlistadd[plusser]
			pkgroupgetint = getgrouppointandid[1]
			pointgroupint = getgrouppointandid[0]
			controldegree = GroupDegree.objects.all()
			controldegree.delete()
			grouppkgetforex = CreateGroup.objects.filter(pk=pkgroupgetint)
			if grouppkgetforex.exists():
				getpkandselfgroup = CreateGroup.objects.get(pk=pkgroupgetint)
				if plusser == 0:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "LEADERGROUP", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
					contcountfirst = GroupFirstCount.objects.filter(groupget = getpkandselfgroup.pk)
					if contcountfirst.exists():
						for cou in contcountfirst:
							pointgetdeg = cou.counter
						freshpointgetdeg = pointgetdeg+1
						contcountfirst.update(counter = freshpointgetdeg, createdates = datetime.datetime.now())
					else:
						grfrtcount = GroupFirstCount(groupget = getpkandselfgroup, counter = 1, createdates = datetime.datetime.now())
						grfrtcount.save()
				elif plusser == 1:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "SECONDGROUP", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
				elif plusser == 2:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "THIRDGROUP", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
				elif plusser == 3:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "FOURTHGROUP", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
				elif plusser == 4:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "FIFTHGROUP", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
				else:
					creategroupdegrees = GroupDegree(groupget = getpkandselfgroup, grouptotalpoint = pointgroupint, groupstatus = "NORMAL", indexgroup = plusser, createdates = datetime.datetime.now())
					creategroupdegrees.save()
			else:
				plusser += 1
				continue
			plusser += 1
	else:
		return 'Group Data Not Available'

def delete_user_underposts():
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=76)
	getuserfullposts = User.objects.filter(postsgrouponeuser__createdates__gt=startdate).annotate(countposts = Count('postsgrouponeuser')).filter(countposts__lte=25)
	getuserfullposts.delete()

def delete_last_login_user():
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=180)
	lastlog = User.objects.filter(last_login__lte=startdate)
	lastlog.delete()
	#bu fonksiyonu settings cron a eklemeyi unutma

def delege_select():
	most_now_time = datetime.datetime.now()
	startdate = most_now_time - datetime.timedelta(days=150)
	groupgetjoiners = CreateGroup.objects.filter(togroupjoin__joinstatus='JOINED').annotate(countjoiner=Count('togroupjoin__joinstatus')).filter(countjoiner__gt=500)
	countgroupgetjoiners = groupgetjoiners.count()
	levelcount = 0
	sortlistadd = []
	while levelcount < countgroupgetjoiners:
		firstgroupget = groupgetjoiners[levelcount]
		joinersget = GroupJoin.objects.filter(togroup=firstgroupget, joinstatus='JOINED')
		countjoinersget = joinersget.count()
		joinlevel = 0
		while joinlevel < countjoinersget:
			firstuserget = joinersget[joinlevel].fromuser
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
			sortlistadd.append(tupleuserdegree)
			joinlevel += 1
		sortlistadd.sort()
		sortlistcountsd = len(sortlistadd)
		sorcounter = 0
		while sorcounter < sortlistcountsd:
			try:
				getfirstdelegater = sortlistadd[sorcounter][1]
				if getfirstdelegater == firstgroupget.user.pk:
					sorcounter += 1
					continue
				else:
					if sorcounter == 0:
						usrget = User.objects.get(pk = getfirstdelegater)
						joiuserget = joinersget.filter(fromuser = usrget.pk)
						for jni in joiuserget:
							gda = jni.pk
						delegcont = BeDelegate.objects.filter(involvolvedgroup = firstgroupget, userstatusingroup = 'CHIEFADVISOR')
						if delegcont.exists():
							delegcont.update(joineruser = gda, delegateuser = usrget)
						else:
							createdelegf = BeDelegate(involvolvedgroup = firstgroupget, joineruser = gda, delegateuser = usrget, userstatusingroup = 'CHIEFADVISOR')
							createdelegf.save()
					elif sorcounter == 1:
						usrget = User.objects.get(pk = getfirstdelegater)
						joiuserget = joinersget.filter(fromuser = usrget.pk)
						for jni in joiuserget:
							gda = jni.pk
						delegcont = BeDelegate.objects.filter(involvolvedgroup = firstgroupget, userstatusingroup = 'ADVISOR')
						if delegcont.exists():
							delegcont.update(joineruser = gda, delegateuser = usrget)
						else:
							createdelegf = BeDelegate(involvolvedgroup = firstgroupget, joineruser = gda, delegateuser = usrget, userstatusingroup = 'ADVISOR')
							createdelegf.save()
					elif sorcounter == 2:
						usrget = User.objects.get(pk = getfirstdelegater)
						joiuserget = joinersget.filter(fromuser = usrget.pk)
						for jni in joiuserget:
							gda = jni.pk
						delegcont = BeDelegate.objects.filter(involvolvedgroup = firstgroupget, userstatusingroup = 'ASISTANTADVISOR')
						if delegcont.exists():
							delegcont.update(joineruser = gda, delegateuser = usrget)
						else:
							createdelegf = BeDelegate(involvolvedgroup = firstgroupget, joineruser = gda, delegateuser = usrget, userstatusingroup = 'ASISTANTADVISOR')
							createdelegf.save()
					elif sorcounter == 3:
						usrget = User.objects.get(pk = getfirstdelegater)
						joiuserget = joinersget.filter(fromuser = usrget.pk)
						for jni in joiuserget:
							gda = jni.pk
						delegcont = BeDelegate.objects.filter(involvolvedgroup = firstgroupget, userstatusingroup = 'CHIEFAUTHOR')
						if delegcont.exists():
							delegcont.update(joineruser = gda, delegateuser = usrget)
						else:
							createdelegf = BeDelegate(involvolvedgroup = firstgroupget, joineruser = gda, delegateuser = usrget, userstatusingroup = 'CHIEFAUTHOR')
							createdelegf.save()
					elif sorcounter == 4:
						usrget = User.objects.get(pk = getfirstdelegater)
						joiuserget = joinersget.filter(fromuser = usrget.pk)
						for jni in joiuserget:
							gda = jni.pk
						delegcont = BeDelegate.objects.filter(involvolvedgroup = firstgroupget, userstatusingroup = 'CHIEFREADER')
						if delegcont.exists():
							delegcont.update(joineruser = gda, delegateuser = usrget)
						else:
							createdelegf = BeDelegate(involvolvedgroup = firstgroupget, joineruser = gda, delegateuser = usrget, userstatusingroup = 'CHIEFREADER')
							createdelegf.save()
					else:
						break
			except:
				break
			sorcounter += 1
		sortlistadd.clear()
		levelcount += 1
	
	

