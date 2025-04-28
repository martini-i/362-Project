# 
# NOTE:
# THIS IS A TEST FILE FOR THE DB CONNECTION TO SEE IT CONNECTION WORKS OR NOT

import mysql.connector
from decouple import config

conn = mysql.connector.connect(
    host=config("DB_HOST"),
    user=config("DB_USER"),
    password=config("DB_PASSWORD"),
    database=config("DB_NAME")
)
print("✅ Successfully connected to the database.")
conn.close()