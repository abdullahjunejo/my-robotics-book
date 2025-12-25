import smtplib
import os
import psycopg2
from email.mime.text import MIMEText
from fastapi import FastAPI, Request
from qdrant_client import QdrantClient
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from groq import Groq  # ✅ Groq Import kiya

app = FastAPI()

# ✅ Groq Client Setup (Aapki Free Key yahan laga di hai)
groq_client = Groq(api_key="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")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Neon Database Connection
DATABASE_URL = "postgresql://neondb_owner:npg_rowPm6DvUzk2@ep-royal-bread-ahhwvjzj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# ✅ Qdrant Setup
QDRANT_URL = "https://d0a6e44e-ea20-4676-bbff-17d49520b4b0.us-east4-0.gcp.cloud.qdrant.io"
QDRANT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.dp9YS_Taw7LO7ZIHuFvH_lmAtDW0UBG9szucJjHHaZA"
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY)

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# --- 📧 EMAIL NOTIFICATION LOGIC ---
def send_login_notification(user_email):
    sender_email = "your-email@gmail.com"
    sender_password = "your-app-password" 
    body = f"Hello!\n\nAapne Neural Dynamics Portal par successfully signup kiya hai.\nRegards,\nNeural Dynamics Team 🦾"
    msg = MIMEText(body)
    msg['Subject'] = 'Welcome to Neural Dynamics Portal'
    msg['From'] = f"Neural Dynamics Portal <{sender_email}>"
    msg['To'] = user_email
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"❌ Email Error: {e}")
        return False

# --- 🚀 RAG ENDPOINT (The Brain) ---

@app.get("/ask")
async def ask_ai(question: str):
    try:
        # 1. Qdrant se textbook ka context nikalna
        search_result = qdrant_client.scroll(
            collection_name="robotics_docs",
            limit=5 
        )
        
        context_text = ""
        if search_result and search_result[0]:
            context_text = " ".join([point.payload.get('text', '') for point in search_result[0]])

        # 2. Groq AI Completion (Free & Fast)
        # Hum Llama 3 model use kar rahe hain jo bohot powerful hai
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a specialized Robotics Tutor for the Physical AI course. Use the provided textbook context to explain concepts. If the user background is mentioned (Beginner/Intermediate), adjust the complexity of your answer."
                },
                {"role": "user", "content": f"Textbook Context: {context_text}\n\nUser Question/Selection: {question}"}
            ]
        )

        answer = response.choices[0].message.content
        return {"answer": answer}

    except Exception as e:
        print(f"❌ Groq Error: {e}")
        return {"answer": "AI Engine (Groq) is taking a break. Please check your internet or API key."}

# --- 🚀 SIGNUP & NEON STORAGE ---

@app.post("/signup-user")
async def signup_user(request: Request):
    try:
        data = await request.json()
        email, password = data.get("email"), data.get("password")
        hardware, software = data.get("hardware"), data.get("software")

        conn = get_db_connection()
        cur = conn.cursor()
        query = """
        INSERT INTO "user" (id, email, password, hardware_background, software_background)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (email) DO NOTHING;
        """
        cur.execute(query, (email, email, password, hardware, software))
        conn.commit()
        cur.close()
        conn.close()
        send_login_notification(email)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8005)