# Generated by Django 2.2.9 on 2020-02-28 12:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0007_auto_20200228_1221'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task_comment',
            name='task',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task_comment', to='tasks.Task'),
        ),
    ]