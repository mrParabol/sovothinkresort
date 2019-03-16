from celery import shared_task
from joinervoters.models import UserDeleteNegativeActivityCounter, UserDeletePositiveActivityCounter, PostPositiveVotes, PostNegativeVotes, MessageBoxDef, PostCounter, PostRequestDeleteCounter, PostDelCount, UserRequestDeleteCounter, UserVotePositiveActivityCounter, UserVoteNegativeActivityCounter, Announcements, GroupDegree, BeDelegate, DeletePostviaVotes, ExportUser, User, CreateGroup, GroupPostses, GroupJoin, EnfafiloComment, ProfilePhoto, BackPhoto


@shared_task
def second_group_have_president_user(grouppresident, winner_message_infotmations, protect_message_informations, loser_message_informations):
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
		firstgroupget = CreateGroup.objects.get(pk = fasd)
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
		firstgroupget = CreateGroup.objects.get(pk = fasd)
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


@shared_task
def second_group_have_president_delete(grouppresident, winner_message_infotmations, protect_message_informations, loser_message_informations):
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
		firstgroupget = CreateGroup.objects.get(pk = fasd)
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
		firstgroupget = CreateGroup.objects.get(pk = fasd)
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