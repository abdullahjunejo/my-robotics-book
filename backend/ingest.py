from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# ⚠️ APNI KEYS DALEIN
QDRANT_URL = "https://d0a6e44e-ea20-4676-bbff-17d49520b4b0.us-east4-0.gcp.cloud.qdrant.io"
QDRANT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.dp9YS_Taw7LO7ZIHuFvH_lmAtDW0UBG9szucJjHHaZA"

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY)

# Collection banana
client.recreate_collection(
    collection_name="robotics_docs",
    vectors_config=VectorParams(size=4, distance=Distance.COSINE), # Baad mein 1536 karenge
)

# Textbook ka data (Physical AI, Humanoids)
data = [
    {"id": 1, "text": "Physical AI is the integration of AI with physical bodies like robots.", "vector": [0.1, 0.2, 0.3, 0.4]},
    {"id": 2, "text": "NVIDIA Isaac Sim requires an RTX GPU for high-fidelity physics simulation.", "vector": [0.5, 0.6, 0.7, 0.8]},
    {"id": 3, "text": "Humanoid robots like Digit are designed to work in human environments.", "vector": [0.9, 0.1, 0.2, 0.3]}
]

# Data push karna
for item in data:
    client.upsert(
        collection_name="robotics_docs",
        points=[{"id": item["id"], "vector": item["vector"], "payload": {"content": item["text"]}}]
    )

print("✅ Robotics data successfully pushed to Qdrant!")