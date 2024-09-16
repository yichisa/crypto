from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
coins_bp = Blueprint('coins', __name__, url_prefix='/api/coins')
watchlist_bp = Blueprint('watchlist', __name__, url_prefix='/api/watchlist')

from . import auth, coins, watchlist
