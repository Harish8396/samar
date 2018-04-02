from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.conf import settings
import os, codecs, json, logging
from django.http import JsonResponse
from random import randint

logger = logging.getLogger('django')
latest_id = 0

def get_question_list():
    item_number = randint(1, 4)
    filename = os.path.join(settings.BASE_DIR, 'samar/input/' + str(item_number) + 'item.dms')
    question_list = []
    with codecs.open(filename, mode='r', encoding='utf-8') as file:
        for line in file:
            if len(line) == 1:
                question_list.append('')
            else:
                question_list[-1] = question_list[-1] + line
    return json.dumps({'question_json_list': question_list})

def index(request):
    global logger
    question_list = get_question_list()
    logger.debug(question_list)
    return render(request, 'samar/index.html', {'question_list': question_list})

# TODO: remove csrf exempt. It is only a workaround and is insecure.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def upload(request):
    question_index = request.META['HTTP_INDEX']
    participant_id = request.META['HTTP_ID']
    filename = os.path.join(settings.BASE_DIR, 'samar/output/' + participant_id + '/' + question_index + '.ogg')
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(filename, 'wb') as file:
        file.write(request.body)
    return JsonResponse({'success': True})

def get_latest(request):
    global latest_id
    return JsonResponse({'success': True, 'id': latest_id})

def set_latest(request):
    global latest_id
    latest_id = int(request.GET.get('id', latest_id)) + 1
    return JsonResponse({'success': True})