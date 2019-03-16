from PIL import Image
import os
import imghdr

class PhotoProcess(object):
	
	def __init__(self, photourl, x, y, width, height):
		self.photourl = photourl
		self.photo = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.photourl[1::])
		self.x = x
		self.y = y
		self.width = width
		self.height = height
		
	def getnewphoto(self):
		img = Image.open(self.photo)
		area = (self.x, self.y, self.width+self.x, self.height+self.y)
		cropped_img = img.crop((area))
		resized_image = cropped_img.resize((200, 200), Image.ANTIALIAS)
		return resized_image

class ControlPhotoExt(object):
	def __init__(self, arg):
		self.arg = arg

	def imageorfile(self):
		imagecont = imghdr.what(self.arg)
		if imagecont == 'jpg' or imagecont == 'jpeg' or imagecont == 'png' :
			return True
		else:
			return False

	def mpfourfile(self):
		extension = os.path.splitext(self.arg.name)[-1]
		if extension == '.mp4':
			return True
		else:
			return False
