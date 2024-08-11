

from django.utils.deprecation import MiddlewareMixin

from django.utils.deprecation import MiddlewareMixin

class PublicAccessControlMiddleware(MiddlewareMixin):

    def process_request(self, request):
        pass

    def process_response(self, request, response):
        # 添加 CORS 相关的响应头
        response['Access-Control-Allow-Origin'] = '*'  # 允许所有来源
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response['Access-Control-Max-Age'] = 86400

        # 检查请求来源
        allowed_hosts = ['localhost', '127.0.0.1', '49.213.238.75']  # 允许的来源
        request_host = request.get_host().split(':')[0]  # 获取请求的主机名

        # 根据请求来源设置 X-Frame-Options
        if request_host in allowed_hosts:
            response['X-Frame-Options'] = 'ALLOW-FROM http://{}'.format(request_host)  # 允许来自本地或特定 IP 的请求
        else:
            response['X-Frame-Options'] = 'DENY'  # 拒绝其他来源

        return response