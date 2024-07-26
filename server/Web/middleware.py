

from django.utils.deprecation import MiddlewareMixin

class PublicAccessControlMiddleware(MiddlewareMixin):

    def process_request(self, request):

        pass

    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = '*'  # 或者設置特定的域
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response['Access-Control-Max-Age'] = 86400
        return response