import mysql.connector
from decouple import config

conn = mysql.connector.connect(
    host=config("DB_HOST"),
    user=config("DB_USER"),
    password=config("DB_PASSWORD"),
    database=config("DB_NAME") # Added this line for DB name
)
cursor = conn.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS ecommerce_db")
cursor.close()
conn.close()

print("✅ Database 'ecommerce_db' created or already exists.")