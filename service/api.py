from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from processor import SearchEngine
from webcrawler import WebCrawler
from json import dumps
from flask_cors import CORS
import pymongo

# Connect to mongodb
mongodb = pymongo.MongoClient("mongodb+srv://dang:Dang%401234@productdb.ajc08j8.mongodb.net/?retryWrites=true&w=majority&appName=productDB")
database = mongodb["productDB"]
web_collection = database["web"]


app = Flask(__name__)
api = Api(app)
CORS(app)


@app.route('/web/add', methods=['POST'])
def add():
        url = request.json
        if not url:
            return jsonify({'error': 'Url is missing'})
        try:
            WebCrawler.insert(url, web_collection)
        except Exception as e:
            return make_response(e, 400)

        return make_response("success", 201)


@app.route('/', methods=['GET'])
def search():
        query = request.args.get('query', default='', type=str)
        if not query:
            return jsonify({'error': 'Query is missing'})
        
        results = SearchEngine.search(query, web_collection)
        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
