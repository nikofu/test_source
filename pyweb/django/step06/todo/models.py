from django.utils import dateformat
from django.db import models
from django.forms import ModelForm

STATUS = (
	(1, 'not yet'),
	(2, 'doing'),
	(3, 'done'),
)

TAGS = (
	(1, 'none'),
	(2, 'low'),
	(3, 'middle'),
	(4, 'high'),
)



class Story(models.Model):
	body = models.CharField(max_length = 32)
	end = models.DateTimeField()
	status = models.IntegerField(choices = STATUS)
	tags = models.IntegerField(choices = TAGS)
	other = models.CharField(max_length = 32)

	def __unicode__(self):
		end = dateformat.format(self.end, 'n/d H:i')
		status = self.get_status_display()
		tags = self.get_status_display()
		return '%s ( %s ) [ %s ] ( %s ) %s' % (end, status, self.body, tags, self.other)

	@property
	def sorted_tasks(self):
		return self.task_set.order_by('end')

class Task(models.Model):
	body = models.CharField(max_length = 32)
	end = models.DateTimeField()
	status = models.CharField(max_length = 256)
	story = models.ForeignKey(Story)

	def __unicode__(self):
		end = dateformat.format(self.end, 'n/d H:i')
		return '%s (name %s ) [comments %s ]' % (end, self.body, self.status)
