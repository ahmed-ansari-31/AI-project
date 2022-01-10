# -*- coding: utf-8 -*-
"""
Created on Fri Oct  1 16:18:21 2021

@author: ashba
"""

import os
import csv
import pdb
from flask_cors.core import serialize_option
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from rasa_nlu.model import Interpreter
import json
from datetime import date

import sys

mpath = '/var/www/FlaskApp/aibot/'
sys.path.append(mpath)


# app = Flask(__name__, static_folder="build/static", template_folder="build")
app = Flask(__name__)
CORS(app)


# interpreter = Interpreter.load()
modelpath = "/var/www/FlaskApp/aibot/models/current/intentClassifier"
modelpath = "/var/www/FlaskApp/aibot/models/current/raja"
modelpath = "/var/www/FlaskApp/aibot/models/current/merged20to22sept"
modelpath = "/var/www/FlaskApp/aibot/models/current/merged20to22sept_lowercase"
modelpath = "/home/ubuntu/media/aibot/intent-classification-rasa-nlu/models/current/intent_export_2021-09-27"
modelpath = "/home/ubuntu/media/aibot/intent-classification-rasa-nlu/models/current/intent_export_2021-09-29_downsampled"
print("\n\n\n\nLoading model from ", modelpath)

interpreter = Interpreter.load(modelpath)
print("\n\n\n\nSuccesfully loaded model from ", modelpath)
#############################################################################


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/writelog', methods=['POST'])
def writelog():
    try:
        json_data = request.get_json()
        text = json_data["text"]
        intent = json_data["intent"]
        condifidence = json_data["condifidence"]
        correctlabel = json_data["correctlabel"]

#       = json_data["step"]
    except:
    	msg = {'successful': False}
        return jsonify(msg)

    todate = today.strftime("%d_%m_%Y")
    if not os.path.exists(os.path.join(mpath, 'logs')):
       os.mkdir(os.path.join(mpath, 'logs'))
    with open(f'{mpath}logs/inference_{todate}.csv', 'a') as f:
        writer = csv.writer(f)
        writer.writerow([text, intent, condifidence, correctlabel])
    msg = {'successful': True}
    return jsonify(msg)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        json_data = request.get_json()
        text = json_data["text"]



    except:
         msg = {'message': "field is missing",
               'successful': False}
         return jsonify(msg)
    o = interpreter.parse(text)
    if text.lower() in ["why not", "whynot", "why not yes"]:
        o['intent']['name'] = 'positive'
    # EDITED
    if o['intent']['name'] == 'abuse' or o['intent']['name'] == 'recording':
        o['intent']['name'] = 'negative'
    # EDITED
    print("\n", "-----      ", text, "     -----")
    print(" ", "*"*40)
#    print(o)
# ['intent', 'entities', 'intent_ranking', 'text']
    for intent in o['intent_ranking']:
        print(intent['name'], " "*(20-len(intent['name'])),
              intent['confidence'])
    print(" ", "*"*30, "\n")
    today = date.today()
    todate = today.strftime("%d_%m_%Y")
    if not os.path.exists(os.path.join(mpath, 'logs')):
       os.mkdir(os.path.join(mpath, 'logs'))
    with open(f'{mpath}logs/inference_{todate}.csv', 'a') as f:
        writer = csv.writer(f)
        writer.writerow([text, o['intent']['name']])
    try:
        msg = {'message':  o['intent']['name'], 'confidence': o['intent']['confidence'], 'text':text,
               'successful': True}
    except:
        msg = {'message':  o['intent']['name'], 'text':text,
               'successful': True}
    return jsonify(msg)



# # * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=False)
#     from waitress import serve
#     serve(app, host="0.0.0.0", port=7000)
