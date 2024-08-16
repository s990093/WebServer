from django.utils.deprecation import MiddlewareMixin
from django.conf import settings

class PublicAccessControlMiddleware(MiddlewareMixin):

    def process_request(self, request):
        pass


    def process_response(self, request, response):

        # CORS settings from Django settings
        cors_origin = getattr(settings, 'CORS_ALLOWED_ORIGINS', '*')
        cors_methods = getattr(settings, 'CORS_ALLOW_METHODS', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
        cors_headers = getattr(settings, 'CORS_ALLOW_HEADERS', ['Content-Type', 'Authorization'])
        cors_max_age = getattr(settings, 'CORS_MAX_AGE', 86400)

        # Set CORS headers
        if isinstance(cors_origin, str) and cors_origin == '*':
            response['Access-Control-Allow-Origin'] = '*'
        else:
            response['Access-Control-Allow-Origin'] = ', '.join(cors_origin)
        
        response['Access-Control-Allow-Methods'] = ', '.join(cors_methods)
        response['Access-Control-Allow-Headers'] = ', '.join(cors_headers)
        response['Access-Control-Max-Age'] = str(cors_max_age)

        # Check request origin for X-Frame-Options
        allowed_hosts = getattr(settings, 'ALLOWED_HOSTS_FOR_FRAMES', ['localhost', '127.0.0.1', '49.213.238.75'])
        request_host = request.get_host().split(':')[0]

        # Set X-Frame-Options based on allowed hosts
        if request_host in allowed_hosts:
            response['X-Frame-Options'] = f'ALLOW-FROM http://{request_host}'
        else:
            response['X-Frame-Options'] = 'DENY'

        return response
