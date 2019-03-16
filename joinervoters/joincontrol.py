from joinervoters.models import GroupJoin, CreateGroup, User

class JoinControlFuncs(object):
	
	def __init__(self, togrouparg, fromuserarg):
		self.togrouparg = togrouparg
		self.fromuserarg = fromuserarg
		self.joined = "JOINED"
		self.unjoined = "UNJOINED"
		self.sendedrequests = "SENDEDREQUEST"
		self.blocked = "BLOCKED"
		self.unblocked = "UNBLOCKED"
	
	def isjoincont(self):
		joinget = GroupJoin.objects.filter(togroup = self.togrouparg, fromuser = self.fromuserarg)
		if joinget.exists():
			return True
		else:
			return False
	
	def isjoincontorwaiting(self):
		joinget = GroupJoin.objects.get(togroup = self.togrouparg, fromuser = self.fromuserarg)
		if joinget:
			if joinget.joinstatus == self.joined:
				return self.joined
			elif joinget.joinstatus == self.unjoined:
				return self.unjoined
			elif joinget.joinstatus == self.sendedrequests:
				return self.sendedrequests
			elif joinget.joinstatus == self.blocked:
				return self.blocked
			elif joinget.joinstatus == self.unblocked:
				return self.unblocked
			else:
				return "error"
		else:
			return False
	
	def requestjoin(self):
		groupprofilecont = CreateGroup.objects.get(pk = self.togrouparg)
		userarg = User.objects.get(pk = self.fromuserarg)
		openclosecont = groupprofilecont.followacceptcontrol
		if openclosecont == True:
			joinus, created = GroupJoin.objects.get_or_create(togroup = groupprofilecont, fromuser = userarg, joinstatus = self.joined)
			if created:
				return self.joined
		elif openclosecont == False:
			#grubun sahibiyse ifde hata varsa pk olarak eşit mi bakarsın yoksa iidir
			if groupprofilecont == userarg:
				joinus, created = GroupJoin.objects.get_or_create(togroup = groupprofilecont, fromuser = userarg, joinstatus = self.joined)
				if created:
					return self.joined
			else:
				joinus, created = GroupJoin.objects.get_or_create(togroup = groupprofilecont, fromuser = userarg, joinstatus = self.sendedrequests)
				if created:
					return self.sendedrequests
				else:
					acceptjoin = GroupJoin.objects.filter(togroup = self.togrouparg, fromuser = self.fromuserarg)
					if acceptjoin.exists():
						statusacceptjoin = acceptjoin.update(joinstatus = self.joined)
						return self.joined
					else:
						return "error"
		else:
			return False
	
	def reqaccept(self):
		acceptjoin = GroupJoin.objects.filter(togroup = self.togrouparg, fromuser = self.fromuserarg)
		if acceptjoin.exists():
			statusacceptjoin = acceptjoin.update(joinstatus = self.joined)
			return self.joined
		else:
			return "error"
	
	def reqblocked(self):
		blockejoin = GroupJoin.objects.filter(togroup = self.togrouparg, fromuser = self.fromuserarg)
		if blockejoin.exists():
			statusblockejoin = blockejoin.update(joinstatus = self.blocked)
			return self.blocked
		else:
			return "error"
	
	def requnblocked(self):
		unblockejoin = GroupJoin.objects.filter(togroup = self.togrouparg, fromuser = self.fromuserarg)
		if unblockejoin.exists():
			statusunblockejoin = unblockejoin.update(joinstatus = self.unblocked)
			return self.unblocked
		else:
			return "error"
	
	def canceljoin(self):
		groupprofilecont = CreateGroup.objects.get(pk = self.togrouparg)
		userarg = User.objects.get(pk = self.fromuserarg)
		try:
			deletejoin = GroupJoin.objects.get(togroup = groupprofilecont, fromuser = userarg)
			deletejoin.delete()
			return True
		except GroupJoin.DoesNotExist:
			deletejoin = None
			return False
		
	
class ListJoin(object):
	
	def __init__(self, togroupargoruser, statusj):
		self.togroupargoruser = togroupargoruser
		self.statusj = statusj
	
	def waitreqlist(self):
		groupprofilecont = CreateGroup.objects.get(pk = self.togroupargoruser)
		waitsjoin = GroupJoin.objects.filter(togroup = groupprofilecont, joinstatus = self.statusj)
		if waitsjoin.exists():
			return waitsjoin
		else:
			return False

class ShowListJoins(object):
	def __init__(self, togroupargoruser):
		self.togroupargoruser = togroupargoruser
	
	def listshowj(self):
		waitsjoin = GroupJoin.objects.filter(togroup = self.togroupargoruser, joinstatus = "JOINED")
		if waitsjoin.exists():
			return waitsjoin
		else:
			return False

class BlockFuncs(object):
	
	def __init__(self, togrouparg, fromuserarg, statusj):
		self.togrouparg = togrouparg
		self.fromuserarg = fromuserarg
		self.statusj = statusj
	
	def blockorunblockuser(self):
		groupprofilecont = CreateGroup.objects.get(pk = self.togrouparg)
		userarg = User.objects.get(pk = self.fromuserarg)
		try:
			deletejoin = GroupJoin.objects.get(togroup = groupprofilecont, fromuser = userarg)
			deletejoin.update(joinstatus =self.statusj)
			return True
		except GroupJoin.DoesNotExist:
			deletejoin = None
			return False
			
