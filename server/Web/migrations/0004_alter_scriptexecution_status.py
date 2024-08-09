# Generated by Django 5.0.6 on 2024-08-01 15:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Web", "0003_alter_scriptexecution_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="scriptexecution",
            name="status",
            field=models.CharField(
                choices=[
                    ("success", "Success"),
                    ("failed", "Failed"),
                    ("running", "Running"),
                    ("stop", "Stop"),
                ],
                default="failed",
                max_length=20,
            ),
        ),
    ]
