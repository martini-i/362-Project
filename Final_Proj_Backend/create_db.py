import mysql.connector
from decouple import config

conn = mysql.connector.connect(
    host=config("DB_HOST"),
    user=config("DB_USER"),
    password=config("DB_PASSWORD"),
)
cursor = conn.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS ecommerce_db")
cursor.close()
conn.close()

print("✅ Database 'ecommerce_db' created or already exists.")