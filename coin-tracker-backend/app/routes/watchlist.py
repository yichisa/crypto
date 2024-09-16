from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Watchlist
from app import db
from app.routes import watchlist_bp

@watchlist_bp.route('/', methods=['GET'])
@jwt_required()
def get_watchlist():
    user_id = get_jwt_identity()
    watchlist_items = Watchlist.query.filter_by(user_id=user_id).all()
    coin_ids = [item.coin_id for item in watchlist_items]
    return jsonify({'watchlist': coin_ids}), 200

@watchlist_bp.route('/', methods=['POST'])
@jwt_required()
def add_to_watchlist():
    user_id = get_jwt_identity()
    coin_id = request.json.get('coin_id')

    if Watchlist.query.filter_by(user_id=user_id, coin_id=coin_id).first():
        return jsonify({'message': 'Coin already in watchlist'}), 409

    watchlist_item = Watchlist(user_id=user_id, coin_id=coin_id)
    db.session.add(watchlist_item)
    db.session.commit()

    return jsonify({'message': 'Coin added to watchlist'}), 201

@watchlist_bp.route('/<string:coin_id>', methods=['DELETE'])
@jwt_required()
def remove_from_watchlist(coin_id):
    user_id = get_jwt_identity()
    watchlist_item = Watchlist.query.filter_by(user_id=user_id, coin_id=coin_id).first()

    if not watchlist_item:
        return jsonify({'message': 'Coin not in watchlist'}), 404

    db.session.delete(watchlist_item)
    db.session.commit()
    return jsonify({'message': 'Coin removed from watchlist'}), 200
