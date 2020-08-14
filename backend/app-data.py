from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import uuid
import os
import json

import csv
import datetime as dt

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)


class Schedule(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('from', type=str)
        self.parser.add_argument('to', type=str)
        self.parser.add_argument('embarkDate', type=str)
        self.names = ['lumba-lumba lari', 'pesut riang',
                      'tuna sakti', 'kuda laut palala',
                      'kereta nyai', 'raja ombak']

    def get(self):
        args = self.parser.parse_args()
        print('args:', args)
        frm = args['from']
        to = args['to']
        date = args['embarkDate']
        res = []
        l = len(self.names)

        # print(uuid4())

        for i in range(20):
            #print(i % l)
            sch = dict({"id": i % l,
                        "uuid": str(uuid.uuid4()).replace('-', ''),
                        "from": frm,
                        "to": to,
                        "date":  date,
                        "time": str(dt.time(i)),
                        "name": self.names[int(i % l)],
                        "description": "ac, toilet",
                        "avail": 10,
                        "fare": 40000})
            res.append(sch)
        # print(res)
        return res


api.add_resource(Schedule, '/schedule')


class Ports(Resource):
    def __init__(self):

        with open('data/pelabuhan.csv') as f:
            reader = csv.reader(f, delimiter=',')
            ports = [row[1] + '/' + row[2]
                     for k, row in enumerate(reader) if k > 0]
        self.ports = ports

    def get(self):

        return self.ports


api.add_resource(Ports, '/ports')


class Reservation(Resource):
    def __init__(self):
        if not os.path.exists('./reservation'):
            os.mkdir('./reservation')

    def post(self):
        json_data = json.loads(request.get_json(force=True))

        #print(type(json_data), json_data)
        uuid = json_data['uuid']

        with open('./reservation/' + uuid, 'w') as f:
            json.dump(json_data, f)
        return json_data, 200


api.add_resource(Reservation, '/reservation')


if __name__ == '__main__':
    app.run(debug=True)
