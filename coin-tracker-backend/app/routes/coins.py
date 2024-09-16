from flask import jsonify, request
import requests
from app.routes import coins_bp

COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

@coins_bp.route('/', methods=['GET'])
def get_coins():
    params = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 100,
        'page': 1,
        'sparkline': 'false'
    }
    response = requests.get(f'{COINGECKO_API_URL}/coins/markets', params=params)
    return jsonify(response.json()), response.status_code

@coins_bp.route('/<string:coin_id>', methods=['GET'])
def get_coin_detail(coin_id):
    response = requests.get(f'{COINGECKO_API_URL}/coins/{coin_id}', params={'localization': 'false'})
    return jsonify(response.json()), response.status_code
