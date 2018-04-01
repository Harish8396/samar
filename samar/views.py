from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.conf import settings
import os, codecs, json, logging
from django.http import JsonResponse

logger = logging.getLogger('django')

def get_question_list():
    filename = os.path.join(settings.BASE_DIR, 'samar/data/1item.dms')
    question_list = []
    with codecs.open(filename, mode='r', encoding='utf-8') as file:
        for line in file:
            if len(line) == 1:
                question_list.append('')
            else:
                question_list[-1] = question_list[-1] + line
    return json.dumps({'question_json_list': question_list})

def index(request):
    question_list = get_question_list()
    logger.debug(question_list)
    return render(request, 'samar/index.html', {'question_list': question_list})

# TODO: remove csrf exempt. It is only a workaround and is insecure.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def upload(request):
    with open('sample.ogg', 'wb') as file:
        file.write(request.body)
    return JsonResponse({'message': 'From django to unchained.'})