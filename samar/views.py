#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.conf import settings
import os, codecs, json, logging
from django.http import JsonResponse
from random import randint, shuffle
from preferences import *

logger = logging.getLogger('django')
latest_id = 1

class Exp:
    def __init__(self, name):
        self.name = name
        self.cond_list = []

class Cond:
    def __init__(self, item, cond):
        self.item = item
        self.cond = cond
        self.cmd_list = []

def get_practice_list():
    filename = os.path.join(settings.BASE_DIR, 'samar/input/0item.dms')
    practice_list = []
    with codecs.open(filename, mode='r', encoding='utf-8') as file:
        for linen in file:
            line = linen[:-1]
            if len(line) == 0:
                pass
            elif line[0] == '#':
                practice_list.append(Cond(None, None))
            else:
                practice_list[-1].cmd_list.append(line)
    return practice_list

def get_exp_list(item_number):
    filename = os.path.join(settings.BASE_DIR, 'samar/input/' + str(item_number) + 'item.dms')
    exp_list = []
    exp_name = None
    with codecs.open(filename, mode='r', encoding='utf-8') as file:
        for linen in file:
            line = linen[:-1]
            if len(line) == 0:
                pass
            elif line[0] == '#':
                cond = line[2:].split()
                assert len(cond) == 3
                if cond[0] != exp_name:
                    exp_list.append(Exp(cond[0]))
                    exp_name = cond[0]
                exp_list[-1].cond_list.append(Cond(cond[1], cond[2]))
            else:
                exp_list[-1].cond_list[-1].cmd_list.append(line)
    return exp_list

def index(request):
    global logger
    practice_list = get_practice_list()
    practice_json_list = []
    for cond in practice_list:
        practice_json_list.append({'cmd_list': cond.cmd_list})
    exp_list = get_exp_list((latest_id-1) % NO_OF_LISTS + 1)
    exp_json_list = []
    for exp in exp_list:
        cond_json_list = []
        for cond in exp.cond_list:
            cond_json_list.append({'item': cond.item, 'cond': cond.cond, 'cmd_list': cond.cmd_list})
        shuffle(cond_json_list)
        exp_json_list.append({'exp_name': exp.name, 'cond_list': cond_json_list})
    return render(request, 'samar/index.html', {
        'practice_list': json.dumps(practice_json_list),
        'exp_list': json.dumps(exp_json_list),
        'welcome': WELCOME,
        'instructs': json.dumps(INSTRUCTS),
        'practice': PRACTICE,
        'cont': CONT,
        'start': START,
        'stop': STOP,
        'ready': READY,
        'end': END,
        'break': BREAK,
        'break_intvl': BREAK_INTVL,
        'break_start': BREAK_START,
        'break_end': BREAK_END,
        'style': json.dumps(STYLE)
    })

# TODO: remove csrf exempt. It is only a workaround and is insecure.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def upload(request):
    folder = request.META['HTTP_FOLDER']
    filename = request.META['HTTP_FILENAME']
    participant_id = request.META['HTTP_ID']
    filename = os.path.join(settings.BASE_DIR, 'samar/output/' + participant_id + '/' + folder + '/' + filename + '.ogg')
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