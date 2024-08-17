# Base image
FROM python:3.11-slim


# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy project files
COPY . /app/

# new 
RUN  pip install --upgrade pip

# Run install.py script to install dependencies and any other setup tasks
RUN python install.py


# RUN python manage.py migrate && \
#     python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'lai@gmail.com.com', 'TWtPrvRW8K')"

RUN python manage.py migrate 

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
