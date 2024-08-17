from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from processor import SearchEngine
from json import dumps


app = Flask(__name__)
api = Api(app)

# Sample documents (replace with your own document corpus)
documents = [
    'Xử lý ngôn ngữ tự nhiên là một nhánh quan trọng của trí tuệ nhân tạo.',
    'Khai phá dữ liệu là quá trình tìm ra các mẫu trong các bộ dữ liệu lớn.',
    'Truy hồi thông tin là hoạt động thu thập các nguồn thông tin liên quan đến một thông tin cần tìm kiếm.'
]


@app.route('/', methods=['GET'])
def search():
        query = request.json.get('query')
        if not query:
            return jsonify({'error': 'Query is missing'})
        
        results = SearchEngine.search(query)
        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
