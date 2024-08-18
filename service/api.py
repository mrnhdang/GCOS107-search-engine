from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from processor import SearchEngine
from webcrawler import WebCrawler
from json import dumps
import pymongo

# Connect to mongodb
mongodb = pymongo.MongoClient("mongodb+srv://dang:Dang%401234@productdb.ajc08j8.mongodb.net/?retryWrites=true&w=majority&appName=productDB")
database = mongodb["productDB"]
web_collection = database["web"]


app = Flask(__name__)
api = Api(app)

# Sample documents (replace with your own document corpus)
documents = [
    'Xử lý ngôn ngữ tự nhiên là một nhánh quan trọng của trí tuệ nhân tạo.',
    'Khai phá dữ liệu là quá trình tìm ra các mẫu trong các bộ dữ liệu lớn.',
    'Truy hồi thông tin là hoạt động thu thập các nguồn thông tin liên quan đến một thông tin cần tìm kiếm.'
]


@app.route('/web/add', methods=['POST'])
def add():
        url = request.json.get('url')
        if not url:
            return jsonify({'error': 'Query is missing'})
        WebCrawler.insert(url, web_collection)
        return make_response("success", 201)


@app.route('/', methods=['GET'])
def search():
        query = request.json.get('query')
        if not query:
            return jsonify({'error': 'Query is missing'})
        
        results = SearchEngine.search(query, web_collection)
        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
